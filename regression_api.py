import os
import pandas as pd
import joblib
from flask import request, jsonify
from flask_cors import cross_origin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'regression')

model = joblib.load(os.path.join(MODEL_DIR, 'linreg_model.pkl'))
scaler = joblib.load(os.path.join(MODEL_DIR, 'linreg_scaler.pkl'))
feature_columns = joblib.load(os.path.join(MODEL_DIR, 'linreg_features.pkl'))

def register_regression_routes(app):
    @app.route('/api/regression/predict', methods=['POST'])
    @cross_origin()
    def predict_amount_due():
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided.'}), 400

        missing_fields = [field for field in feature_columns if field not in data]
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {missing_fields}'}), 400

        df = pd.DataFrame([data])
        df = df.reindex(columns=feature_columns, fill_value=0)

        try:
            scaled = scaler.transform(df)
            prediction = model.predict(scaled)[0]
        except Exception as e:
            return jsonify({'error': f'Model prediction failed: {str(e)}'}), 500

        return jsonify({'predicted_amount_due': round(prediction, 2)})
