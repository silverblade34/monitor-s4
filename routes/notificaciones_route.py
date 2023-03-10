from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.eventos.infrastructure.controller import EventosController
import requests, json
#from app import app
from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/listar_eventos', methods=['GET'])
def listar_eventos():
    _eventCL = EventosController()
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["cod_admin"]
    dataevento = _eventCL.listarEventos(cod_cuenta, cod_cliente)
    dataresp = {"listnot": dataevento, "datausuario":{"cod_cliente":cod_cliente, "cod_cuenta" : cod_cuenta} }
    return dataresp

@app.route('/func_buscarEvento', methods=['GET'])
def func_buscarEvento():
    _eventCL = EventosController()
    idevento = session["idevento"]
    dataevento = _eventCL.buscarEvento(idevento)
    return dataevento["data"]

@app.route('/agregarComentario', methods=['POST'])
def agregarComentario():
    _eventCL = EventosController()
    respComent = _eventCL.agregarComentario(request.json["data"])
    return respComent


@app.route('/filtrar_reporte_notificaciones', methods=['GET'])
def filtrar_reporte_notificaciones():
    _eventCL = EventosController()
    fecha_desde = request.args.get('fecha_desde')
    fecha_hasta = request.args.get('fecha_hasta')
    placa = request.args.get('placa')
    cod_cuenta = session["datauser"]["CodCuenta"]
    cod_cliente = session["cod_admin"]
    print(fecha_desde)
    respNoti = _eventCL.listarNotiReporteFiltros(cod_cuenta, cod_cliente, fecha_desde, fecha_hasta, placa)
    return json.dumps(respNoti)


