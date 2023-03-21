from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.credential.infrastructure.controller import CredentialController
import requests 

#from app import app
from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/tipoevento_home', methods=['GET', 'POST']) 
def tipoevento_home():
    pass