from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.dashboard.infrastructure.controller import DashboardController
import requests, uuid


#from app import app
from __main__ import app


CORS(app)

@app.route('/tipoevento_home', methods=['GET']) 
def tipoevento_home():
    _dashCL = DashboardController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["cod_admin"]
    data = _dashCL.listTablaEventos(cod_cuenta, cod_cliente)
    return data

@app.route('/cards_clientes', methods=['GET']) 
def cards_clientes():
    _dashCL = DashboardController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["cod_admin"]
    data = _dashCL.cardsClientes(cod_cuenta, cod_cliente)
    return data

@app.route('/cards_cuentas', methods=['GET']) 
def cards_cuentas():
    _dashCL = DashboardController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["datauser"]["CodCliente"]
    data = _dashCL.cardsCuentas(cod_cuenta, cod_cliente)
    return data

@app.route('/graficos_home_cuentas', methods=['GET']) 
def graficos_home_cuentas():
    _dashCL = DashboardController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["datauser"]["CodCliente"]
    data = _dashCL.graficosCuentas(cod_cuenta, cod_cliente)
    print(data)
    return data
