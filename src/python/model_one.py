from pyexpat import model
from flask import Response, Flask, request
import cv2
import numpy as np
from matplotlib import pyplot as plt
from keras.models import load_model
from keras.models import model_from_json
import urllib.request

def main():
    """
    Main method for testing our Utility methods.
    """
    
    ## Extract model
    print('\nLoading model from "model.json".')
    json_file = open('model.json', 'r')
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    loaded_model.load_weights('model.h5')
    model = loaded_model
    print('\nModel successfully loaded.')

    filename = "image_bad.jpg"

    ## Get score
    print("\nGetting score from image - "+filename)
    score = get_score_from_filename(filename, model)


def get_score_from_filename(filename: str, model):
    """
    Uses the given filename and Model to score the image on accuracy.
    """

    ## List of characters to predict
    characters = [
        '0','1','2','3','4','5','6','7','8','9','A','B','C','D','E',
        'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
        'U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i',
        'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
        ]

    ## Resize/process image from filename
    image = cv2.imread(filename)
    height, width, depth = image.shape
    image = cv2.resize(image, dsize=(width*5,height*4), interpolation=cv2.INTER_NEAREST)
    gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    #binary
    ret,thresh = cv2.threshold(gray,127,255,cv2.THRESH_BINARY_INV)
    #dilation
    kernel = np.ones((5,5), np.uint8)
    img_dilation = cv2.dilate(thresh, kernel, iterations=1)
    #adding GaussianBlur
    gsblur=cv2.GaussianBlur(img_dilation,(5,5),0)

    ## Find contours, box around the letter/word
    ctrs, hier = cv2.findContours(gsblur.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    ## Sort contours
    m = list()
    sorted_ctrs = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[0])
    pchl = list()
    achl = list()
    dp = image.copy()

    ## Draw contours (rectangle around image)  DEBUGGING
    for i, ctr in enumerate(sorted_ctrs):
        x, y, w, h = cv2.boundingRect(ctr)
        cv2.rectangle(dp,(x-10,y-10),( x + w + 10, y + h + 10 ),(90,0,255),9)
        
    # plt.imshow(dp)
    # plt.show()

    #gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
    #binary
    #ret,thresh = cv2.threshold(gray,127,255,cv2.THRESH_BINARY_INV)
    #dilation
    # kernel = np.ones((5,5), np.uint8)
    # image = cv2.dilate(thresh, kernel, iterations=10)

    ## Loop through each contour --- One per letter and make predictions
    for i, ctr in enumerate(sorted_ctrs):
        # Get bounding box
        x, y, w, h = cv2.boundingRect(ctr)
        # Getting ROI
        roi = image[y-10:y+h+40, x-10:x+w+40]
        roi = cv2.resize(roi, dsize=(28,28), interpolation=cv2.INTER_NEAREST)
        roi = cv2.cvtColor(roi,cv2.COLOR_BGR2GRAY)
        # cv2.imshow("Siamese Image Pairs", roi)
        # cv2.waitKey(0)
        roi = np.array(roi)
        t = np.copy(roi)
        t = t / 255.0
        t = 1-t
        t = t.reshape(1,784)
        m.append(roi)

        predictions = (model.predict(t) > 0.75).astype("int32") # 75% threshold 
        accuracies = model.predict(t)

        pchl.append(predictions)
        achl.append(accuracies)

    #DEBUGGING
    # print(characters)
    # print(pchl)
    # print(achl)

    #cast to numpy array TODO: should I even do this?
    characters = np.array(characters)
    #list of letters that get predictions
    pcw = list()

    ## Find indeces for each prediction
    indeces = list()
    for i in range(len(pchl)):
        index = np.where(characters[pchl[i][0]] == '1')[0]
        indeces.append(index)
        pcw.append(characters[index])

    ## Creat predicted string
    predstring = ''
    for x in pcw: predstring = predstring + x[0]

    ## Find overall accuracy by multiplying accuracies of each letter
    accuracy = 1.0
    for i in range(len(achl)):
        # complicated because I'm terrible at np and python arrays
        accuracy *= achl[i][0][indeces[i]][0]

    ## Print the findings
    print('Predicted String: '+predstring+', Accuracy: '+str(accuracy))

    ## Return accuracy in pretty printed format
    return "{:.1%}".format(accuracy), predstring


def download_and_save(imageURL: str):
    """
    Utility method used to download a PNG image.
    Returns the filename.
    """

    filename = "image_bad.jpg"
    urllib.request.urlretrieve(imageURL, filename)

    ## Give PNG a white background
    image = cv2.imread(filename, cv2.IMREAD_UNCHANGED)    
    trans_mask = image[:,:,3] == 0
    image[trans_mask] = [255, 255, 255, 255]
    white_bg_img = cv2.cvtColor(image, cv2.COLOR_BGRA2BGR)

    cv2.imwrite(filename, white_bg_img)
    
    return filename


if __name__ == "__main__":
    main()