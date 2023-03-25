import datetime
import json
import random
from os import environ
from urllib import request

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from requests.models import Response
from werkzeug.wrappers import response

app = Flask("chat_bot")
CORS(app)


@app.route("/", methods=["GET"])
def ping():
    return "Pinging Model Application"


@app.route("/api/generate", methods=["POST"])
def api():

    input_json = request.json

    #The backend module will be here, converting the input array of movies
    #to a list of similar movies and return it as a response

    #This POST Api will be consumed from the recommend section of the frontend

    response = {
        "answer": "result will be here",
        "data": input_json,
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=9696)
