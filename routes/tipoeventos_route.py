from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.tipoEventos.infrastructure.controller import TipoEventosController
import requests
#from app import app
from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/creartipo_eventos', methods=['POST'])
def creartipo_eventos():
    _eventTypeCL = TipoEventosController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["cod_admin"]
    dataevento = _eventTypeCL.crearTipoEvento(cod_cuenta, cod_cliente, request.json['data'])
    return dataevento

@app.route('/buscartipo_evento', methods=['GET'])
def buscartipo_evento():
    _eventTypeCL = TipoEventosController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["cod_admin"]
    dataevento = _eventTypeCL.buscarTipoEventos(cod_cuenta, cod_cliente, request.args["codevento"])
    return dataevento

@app.route('/actualizar_tipoevento', methods=['POST'])
def actualizar_tipoevento():
    _eventTypeCL = TipoEventosController()
    dataresp = _eventTypeCL.actualizarTipoEventos(request.json["data"])
    return dataresp
