import os
import pandas as pd
import joblib
from flask import request, jsonify
from flask_cors import cross_origin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'pred_profit')

# Load the model, scaler, and expected feature columns
model = joblib.load(os.path.join(MODEL_DIR, 'profit_model.pkl'))
scaler = joblib.load(os.path.join(MODEL_DIR, 'profit_scaler.pkl'))
feature_columns = joblib.load(os.path.join(MODEL_DIR, 'profit_features.pkl'))

def register_profit_routes(app):
    @app.route('/api/profit/predict', methods=['POST'])
    @cross_origin()
    def predict_profit():
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided.'}), 400

        # Debug: Check received fields
        received_fields = list(data.keys())
        missing_fields = [field for field in feature_columns if field not in received_fields]

        if missing_fields:
            return jsonify({'error': f'Missing required fields: {missing_fields}'}), 400

        # Prepare DataFrame with correct column order and fill missing with 0 if any
        df = pd.DataFrame([data])
        df = df.reindex(columns=feature_columns, fill_value=0)

        try:
            # Scale and Predict
            df_scaled = scaler.transform(df)
            prediction = model.predict(df_scaled)[0]
        except Exception as e:
            return jsonify({'error': f'Model prediction failed: {str(e)}'}), 500

        return jsonify({'predicted_profit': round(prediction, 2)})
