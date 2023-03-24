from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.usuarios.infrastructure.controller import UsuariosController
from src.turnos.infrastructure.controller import TurnosController
import requests, uuid
#from app import app
from __main__ import app

CORS(app)

@app.route('/listar_cuentasmaestras', methods=['GET'])
def listar_cuentasmaestras():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.listarCuentas(session['datauser']['CodCuenta']) 
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/crear_cuenta', methods=['POST'])
def crear_cuenta():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.crearUsuario(request.json['data'])
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/eliminar_cuenta', methods=['GET'])
def eliminar_cuenta():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.eliminarUsuario(request.args['idusuario']) 
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/buscar_cuenta', methods=['GET'])
def buscar_cuenta():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.buscarUsuario(request.args['idusuario'], session['datauser']['CodCuenta'])
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/actualizar_cuenta', methods=['POST'])
def actualizar_cuenta():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.actualizarUsuario(request.json['id'],request.json['data'], session['datauser']['CodCuenta']) 
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/crear_cuenta_cliente', methods=['POST'])
def crear_cuenta_cliente():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.crearUsuarioCliente(request.json['data'], session['datauser']['CodCuenta'])
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/buscar_cuenta_cliente', methods=['GET'])
def buscar_cuenta_cliente():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.buscarUsuarioCliente(request.args['idcuenta'], request.args['codcliente'] ,session['datauser']['CodCuenta'])
        return data
    else:
        return redirect(url_for('login'))

@app.route('/actualizar_cuenta_cliente', methods=['POST'])
def actualizar_cuenta_cliente():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.actualizarUsuarioCliente(request.json['id'],request.json['data'], session['datauser']['CodCuenta']) 
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/eliminar_cuenta_cliente', methods=['GET'])
def eliminar_cuenta_cliente():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.eliminarUsuarioCliente(request.args['idusuario'], request.args['codcliente'])  
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/mostrar_idcuenta', methods=['GET'])
def mostrar_idcuenta():
    _userCL = UsuariosController()
    _turnosCL = TurnosController()
    data = _userCL.listarUsuarios(session['datauser']['CodCuenta'])
    dataturnos = _turnosCL.listarTurnosOperarios(session["cod_admin"])
    turnos = dataturnos["data"][0]
    datacuenta = data["data"][0]
    datacuenta["turnos"] = turnos
    print(datacuenta)
    return datacuenta

@app.route('/validarUsuarioUnico', methods=['GET'])
def validarUsuarioUnico():
    _userCL = UsuariosController()
    data = _userCL.validarusuarioUnico(request.args["nameusuario"])
    return data

@app.route('/guardarImageCliente', methods=['POST'])
def guardarImageCliente():
    _userCL = UsuariosController()
    data = _userCL.guardarImageCliente(request.files["file"], request.form["usuario"])
    return data