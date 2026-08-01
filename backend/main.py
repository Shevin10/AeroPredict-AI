from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
app = FastAPI()
model = joblib.load("models/aircraft_rul_model_tune.pkl")

print(model.feature_names_in_)
class EngineData(BaseModel):
    cycle: float
    op_setting_1: float
    op_setting_2: float
    sensor_2: float
    sensor_3: float
    sensor_4: float
    sensor_6: float
    sensor_7: float
    sensor_8: float
    sensor_9: float
    sensor_11: float
    sensor_12: float
    sensor_13: float
    sensor_14: float
    sensor_15: float
    sensor_17: float
    sensor_20: float
    sensor_21: float
@app.get("/")
def home():
    return {"message": "AeroPredict API is running"}

def get_risk(rul):
    if rul < 20:
        return "HIGH", "Immediate inspection required"

    elif rul < 50:
        return "MEDIUM", "Schedule maintenance"

    else:
        return "LOW", "Normal operation"

@app.post("/predict")
def predict(data: EngineData):

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