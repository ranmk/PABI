import os
import pandas as pd
import joblib
from flask import request, jsonify
from flask_cors import cross_origin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'clustering')

kmeans = joblib.load(os.path.join(MODEL_DIR, 'kmeans_model.pkl'))

expected_features = ['AvgPaymentDelay', 'AvgAmountDue', 'AvgAmountPaid', 'AvgBalanceDue']

def register_cluster_routes(app):
    @app.route('/api/cluster/predict', methods=['POST'])
    @cross_origin()
    def predict_cluster():
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        features = pd.DataFrame([data])

        if not all(col in features.columns for col in expected_features):
            return jsonify({'error': f'Missing required features: {expected_features}'}), 400

        cluster = kmeans.predict(features)[0]
        return jsonify({'cluster': int(cluster)})
