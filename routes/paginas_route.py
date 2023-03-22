from flask import Flask, request, render_template, redirect, url_for, session 
from flask_cors import CORS 
from src.usuarios.infrastructure.controller import UsuariosController
from src.eventos.infrastructure.controller import EventosController
from src.tipoEventos.infrastructure.controller import TipoEventosController
from src.respuestas.infrastructure.controller import RespuestasController
import requests, uuid

#from app import app
from __main__ import app, cache
from session import set_session_cookie_name
CORS(app)

@app.before_request
def before_request():
    set_session_cookie_name()

@app.route('/layout')
@cache.cached(timeout=60*60*24)
def layout():
    return render_template('layout.html')

@app.route('/', methods=['GET'])
def index():
    if 'user' in session and 'datauser' in session:
        return redirect(url_for('dashboard'))
    else:
        return redirect(url_for('login'))
    
@app.route('/dashboard', methods=['GET'])
def dashboard():
    if 'user' in session and 'datauser' in session:
        try:
            if session["datauser"]["CodCliente"] == "All":
                return render_template('dashboard_cuentas.html', datauser = session["datauser"], codp = "home")
            else:
                return render_template('dashboard_clientes.html', datauser = session["datauser"], codp = "home", useradmin = session["user_admin"])
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('login.html', msgerror = mensaje_error)
    else:
        return redirect(url_for('login'))

@app.route('/notificaciones', methods=['GET'])
def notificaciones():
    if 'user' in session and 'datauser' in session:
        try:
            if 'idevento' in session:
                session.pop('idevento', None)
            print(session["cod_admin"])
            return render_template('notificaciones.html', datauser = session["datauser"], codp = "notificaciones", useradmin = session["user_admin"])
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('login.html', msgerror = mensaje_error)
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
            return render_template('admin_cuentas.html', datacuentas = data["data"], datauser = session["datauser"], codp = "adm-u", useradmin = session["user_admin"])
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
            return render_template("tipo_evento.html", datauser = session["datauser"], datatipoevento = datatipoevento, codp = "adm-tipevent", useradmin = session["user_admin"])
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
            _respuCL = RespuestasController()
            cod_cliente = session["cod_admin"]
            dataresp = _respuCL.listarRespuestas(cod_cliente)
            dataevento = _eventCL.buscarEvento(session["idevento"])
            print(dataevento)
            print(dataresp)
            if dataevento["status"] == True:
                return render_template("edit_notificaciones.html", id = session["idevento"], dataevento = dataevento["data"], datauser = session["datauser"], useradmin = session["user_admin"], dataresp = dataresp)
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
            _eventTypeCL = TipoEventosController()
            cod_cuenta = session["datauser"]["CodCuenta"]
            cod_cliente = session["cod_admin"]
            datatipoevento = _eventTypeCL.listarTipoEventos(cod_cuenta, cod_cliente)
            print(datatipoevento)
            return render_template("reporte_notificaciones.html", datauser = session["datauser"], datanoti = datanoti, codp = "report-noti", datatipoevento= datatipoevento, useradmin = session["user_admin"])
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
            _respuCL = RespuestasController()
            cod_cliente = session["cod_admin"]
            dataresp = _respuCL.listarRespuestas(cod_cliente)
            return render_template("adminrespuestas_notificaciones.html", datauser = session["datauser"], codp = "resp-noti", dataresp = dataresp, useradmin = session["user_admin"])
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('notificaciones.html', datauser = session["datauser"], msgerror = mensaje_error)
    else:
        return redirect(url_for('notificaciones'))
