from __future__ import print_function
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app, supports_credentials=True)

news = pickle.load(open('flask/news.pickle', 'rb'))
# n1 = pickle.load(open('flask/label_encoder.pickle', 'rb'))
sentiment = pickle.load(open('flask/sentiment.pickle', 'rb'))
countVector = pickle.load(open('flask/countVector.pkl', 'rb'))
tdidfVector = pickle.load(open('flask/tdidfVector.pkl', 'rb'))
tdidfTransformer = pickle.load(open('flask/tdidfTransformer.pkl', 'rb'))

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/')
def index():
    return render_template('index.html')

def NewsPredictor(predict_category):
    to_predict = countVector.fit_transform([predict_category])
    to_predict = tdidfTransformer.fit_transform(to_predict)
    print(to_predict)
    # result = news.predict(to_predict)
    # return result[0]

@app.route('/predictnews', methods = ['POST'])
def result():
    if request.method == 'POST':
        info = request.get_json()
        data = info['headline'] + " " + info['short_description']
        category = NewsPredictor(data)
        print(data)
        return jsonify(3)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)