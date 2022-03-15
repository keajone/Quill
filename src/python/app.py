from flask import Response, Flask, request
import cv2
from itsdangerous import json
import numpy as np
from matplotlib import pyplot as plt
from keras.models import load_model
from keras.models import model_from_json
import urllib.request
from model_one import get_score_from_filename, download_and_save

app = Flask(__name__)

@app.route('/', methods=['POST'])
def score():
    """
    Score the image drawn by client. Expected Request:

    {
        URL: "image_url"
    }

    """

    # Extract the JSON from request
    request_json = request.get_json(force=True) 

    # Extract the image URL
    image_url = request_json['URL']

    # Save image
    filename = download_and_save(image_url)

    # Get score of the image
    response_score, response_prediction = get_score_from_filename(filename, model)
    # response_score = "_"
    # response_prediction = ""

    # Create JSON response
    json = '{"score": "'+ str(response_score) +'", "predictedString": "'+response_prediction+'"}'
    response = Response(json)

    # Add appropriate headers
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Content-type"] = "application/json; charset=utf-8"
    return response



#######################################################
#   Everything below is executed when server starts   #
#######################################################

## Extract model
print('\n[INFO] Loading model from "model.json".')
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)
loaded_model.load_weights('model.h5')
model = loaded_model
print('\n[INFO] Model successfully loaded.')
