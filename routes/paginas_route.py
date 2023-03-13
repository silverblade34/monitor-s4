from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.usuarios.infrastructure.controller import UsuariosController
from src.eventos.infrastructure.controller import EventosController
from src.tipoEventos.infrastructure.controller import TipoEventosController
import requests

#from app import app
from __main__ import app, cache
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/layout')
@cache.cached(timeout=60*60*24)
def layout():
    return render_template('layout.html')

@app.route('/', methods=['GET'])
def index():
    if 'user' in session:
        return redirect(url_for('notificaciones'))
    else:
        return redirect(url_for('login'))

@app.route('/notificaciones', methods=['GET'])
def notificaciones():
    if 'user' in session:
        if 'idevento' in session:
            session.pop('idevento', None)
        return render_template('notificaciones.html', datauser = session["datauser"], codp = "notificaciones")
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
            return render_template('admin_cuentas.html', datacuentas = data["data"], datauser = session["datauser"], codp = "adm-u")
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('notificaciones.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('login'))
    
@app.route('/tipo_evento', methods=['GET'])
def tipo_evento():
    if 'user' in session:
        try:
            _eventTypeCL = TipoEventosController()
            cod_cuenta = session["datauser"]["CodCuenta"]
            cod_cliente = session["cod_admin"]
            datatipoevento = _eventTypeCL.listarTipoEventos(cod_cuenta, cod_cliente)
            print(datatipoevento)
            return render_template("tipo_evento.html", datauser = session["datauser"], datatipoevento = datatipoevento, codp = "adm-tipevent")
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('notificaciones.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('notificaciones'))

@app.route('/editar_evento', methods=['GET'])
def editar_evento():
    if 'user' in session:
        try:
            _eventCL = EventosController()
            session["idevento"] = request.args["idevento"]
            dataevento = _eventCL.buscarEvento(session["idevento"])
            print(dataevento)
            if dataevento["status"] == True:
                return render_template("edit_notificaciones.html", id = session["idevento"], dataevento = dataevento["data"], datauser = session["datauser"])
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('notificaciones.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('notificaciones'))
    
@app.route('/reporte_notificaciones', methods=['GET'])
def reporte_notificaciones():
    if 'user' in session:
        try:
            _eventCL = EventosController()
            cod_cuenta = session["datauser"]["CodCuenta"]
            cod_cliente = session["cod_admin"]
            datanoti = _eventCL.listarNotiReporte(cod_cuenta, cod_cliente)
            return render_template("reporte_notificaciones.html", datauser = session["datauser"], datanoti = datanoti, codp = "report-noti")
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('notificaciones.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('notificaciones'))
    
@app.route('/adminrespuestas_notificaciones', methods=['GET'])
def adminrespuestas_notificaciones():
    if 'user' in session:
        try:
            _eventCL = EventosController()
            return render_template("adminrespuestas_notificaciones.html", datauser = session["datauser"], codp = "resp-noti")
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('notificaciones.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('notificaciones'))
