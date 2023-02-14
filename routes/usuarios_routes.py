from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.usuarios.infrastructure.controller import UsuariosController

from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/listar_usuarios', methods=['GET'])
def listar_usuarios():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.listarUsuarios()
        return render_template('admin_cuentas.html', datausuarios = data["data"],datauser = session["datauser"])
    else:
        return redirect(url_for('login'))
    
@app.route('/listar_cuentasmaestras', methods=['GET'])
def listar_cuentasmaestras():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.listarCuentas() 
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
        data = _userCL.buscarUsuario(request.args['idusuario'])
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/actualizar_cuenta', methods=['POST'])
def actualizar_cuenta():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.actualizarUsuario(request.json['id'],request.json['data']) 
        return data
    else:
        return redirect(url_for('login'))
    
@app.route('/crear_cuenta_cliente', methods=['POST'])
def crear_cuenta_cliente():
    if 'user' in session:
        _userCL = UsuariosController()
        data = _userCL.crearUsuarioCliente(request.json['data'], session['datauser']['cod_cuenta'])
        return data
    else:
        return redirect(url_for('login'))