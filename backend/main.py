import math
from typing import List

from pydantic import BaseModel
from fastapi import FastAPI
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from starlette.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Request(BaseModel):
    region: str
    health_ratio: float
    coeff_Gini: float
    not_smoking_male: float
    not_smoking_female: float
    num_of_criminals: float
    num_of_alcohol_crimes: float
    num_of_female_crimes: float
    num_of_drugs_crimes: float
    num_of_underaged_criminals: float
    life_quality: float
    population_size: float
    num_of_crimes: float


class Response(BaseModel):
    name: str
    result: float


coeffs = [-0.000551, -0.010537, -0.062791, -0.083598,
          -0.009039, -0.019151, -0.027239,  0.016761,
           0.094350, -0.091864, -0.041011,  0.001973]
shift = 0.4770007352843136


@app.post('/deviant-forecast', response_model=List[Response])
def deviant_forecast(request: List[Request]) -> List[Response]:
    df = pd.read_csv('data/preprocessed.csv')

    scaler = StandardScaler()
    scaler.fit(df.drop(['region', 'ratio_underage_partic'], axis=1))

    columns = [
        'region',
        'health_ratio', 'coeff_Gini', 'not_smoking_male',
        'not_smoking_female', 'num_of_criminals', 'num_of_alcohol_crimes',
        'num_of_female_crimes', 'num_of_drugs_crimes', 'num_of_underaged_criminals',
        'life_quality', 'population_size', 'num_of_crimes'
    ]
    df_req = pd.DataFrame([[getattr(obj, col) for col in columns] for obj in request], columns=columns)
    scaled = pd.DataFrame(scaler.transform(df_req.drop(['region'], axis=1)), columns=columns[1:])
    scaled.insert(loc=0, column='region', value=df_req['region'].to_numpy())

    response = scaled.apply(lambda row: {
        'name': row['region'],
        'result': math.ceil((np.dot(row.values[1:], coeffs) + shift) * 100)
    }, axis=1)

    return response