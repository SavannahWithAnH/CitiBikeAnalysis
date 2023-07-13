""" Import Flas directory and test initial set up"""
from flask import Flask, render_template, jsonify


app = Flask(__name__)

@app.route("/")
def index():
    return 'Hello, world!'

@app.route('/data.json')
def get_data():
    # Load and return the JSON data
    with open('static/infoMapData.json') as json_file:
        data1 = json.load(json_file)
    with open('static/tsla_data.json') as json_file:
        data2 = json.load(json_file)
    with open('static/Largest automakers by market capitalization.json') as json_file:
        data3 = json.load(json_file)
    with open('static/Top 10 Automaker Stocks 2010-2022.json') as json_file:
        data4 = json.load(json_file)
    return jsonify(data1, data2, data3, data4)

@app.route('/about')
def about():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()