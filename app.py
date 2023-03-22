from flask import Flask, session
from flask_cors import CORS  
from flask_caching import Cache
from session import set_session_cookie_name
import secrets

app = Flask(__name__) 
app.secret_key = secrets.token_hex(16)
cache = Cache(app, config={'CACHE_TYPE': 'simple'}) 

CORS(app)
import routes.credential_route
import routes.paginas_route
import routes.tipoeventos_route
import routes.notificaciones_route
import routes.usuarios_routes
import routes.respuestasnoti_route
import routes.dashboard_route
from routes.paginas_route import pagina_no_encontrada

@app.before_request
def before_request():
    set_session_cookie_name()

if __name__ == '__main__':
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(debug = True)
