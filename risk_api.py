import os
import pandas as pd
import joblib
from flask import request, jsonify
from flask_cors import cross_origin

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models', 'classification')

model = joblib.load(os.path.join(MODEL_DIR, 'supplier_risk_model.pkl'))
scaler = joblib.load(os.path.join(MODEL_DIR, 'supplier_scaler.pkl'))

feature_columns = [
    'AmountPaid', 'BalanceDue', 'TotalAssets', 'TotalLiabilities', 'Equity',
    'ActualExpenses', 'Budget', 'Fk_Supplier', 'Fk_Date', 'Fk_Grand_Livre', 'DisputeStatus_Ouvert'
]

def register_routes(app):
    @app.route('/api/risk/predict', methods=['POST'])
    @cross_origin()
    def predict_risk():
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        df = pd.DataFrame([data])
        df = df.reindex(columns=feature_columns, fill_value=0)
        df_scaled = scaler.transform(df)
        prediction = model.predict(df_scaled)[0]
        risk = 'High Risk' if prediction == 1 else 'Low Risk'

        return jsonify({'predicted_risk': risk})

    @app.route('/api/risk/batch', methods=['GET'])
    @cross_origin()
    def predict_risk_batch():
        from app import mysql

        cursor = mysql.connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT AmountPaid, BalanceDue, TotalAssets, TotalLiabilities, Equity, 
                   ActualExpenses, Budget, Fk_Supplier, Fk_Date, Fk_Grand_Livre, DisputeStatus_Ouvert 
            FROM supplier_data
        """)
        results = cursor.fetchall()
        cursor.close()

        if not results:
            return jsonify({'error': 'No supplier data found.'}), 404

        df = pd.DataFrame(results)
        df = df.reindex(columns=feature_columns, fill_value=0)
        df_scaled = scaler.transform(df)
        predictions = model.predict(df_scaled)
        risks = ['High Risk' if p == 1 else 'Low Risk' for p in predictions]

        for i in range(len(results)):
            results[i]['predicted_risk'] = risks[i]

        return jsonify(results)
