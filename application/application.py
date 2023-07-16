""" Import Flas directory and test initial set up"""
#  importting the Flask framework itself, the render_template function for rendering views,
#   and the jsonify function for converting Python data to JSON.
from flask import Flask, render_template, jsonify

# This line creates an instance of the Flask class for our web app. common in all flask apps 
app = Flask(__name__)

# We created a route for the root URL ("/") of your web application and defines the function index()
#   to return the response "Hello, world!" whenever this URL is accessed. this is our main page in the app
@app.route("/")
def index():
    return 'Hello, world!'

# we created another route that responds to the "/data.json" URL. Whenever this URL is accessed,
# the function get_data() loads JSON data from four files and combines them into a single JSON object
# using the jsonify function,which is then returned as the HTTP response.
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

# This code creates another route that responds to the "/about" URL.
# The about() function uses render_template to generate an HTML webpage from the 'index.html' template.
@app.route('/about')
def about():
    return render_template('index.html')

# This command actually starts the web server.
if __name__ == '__main__':
    app.run()