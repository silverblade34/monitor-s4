from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.credential.infrastructure.controller import CredentialController 

from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/login', methods=['GET', 'POST']) 
# Si se dirige al enlace por medio de la redireccion de index() por ende por GET lo enviara al login.html
# Por otro lado si llega al enlace por medio de un POST validara si los datos son correctos
def login():
    if request.method == 'POST':
        if str(request.form['codcuenta']) != "" and str(request.form['password']) != "":
            _credentialCL = CredentialController()
            datauser = _credentialCL.validarUsuario(request.form['codcuenta'], request.form['password'])
            if datauser["status"] == True:
                session["user"] = datauser["data"]["Usuario"]
                session["datauser"] = datauser["data"]
                session["cod_admin"] = datauser["CodClienteAdmin"]
                return redirect(url_for('home'))
            elif datauser["status"] == False:
                return render_template('login.html', message = "Usuario no válido")
            return render_template('login.html')
        else:
            return render_template('login.html', message = "Usuario o contraseña sin completar")
    else:
        return render_template('login.html')
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))