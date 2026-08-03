import joblib
import pandas as pd


model = joblib.load("models/aircraft_rul_model_tune.pkl")


def get_risk(rul):
    if rul < 80:
        return "HIGH", "Immediate inspection required"
    elif rul < 120:
        return "MEDIUM", "Schedule maintenance"
    else:
        return "LOW", "Normal operation"


def make_prediction(data):

    input_data = pd.DataFrame(
        [data.model_dump()],
        columns=model.feature_names_in_
    )

    prediction = model.predict(input_data)

    rul = max(0, float(prediction[0]))

    risk, recommendation = get_risk(rul)

    return {
        "predicted_rul": round(rul, 1),
        "risk": risk,
        "recommendation": recommendation
    }