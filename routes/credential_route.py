from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS
from src.credential.infrastructure.controller import CredentialController
import requests 

#from app import app
from __main__ import app
app.secret_key = "hhyy526//--"
CORS(app)

@app.route('/login', methods=['GET', 'POST']) 
# Si se dirige al enlace por medio de la redireccion de index() por ende por GET lo enviara al login.html
# Por otro lado si llega al enlace por medio de un POST validara si los datos son correctos
def login():
    if request.method == 'POST':
        try:
            if str(request.form['usuario']) != "" and str(request.form['password']) != "":
                _credentialCL = CredentialController()
                datauser = _credentialCL.validarUsuario(request.form['usuario'], request.form['password'])
                print(datauser)
                if datauser["status"] == True:
                    session["user"] = datauser["data"]["Usuario"]
                    session["datauser"] = datauser["data"]
                    session["user_admin"] = datauser["UsuarioClienteAdmin"]
                    session["cod_admin"] = datauser["CodClienteAdmin"]
                    return redirect(url_for('dashboard'))
                elif datauser["status"] == False:
                    return render_template('login.html', message = "Usuario no válido")
                return render_template('login.html')
            else:
                return render_template('login.html', message = "Usuario o contraseña sin completar")
        except requests.exceptions.RequestException as e:
            mensaje_error = "Hubo un error al conectarse con la API. Por favor, inténtelo de nuevo más tarde."
            print(mensaje_error)
            return render_template('login.html', msgerror = mensaje_error)
    else:
        return render_template('login.html')
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))