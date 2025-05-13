import os
import pandas as pd
import joblib
import xgboost as xgb
from flask import request, jsonify
from flask_cors import cross_origin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'payment_delay')

model = xgb.XGBRegressor()
model.load_model(os.path.join(MODEL_DIR, 'latepayment_model.json'))
feature_columns = joblib.load(os.path.join(MODEL_DIR, 'latepayment_features.pkl'))

def register_payment_delay_routes(app):
    @app.route('/api/payment-delay/predict', methods=['POST'])
    @cross_origin()
    def predict_payment_delay():
        data = request.get_json()

        if not data or not all(field in data for field in feature_columns):
            return jsonify({'error': f'Missing required fields: {feature_columns}'}), 400

        df = pd.DataFrame([data])
        df = df.reindex(columns=feature_columns, fill_value=0)

        prediction = model.predict(df)[0]
        return jsonify({'predicted_delay_days': int(round(prediction))})
