import datetime
import json
import random
from os import environ
from urllib import request

import requests
import torch
from flask import Flask, jsonify, request
from flask_cors import CORS
from model import NeuralNet
from nltk_utils import bag_of_words, tokenize
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
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    FILE = "model.pth"
    data = torch.load(FILE)

    movies = data["movies"]

    cs_list = []
    binary_list = []
    if search in movies['title'].values:
        idx = movies[movies['title'] == search].index.item()
        for i in binary.iloc[idx]:
            binary_list.append(i)
        point1 = np.array(binary_list).reshape(1, -1)
        point1 = [val for sublist in point1 for val in sublist]
        for j in range(len(movies)):
            binary_list2 = []
            for k in binary.iloc[j]:
                binary_list2.append(k)
            point2 = np.array(binary_list2).reshape(1, -1)
            point2 = [val for sublist in point2 for val in sublist]
            dot_product = np.dot(point1, point2)
            norm_1 = np.linalg.norm(point1)
            norm_2 = np.linalg.norm(point2)
            cos_sim = dot_product / (norm_1 * norm_2)
            cs_list.append(cos_sim)
        movies_copy = movies.copy()
        movies_copy['cos_sim'] = cs_list
        results = movies_copy.sort_values('cos_sim', ascending=False)
        results = results[results['title'] != search]
        top_results = results.head(5)
        return (top_results)
    elif search in tv['title'].values:
        idx = tv[tv['title'] == search].index.item()
        for i in binary2.iloc[idx]:
            binary_list.append(i)
        point1 = np.array(binary_list).reshape(1, -1)
        point1 = [val for sublist in point1 for val in sublist]
        for j in range(len(tv)):
            binary_list2 = []
            for k in binary2.iloc[j]:
                binary_list2.append(k)
            point2 = np.array(binary_list2).reshape(1, -1)
            point2 = [val for sublist in point2 for val in sublist]
            dot_product = np.dot(point1, point2)
            norm_1 = np.linalg.norm(point1)
            norm_2 = np.linalg.norm(point2)
            cos_sim = dot_product / (norm_1 * norm_2)
            cs_list.append(cos_sim)
        tv_copy = tv.copy()
        tv_copy['cos_sim'] = cs_list
        results = tv_copy.sort_values('cos_sim', ascending=False)
        results = results[results['title'] != search]
        top_results = results.head(5)

    if not request.headers.getlist("X-Forwarded-For"):
        ip = request.remote_addr
    else:
        ip = request.headers.getlist("X-Forwarded-For")[0]

    try:
        geoDataResponse = requests.get(
            f"http://www.geoplugin.net/json.gp?ip={ip}")
        geoData = json.loads(geoDataResponse.text)
    except:
        print("Error getting Geo Data")

    response = {
        "result": top_results,
    }
    database_data = {
        "movies": movies,
        "response": top_results,
        "timestamp": datetime.datetime.now().timestamp(),
        "ipAddress": ip,
        "geoData": geoData,
    }

    try:
        requests.post(
            environ.get("DATABASE_URL"),
            data=json.dumps(database_data),
        )
    except:
        print("Couldn't Write to the Database")

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=9696)
