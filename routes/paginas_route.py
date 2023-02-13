from flask import Flask, request, render_template, redirect, url_for, session
from flask_cors import CORS

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
        return render_template('index.html', datauser = session["datauser"])
    else:
        return redirect(url_for('login'))

def pagina_no_encontrada(error):
    return render_template('404.html'), 404

@app.route('/admincuentas', methods=['GET'])
def admincuentas():
    if 'user' in session:
        session.pop('idevento', None)
        return redirect(url_for('listar_usuarios')) 
    else:
        return redirect(url_for('login'))
