"""
=============================================================
  AI HEALTH CHATBOT — PREDICT SCRIPT
  Called by server.js via child_process
  Usage: python predict.py "fever headache body ache"
         python predict.py "fever headache" --model nn
=============================================================
"""

import sys
import json
import os
import warnings
warnings.filterwarnings("ignore")

# ── Args ───────────────────────────────────────────────────
args    = sys.argv[1:]
symptom = args[0] if args else ""
use_nn  = "--model" in args and "nn" in args

BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
ML_DIR     = os.path.join(BASE_DIR, "saved_model")
NN_DIR     = os.path.join(BASE_DIR, "saved_nn_model")
MODEL_DIR  = NN_DIR if use_nn else ML_DIR

def get_red_flags(disease_name, data):
    """Look up red flags from training data by disease name."""
    for item in data:
        if item["disease"].lower() in disease_name.lower() or disease_name.lower() in item["disease"].lower():
            return item.get("redFlags", item.get("red_flags", "Consult a doctor if symptoms persist or worsen."))
    return "Consult a doctor if symptoms persist or worsen beyond 2-3 days."

def predict_ml(symptom, model_dir):
    import joblib
    model        = joblib.load(os.path.join(model_dir, "model.pkl"))
    le_disease   = joblib.load(os.path.join(model_dir, "le_disease.pkl"))
    le_prevention= joblib.load(os.path.join(model_dir, "le_prevention.pkl"))
    le_diet      = joblib.load(os.path.join(model_dir, "le_diet.pkl"))

    with open(os.path.join(model_dir, "health_data.json")) as f:
        data = json.load(f)

    # Check if the input contains any known words
    if hasattr(model, 'steps') and hasattr(model.steps[0][1], 'transform'):
        vec = model.steps[0][1].transform([symptom])
        if vec.nnz == 0:
            return {"error": "InvalidQuery"}

    pred       = model.predict([symptom])[0]
    proba      = model.predict_proba([symptom])
    confidence = max(proba[0][0]) * 100

    if confidence < 30:
        return {"error": "LowConfidence"}

    disease    = le_disease.inverse_transform([pred[0]])[0]
    prevention = le_prevention.inverse_transform([pred[1]])[0]
    diet       = le_diet.inverse_transform([pred[2]])[0]
    red_flags  = get_red_flags(disease, data)

    return {
        "disease":    disease,
        "prevention": prevention,
        "diet":       diet,
        "red_flags":  red_flags,
        "confidence": round(confidence, 1),
        "model_type": "ML (Random Forest / Logistic Regression)",
    }

def predict_nn(symptom, model_dir):
    import joblib
    import numpy as np
    import tensorflow as tf
    from tensorflow.keras.preprocessing.sequence import pad_sequences

    model        = tf.keras.models.load_model(os.path.join(model_dir, "nn_model.keras"))
    tokenizer    = joblib.load(os.path.join(model_dir, "tokenizer.pkl"))
    le_disease   = joblib.load(os.path.join(model_dir, "le_disease.pkl"))
    le_prevention= joblib.load(os.path.join(model_dir, "le_prevention.pkl"))
    le_diet      = joblib.load(os.path.join(model_dir, "le_diet.pkl"))

    with open(os.path.join(model_dir, "config.json")) as f:
        config = json.load(f)
    with open(os.path.join(model_dir, "health_data.json")) as f:
        data = json.load(f)

    MAX_LEN = config["MAX_LEN"]
    seq = tokenizer.texts_to_sequences([symptom])
    
    # Check if any known sequence tokens exist
    if not any(token for token in seq[0]):
        return {"error": "InvalidQuery"}

    pad = pad_sequences(seq, maxlen=MAX_LEN, padding="post")

    preds = model.predict(pad, verbose=0)

    disease    = le_disease.inverse_transform([np.argmax(preds[0])])[0]
    prevention = le_prevention.inverse_transform([np.argmax(preds[1])])[0]
    diet       = le_diet.inverse_transform([np.argmax(preds[2])])[0]
    red_flags  = get_red_flags(disease, data)
    confidence = float(np.max(preds[0])) * 100

    if confidence < 30:
        return {"error": "LowConfidence"}

    return {
        "disease":    disease,
        "prevention": prevention,
        "diet":       diet,
        "red_flags":  red_flags,
        "confidence": round(confidence, 1),
        "model_type": "Neural Network (TensorFlow/Keras)",
    }

# ── Run prediction ─────────────────────────────────────────
if not symptom.strip():
    print(json.dumps({"error": "No symptom provided"}))
    sys.exit(1)

try:
    if use_nn and os.path.exists(os.path.join(NN_DIR, "nn_model.keras")):
        result = predict_nn(symptom, NN_DIR)
    elif os.path.exists(os.path.join(ML_DIR, "model.pkl")):
        result = predict_ml(symptom, ML_DIR)
    else:
        result = {"error": "No trained model found. Run train_ml.py or train_nn.py first."}

    print(json.dumps(result))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)