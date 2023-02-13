from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.eventos.infrastructure.controller import EventosController

from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/listar_eventos', methods=['GET'])
def listar_eventos():
    _eventCL = EventosController()
    cod_cuenta = session["datauser"]["cod_cuenta"]
    cod_cliente = session["datauser"]["cod_cliente"]
    dataevento = _eventCL.listarEventos(cod_cuenta, cod_cliente)
    return dataevento

@app.route('/editar_evento', methods=['GET'])
def editar_evento():
    if 'user' in session:
        _eventCL = EventosController()
        session["idevento"] = request.args["idevento"]
        dataevento = _eventCL.buscarEvento(session["idevento"])
        if dataevento["status"] == True:
            return render_template("edit_evento.html", id = session["idevento"], dataevento = dataevento["data"], cliente = session["datauser"]["nombre_cuenta"], datauser = session["datauser"])
    else:
        return redirect(url_for('home'))

@app.route('/func_buscarEvento', methods=['GET'])
def func_buscarEvento():
    _eventCL = EventosController()
    idevento = session["idevento"]
    dataevento = _eventCL.buscarEvento(idevento)
    print(dataevento["data"])
    return dataevento["data"]

