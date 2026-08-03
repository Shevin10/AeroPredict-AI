from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.schemas import EngineData
from backend.predictor import make_prediction


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AeroPredict API is running"}


@app.post("/predict")
def predict(data: EngineData):
    return make_prediction(data)