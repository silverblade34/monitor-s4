from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.dashboard.infrastructure.controller import DashboardController
import requests, uuid


#from app import app
from __main__ import app
from session import set_session_cookie_name


CORS(app)

@app.before_request
def before_request():
    set_session_cookie_name()

@app.route('/tipoevento_home', methods=['GET']) 
def tipoevento_home():
    _dashCL = DashboardController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["cod_admin"]
    print(cod_cuenta)
    print(cod_cliente)
    data = _dashCL.listTablaEventos(cod_cuenta, cod_cliente)
    print(data)
    return data
