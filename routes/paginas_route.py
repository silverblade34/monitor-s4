from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.usuarios.infrastructure.controller import UsuariosController
from src.eventos.infrastructure.controller import EventosController
import requests

from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/', methods=['GET'])
def index():
    if 'user' in session:
        return redirect(url_for('home'))
    else:
        return redirect(url_for('login'))

@app.route('/home', methods=['GET'])
def home():
    if 'user' in session:
        if 'idevento' in session:
            session.pop('idevento', None) 
        return render_template('index.html', datauser = session["datauser"], codp = "home")
    else:
        return redirect(url_for('login'))

def pagina_no_encontrada(error):
    return render_template('404.html'), 404

@app.route('/listar_usuarios', methods=['GET'])
def listar_usuarios():
    if 'user' in session:
        try:
            _userCL = UsuariosController()
            data = _userCL.listarUsuarios(session['datauser']['CodCuenta'])
            return render_template('admin_cuentas2.html', datacuentas = data["data"], datauser = session["datauser"], codp = "adm-u")
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('index.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('login'))
    
@app.route('/tipo_evento', methods=['GET'])
def tipo_evento():
    if 'user' in session:
        _eventCL = EventosController()
        datatipoevento = _eventCL.listarTipoEventos()
        return render_template("tipo_evento.html", datauser = session["datauser"], datatipoevento = datatipoevento["data"], codp = "adm-tipevent")
    else:
        return redirect(url_for('home'))
