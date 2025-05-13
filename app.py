from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
import risk_api  # Import the ML risk API module
import cluster_api
import anomaly_api
import margin_api
import payment_delay_api
import profit_api
import regression_api

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''  # Add password if needed
app.config['MYSQL_DB'] = 'user_db'

mysql = MySQL(app)
risk_api.register_routes(app)  # Register Risk Prediction Routes
cluster_api.register_cluster_routes(app)
anomaly_api.register_anomaly_routes(app)
margin_api.register_margin_routes(app)
payment_delay_api.register_payment_delay_routes(app)
profit_api.register_profit_routes(app)
regression_api.register_regression_routes(app)

@app.route('/api/finance/login', methods=['POST'])
def finance_login():
    return handle_login(expected_role='finance')

@app.route('/api/purchase/login', methods=['POST'])
def purchase_login():
    return handle_login(expected_role='purchase')

def handle_login(expected_role):
    data = request.get_json()
    email = data.get('username')
    password = data.get('password')

    cursor = mysql.connection.cursor()
    cursor.execute("SELECT password, role FROM users WHERE email = %s", (email,))
    result = cursor.fetchone()
    cursor.close()

    if result:
        db_password, user_role = result
        if db_password == password:
            if user_role != expected_role:
                return jsonify({
                    "status": "failure",
                    "message": f"Access denied for role '{expected_role}'."
                }), 403
            return jsonify({
                "status": "success",
                "message": "Login successful!",
                "role": user_role
            }), 200

    return jsonify({"status": "failure", "message": "Invalid credentials."}), 401

# CORS Preflight Handling
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)
