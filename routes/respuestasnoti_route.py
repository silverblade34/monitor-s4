from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.respuestas.infrastructure.controller import RespuestasController
import requests 
#from app import app
from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/crear_resp_prede', methods=['POST'])
def crear_resp_prede():
    _respCL = RespuestasController()
    dataresp = _respCL.crearRespuestas(request.json['data'])
    return dataresp

@app.route('/buscar_resp_prede', methods=['GET'])
def buscar_resp_prede():
    _respCL = RespuestasController()
    cod_cliente = session["cod_admin"]
    dataresp = _respCL.buscarRespuestas(request.args['codigo'], cod_cliente)
    return dataresp

@app.route('/act_resp_prede', methods=['POST'])
def act_resp_prede():
    _respCL = RespuestasController()
    dataresp = _respCL.actualizarRespuestas(request.json['data']) 
    print(dataresp)
    return dataresp