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
    return dataevento

@app.route('/editar_evento', methods=['GET'])
def editar_evento():
    if 'user' in session:
        try:
            _eventCL = EventosController()
            session["idevento"] = request.args["idevento"]
            dataevento = _eventCL.buscarEvento(session["idevento"])
            if dataevento["status"] == True:
                return render_template("edit_evento.html", id = session["idevento"], dataevento = dataevento["data"], datauser = session["datauser"])
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('index.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('home'))

@app.route('/func_buscarEvento', methods=['GET'])
def func_buscarEvento():
    _eventCL = EventosController()
    idevento = session["idevento"]
    dataevento = _eventCL.buscarEvento(idevento)
    return dataevento["data"]

