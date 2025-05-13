import os
import pandas as pd
import joblib
from flask import request, jsonify
from flask_cors import cross_origin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'margin')

model = joblib.load(os.path.join(MODEL_DIR, 'xgb_grid_model.pkl'))
feature_columns = joblib.load(os.path.join(MODEL_DIR, 'xgb_grid_features.pkl'))

def register_margin_routes(app):
    @app.route('/api/margin/predict', methods=['POST'])
    @cross_origin()
    def predict_margin():
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        df = pd.DataFrame([data])
        df = df.reindex(columns=feature_columns, fill_value=0)

        prediction = model.predict(df)[0]

        return jsonify({'predicted_margin': float(round(prediction, 2))})
