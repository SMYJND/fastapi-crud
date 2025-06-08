from fastapi import FastAPI;
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List 
from datetime import datetime, timedelta
import random

# In-memory storage
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


sales_data = []

# Model to validate incoming sales
class Sale(BaseModel):
    date: str
    product: str
    customer: str
    amount: float

# GET /sales – Return list of sales
@app.get("/sales", response_model=List[Sale])
def get_sales():
    return sales_data

# POST /sales – Add a new sale    
@app.post("/sales")
def add_sale(sale: Sale):
    print(f"Adding sale: {sale}")
    sales_data.append(sale)
    print(f"Current sales data: {sales_data}")
    return {"message": "Sale added successfully", "sale": sale}
    

