"""
=============================================================
  AI HEALTH CHATBOT — NEURAL NETWORK TRAINER (TensorFlow)
  Approach 2: Embedding + LSTM/Dense Neural Network
=============================================================
Run this once to train and save the neural network:
    python train_nn.py

Requirements:
    pip install tensorflow scikit-learn joblib pandas numpy
"""

import json
import os
import numpy as np
import joblib
import warnings
warnings.filterwarnings("ignore")

# ── Check TensorFlow ───────────────────────────────────────
try:
    import tensorflow as tf
    from tensorflow.keras.models import Model
    from tensorflow.keras.layers import (
        Input, Dense, Dropout, Embedding,
        GlobalAveragePooling1D, BatchNormalization
    )
    from tensorflow.keras.preprocessing.text import Tokenizer
    from tensorflow.keras.preprocessing.sequence import pad_sequences
    from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
    from tensorflow.keras.utils import to_categorical
    print(f"✅ TensorFlow {tf.__version__} loaded")
except ImportError:
    print("❌ TensorFlow not found. Install with: pip install tensorflow")
    exit(1)

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# ── Load data ──────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "health_data.json")
MODEL_DIR = os.path.join(BASE_DIR, "saved_nn_model")
os.makedirs(MODEL_DIR, exist_ok=True)

print("\n📂 Loading training data...")
with open(DATA_FILE, "r") as f:
    data = json.load(f)

print(f"✅ Loaded {len(data)} training samples\n")

# ── Prepare text data ──────────────────────────────────────
X_text      = [item["symptoms"]   for item in data]
y_disease   = [item["disease"]    for item in data]
y_prevention= [item["prevention"] for item in data]
y_diet      = [item["diet"]       for item in data]

# Tokenize symptoms text
MAX_WORDS   = 3000
MAX_LEN     = 40

print("🔤 Tokenizing text...")
tokenizer = Tokenizer(num_words=MAX_WORDS, oov_token="<OOV>")
tokenizer.fit_on_texts(X_text)
X_seq = tokenizer.texts_to_sequences(X_text)
X_pad = pad_sequences(X_seq, maxlen=MAX_LEN, padding="post", truncating="post")

# Encode labels
le_disease    = LabelEncoder()
le_prevention = LabelEncoder()
le_diet       = LabelEncoder()

y_d = le_disease.fit_transform(y_disease)
y_p = le_prevention.fit_transform(y_prevention)
y_di= le_diet.fit_transform(y_diet)

n_disease    = len(le_disease.classes_)
n_prevention = len(le_prevention.classes_)
n_diet       = len(le_diet.classes_)

print(f"  Disease classes:    {n_disease}")
print(f"  Prevention classes: {n_prevention}")
print(f"  Diet classes:       {n_diet}\n")

# One-hot encode
y_d_cat  = to_categorical(y_d,  num_classes=n_disease)
y_p_cat  = to_categorical(y_p,  num_classes=n_prevention)
y_di_cat = to_categorical(y_di, num_classes=n_diet)

# Split
(X_train, X_test,
 yd_train, yd_test,
 yp_train, yp_test,
 ydi_train, ydi_test) = train_test_split(
    X_pad, y_d_cat, y_p_cat, y_di_cat,
    test_size=0.2, random_state=42
)

print(f"📊 Train: {len(X_train)} | Test: {len(X_test)}\n")

# ── Build Neural Network ───────────────────────────────────
print("🧠 Building Neural Network architecture...")

EMBED_DIM = 64

inp = Input(shape=(MAX_LEN,), name="symptoms_input")

# Embedding layer converts words to dense vectors
x = Embedding(MAX_WORDS, EMBED_DIM, input_length=MAX_LEN, name="word_embedding")(inp)
x = GlobalAveragePooling1D(name="pooling")(x)

# Shared dense layers
x = Dense(256, activation="relu", name="shared_dense_1")(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)

x = Dense(128, activation="relu", name="shared_dense_2")(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)

# Task-specific output heads (multi-output)
disease_out = Dense(64, activation="relu", name="disease_hidden")(x)
disease_out = Dense(n_disease, activation="softmax", name="disease")(disease_out)

prevention_out = Dense(64, activation="relu", name="prevention_hidden")(x)
prevention_out = Dense(n_prevention, activation="softmax", name="prevention")(prevention_out)

diet_out = Dense(64, activation="relu", name="diet_hidden")(x)
diet_out = Dense(n_diet, activation="softmax", name="diet")(diet_out)

# Build multi-output model
model = Model(
    inputs=inp,
    outputs=[disease_out, prevention_out, diet_out],
    name="HealthChatbotNN"
)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss={
        "disease":    "categorical_crossentropy",
        "prevention": "categorical_crossentropy",
        "diet":       "categorical_crossentropy",
    },
    loss_weights={"disease": 1.0, "prevention": 0.8, "diet": 0.8},
    metrics=["accuracy"]
)

model.summary()
print()

# ── Train ──────────────────────────────────────────────────
print("🚀 Training Neural Network...\n")

callbacks = [
    EarlyStopping(patience=15, restore_best_weights=True, verbose=1),
    ReduceLROnPlateau(factor=0.5, patience=7, verbose=1),
]

history = model.fit(
    X_train,
    {"disease": yd_train, "prevention": yp_train, "diet": ydi_train},
    validation_data=(
        X_test,
        {"disease": yd_test, "prevention": yp_test, "diet": ydi_test}
    ),
    epochs=150,
    batch_size=16,
    callbacks=callbacks,
    verbose=1
)

# ── Evaluate ───────────────────────────────────────────────
print("\n📈 Evaluating Neural Network...\n")

preds = model.predict(X_test, verbose=0)
pred_d  = np.argmax(preds[0], axis=1)
pred_p  = np.argmax(preds[1], axis=1)
pred_di = np.argmax(preds[2], axis=1)

true_d  = np.argmax(yd_test,  axis=1)
true_p  = np.argmax(yp_test,  axis=1)
true_di = np.argmax(ydi_test, axis=1)

acc_d  = accuracy_score(true_d,  pred_d)
acc_p  = accuracy_score(true_p,  pred_p)
acc_di = accuracy_score(true_di, pred_di)
overall = (acc_d + acc_p + acc_di) / 3

print(f"  Disease Accuracy:    {acc_d*100:.1f}%")
print(f"  Prevention Accuracy: {acc_p*100:.1f}%")
print(f"  Diet Accuracy:       {acc_di*100:.1f}%")
print(f"\n  ✅ Overall Accuracy: {overall*100:.1f}%\n")

# ── Save everything ────────────────────────────────────────
print("💾 Saving Neural Network model...")

# Save Keras model
model.save(os.path.join(MODEL_DIR, "nn_model.keras"))

# Save tokenizer and encoders
joblib.dump(tokenizer,    os.path.join(MODEL_DIR, "tokenizer.pkl"))
joblib.dump(le_disease,   os.path.join(MODEL_DIR, "le_disease.pkl"))
joblib.dump(le_prevention,os.path.join(MODEL_DIR, "le_prevention.pkl"))
joblib.dump(le_diet,      os.path.join(MODEL_DIR, "le_diet.pkl"))

# Save config
config = {"MAX_LEN": MAX_LEN, "MAX_WORDS": MAX_WORDS, "EMBED_DIM": EMBED_DIM}
with open(os.path.join(MODEL_DIR, "config.json"), "w") as f:
    json.dump(config, f)

# Save full data for red flags lookup
with open(os.path.join(MODEL_DIR, "health_data.json"), "w") as f:
    json.dump(data, f, indent=2)

print("\n✅ Neural Network saved to saved_nn_model/")
print("   ├── nn_model.keras")
print("   ├── tokenizer.pkl")
print("   ├── le_disease.pkl")
print("   ├── le_prevention.pkl")
print("   ├── le_diet.pkl")
print("   ├── config.json")
print("   └── health_data.json")

# ── Sample predictions ─────────────────────────────────────
print("\n🧪 Sample Neural Network predictions:\n")

test_cases = [
    "fever headache body ache chills sweating",
    "chest pain left arm cold sweat breathless",
    "frequent urination thirst weight loss high sugar",
    "sadness hopeless no motivation crying depression",
]

for symptom in test_cases:
    seq = tokenizer.texts_to_sequences([symptom])
    pad = pad_sequences(seq, maxlen=MAX_LEN, padding="post")
    out = model.predict(pad, verbose=0)

    disease    = le_disease.inverse_transform([np.argmax(out[0])])[0]
    prevention = le_prevention.inverse_transform([np.argmax(out[1])])[0]
    diet       = le_diet.inverse_transform([np.argmax(out[2])])[0]

    d_conf  = float(np.max(out[0])) * 100
    print(f"  Input: '{symptom}'")
    print(f"  → Disease ({d_conf:.0f}% conf): {disease}")
    print(f"  → Prevention: {prevention[:60]}...")
    print(f"  → Diet: {diet[:60]}...")
    print()

print("🎉 Neural Network training complete!")
print("   Update server.js USE_NEURAL_NETWORK=true to use it.")