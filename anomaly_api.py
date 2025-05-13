import os
import pandas as pd
import joblib
from flask import request, jsonify
from flask_cors import cross_origin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'detection_anomaly')

model = joblib.load(os.path.join(MODEL_DIR, 'isolation_model.pkl'))
scaler = joblib.load(os.path.join(MODEL_DIR, 'scaler.pkl'))

expected_fields = ['AmountDue', 'AmountPaid', 'BalanceDue', 'PaymentDelayDays']

def register_anomaly_routes(app):
    @app.route('/api/anomaly/detect', methods=['POST'])
    @cross_origin()
    def detect_anomaly():
        data = request.get_json()

        if not data or not all(field in data for field in expected_fields):
            return jsonify({'error': f'Missing one of the required fields: {expected_fields}'}), 400

        df = pd.DataFrame([data])
        scaled_data = scaler.transform(df)
        prediction = model.predict(scaled_data)[0]

        # Isolation Forest returns -1 for anomaly, 1 for normal
        result = 'Anomaly' if prediction == -1 else 'Normal'

        return jsonify({'anomaly_status': result})
