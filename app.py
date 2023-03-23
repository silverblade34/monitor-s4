from flask import Flask, session
from flask_session import Session 
from flask_cors import CORS  
from flask_caching import Cache

app = Flask(__name__)

# Configuración de Flask-Session
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_FILE_DIR'] = './.flask_session/'
app.config['SECRET_KEY'] = 'super-secret-key'

# Inicialización de la extensión
Session(app)

cache = Cache(app, config={'CACHE_TYPE': 'simple'}) 

CORS(app)

# Importar los módulos de rutas después de la inicialización de Flask-Session y la configuración de CORS
import routes.credential_route
import routes.paginas_route
import routes.tipoeventos_route
import routes.notificaciones_route
import routes.usuarios_routes
import routes.respuestasnoti_route
import routes.dashboard_route

# Importar la función de manejo de errores 404 de la ruta de páginas
from routes.paginas_route import pagina_no_encontrada

if __name__ == '__main__':
    # Registrar la función de manejo de errores 404
    app.register_error_handler(404, pagina_no_encontrada)
    
    # Iniciar la aplicación de Flask en modo debug
    app.run(debug=True)
