from flask import Flask, request, json
import requests, hashlib
from config import API_SERVER

class ApiConnection:
    @staticmethod
    def connectionApi(user, pasw):
        url = f'{API_SERVER}/api/v1/login'
        hed = {"Content-Type": "application/json"}  
        hash_object = hashlib.md5(pasw.encode())
        passw = hash_object.hexdigest()
        body = {"usuario": user, "contrasena" : passw}
        get_tramas = requests.post(url, data= json.dumps(body), headers= hed)
        rawData = get_tramas.json()
        return rawData
