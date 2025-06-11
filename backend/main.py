from collections import defaultdict
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression
import numpy as np
from collections import defaultdict

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

    # Step 1: Group total sales per day
    daily_totals = defaultdict(float)
    for sale in sales_data:
        daily_totals[sale.date] += sale.amount

    # Step 2: Sort dates
    sorted_dates = sorted(daily_totals.keys())

    if len(sorted_dates) < 2:
        # Not enough data for prediction
        return []

    # Step 3: Prepare training data
    base_date = datetime.strptime(sorted_dates[0], "%Y-%m-%d")
    X = []
    y = []

    for date_str in sorted_dates:
        days_diff = (datetime.strptime(date_str, "%Y-%m-%d") - base_date).days
        X.append([days_diff])
        y.append(daily_totals[date_str])

    # Step 4: Train regression model
    model = LinearRegression()
    model.fit(X, y)

    # Step 5: Predict next 7 days
    forecast = []
    last_day = (datetime.strptime(sorted_dates[-1], "%Y-%m-%d") - base_date).days

    for i in range(1, 8):
        future_day = last_day + i
        future_date = (base_date + timedelta(days=future_day)).strftime("%Y-%m-%d")
        predicted_amount = round(float(model.predict([[future_day]])), 2)
        forecast.append({
            "date": future_date,
            "predicted_amount": max(predicted_amount, 0)  # Ensure no negative values
        })

    return forecast