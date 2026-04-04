"""
=============================================================
  AI HEALTH CHATBOT — ML MODEL TRAINER (scikit-learn)
  Approach 1: TF-IDF + Multi-Output Random Forest Classifier
=============================================================
Run this once to train and save the model:
    python train_ml.py

Requirements:
    pip install scikit-learn joblib pandas numpy
"""

import json
import os
import numpy as np
import joblib
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multioutput import MultiOutputClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import LabelEncoder

# ── Load training data ─────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "health_data.json")
MODEL_DIR = os.path.join(BASE_DIR, "saved_model")
os.makedirs(MODEL_DIR, exist_ok=True)

print("📂 Loading training data...")
with open(DATA_FILE, "r") as f:
    data = json.load(f)

print(f"✅ Loaded {len(data)} training samples\n")

# ── Prepare data ───────────────────────────────────────────
X = [item["symptoms"] for item in data]
y_disease    = [item["disease"]    for item in data]
y_prevention = [item["prevention"] for item in data]
y_diet       = [item["diet"]       for item in data]

# Encode labels
le_disease    = LabelEncoder()
le_prevention = LabelEncoder()
le_diet       = LabelEncoder()

y_disease_enc    = le_disease.fit_transform(y_disease)
y_prevention_enc = le_prevention.fit_transform(y_prevention)
y_diet_enc       = le_diet.fit_transform(y_diet)

# Stack all labels
Y = np.column_stack([y_disease_enc, y_prevention_enc, y_diet_enc])

# ── Split data ─────────────────────────────────────────────
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=42
)

print(f"📊 Train size: {len(X_train)} | Test size: {len(X_test)}\n")

# ── Build Pipeline ─────────────────────────────────────────
print("🔧 Building TF-IDF + Random Forest pipeline...")

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(
        ngram_range=(1, 2),       # unigrams + bigrams
        max_features=5000,
        min_df=1,
        sublinear_tf=True,        # apply log normalization
        stop_words="english",
    )),
    ("clf", MultiOutputClassifier(
        RandomForestClassifier(
            n_estimators=200,
            max_depth=None,
            min_samples_split=2,
            random_state=42,
            n_jobs=-1,
        )
    ))
])

# ── Train ──────────────────────────────────────────────────
print("🚀 Training model... (this may take 30-60 seconds)\n")
pipeline.fit(X_train, Y_train)

# ── Evaluate ───────────────────────────────────────────────
print("📈 Evaluating model...\n")
Y_pred = pipeline.predict(X_test)

labels = ["Disease", "Prevention", "Diet"]
for i, label in enumerate(labels):
    acc = accuracy_score(Y_test[:, i], Y_pred[:, i])
    print(f"  {label} Accuracy: {acc*100:.1f}%")

# Overall accuracy
overall_acc = np.mean([
    accuracy_score(Y_test[:, i], Y_pred[:, i]) for i in range(3)
])
print(f"\n  ✅ Overall Model Accuracy: {overall_acc*100:.1f}%\n")

# ── Also train a simpler Logistic Regression model ─────────
print("🔧 Also training Logistic Regression model for comparison...")

pipeline_lr = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2), max_features=5000, sublinear_tf=True)),
    ("clf", MultiOutputClassifier(LogisticRegression(max_iter=500, C=5.0)))
])
pipeline_lr.fit(X_train, Y_train)
Y_pred_lr = pipeline_lr.predict(X_test)
acc_lr = np.mean([accuracy_score(Y_test[:, i], Y_pred_lr[:, i]) for i in range(3)])
print(f"  Logistic Regression Accuracy: {acc_lr*100:.1f}%\n")

# Use the better model
if acc_lr > overall_acc:
    best_model = pipeline_lr
    print("  🏆 Logistic Regression wins!")
else:
    best_model = pipeline
    print("  🏆 Random Forest wins!")

# ── Save model and encoders ────────────────────────────────
print("\n💾 Saving model and encoders...")
joblib.dump(best_model,       os.path.join(MODEL_DIR, "model.pkl"))
joblib.dump(le_disease,       os.path.join(MODEL_DIR, "le_disease.pkl"))
joblib.dump(le_prevention,    os.path.join(MODEL_DIR, "le_prevention.pkl"))
joblib.dump(le_diet,          os.path.join(MODEL_DIR, "le_diet.pkl"))

# Save full data for red flags lookup
with open(os.path.join(MODEL_DIR, "health_data.json"), "w") as f:
    json.dump(data, f, indent=2)

print("\n✅ Model saved to saved_model/")
print("   ├── model.pkl")
print("   ├── le_disease.pkl")
print("   ├── le_prevention.pkl")
print("   ├── le_diet.pkl")
print("   └── health_data.json")

# ── Quick test prediction ──────────────────────────────────
print("\n🧪 Sample predictions:\n")
test_cases = [
    "fever headache body ache chills sweating",
    "chest pain left arm cold sweat breathless",
    "frequent urination thirst weight loss glucose high",
    "joint pain swelling morning stiffness knee",
]

for symptom in test_cases:
    pred = best_model.predict([symptom])[0]
    disease    = le_disease.inverse_transform([pred[0]])[0]
    prevention = le_prevention.inverse_transform([pred[1]])[0]
    diet       = le_diet.inverse_transform([pred[2]])[0]
    print(f"  Input: '{symptom}'")
    print(f"  → Disease: {disease}")
    print(f"  → Prevention: {prevention[:60]}...")
    print(f"  → Diet: {diet[:60]}...")
    print()

print("🎉 Training complete! Now run: node server.js")