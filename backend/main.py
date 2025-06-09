from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sales_data = []

class Sale(BaseModel):
    date: str
    product: str
    customer: str
    amount: float

class Forecast(BaseModel):
    date: str
    predicted_amount: float

@app.get("/sales", response_model=List[Sale])
def get_sales():
    return sales_data

@app.post("/sales")
def add_sale(sale: Sale):
    sales_data.append(sale)
    return {"message": "Sale added successfully", "sale": sale}

@app.get("/sales/forecast", response_model=List[Forecast])
def get_forecast():
    today = datetime.today()
    forecast = []
    for i in range(1, 8):
        future_date = (today + timedelta(days=i)).strftime("%Y-%m-%d")
        predicted_amount = round(1000 + i * 250, 2)
        forecast.append({
            "date": future_date,
            "predicted_amount": predicted_amount
        })
    return forecast
