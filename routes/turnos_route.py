from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.turnos.infrastructure.controller import TurnosController
import requests, uuid
#from app import app
from __main__ import app

CORS(app)

@app.route('/crearturno_operador', methods=['POST'])
def crearturno_operador():
    if 'user' in session:
        _turnosCL = TurnosController()
        data = _turnosCL.crearTurnoOperador(request.json["data"]) 
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/buscar_turno', methods=['GET'])
def buscar_turno():
    if 'user' in session:
        _turnosCL = TurnosController()
        data = _turnosCL.buscarTurnoOperador(request.args["codigo"], session["cod_admin"])  
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/actualizar_turno', methods=['POST'])
def actualizar_turno():
    if 'user' in session:
        _turnosCL = TurnosController()
        data = _turnosCL.actualizarTurnoOperador(request.json["data"])  
        return data
    else:
        return redirect(url_for('login'))