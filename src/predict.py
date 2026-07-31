import joblib
import pandas as pd

model = joblib.load("models/aircraft_rul_model.pkl")

sample = pd.read_csv("data/processed/sample_engine.csv")

prediction = model.predict(sample)

def get_risk(rul):
    if rul < 20:
        return (
            "🔴 HIGH RISK",
            "Immediate inspection required"
        )

    elif rul < 50:
        return (
            "🟠 MEDIUM RISK",
            "Schedule maintenance"
        )

    else:
        return (
            "🟢 LOW RISK",
            "Normal operation"
        )

    
for i, rul in enumerate(prediction, start=1):

    risk, recommendation = get_risk(rul)

    print(f"\nEngine {i}")
    print(f"Predicted RUL: {rul:.1f} cycles")
    print(risk)
    print(f"Recommendation: {recommendation}")