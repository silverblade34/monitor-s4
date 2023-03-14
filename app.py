from flask import Flask
from flask_cors import CORS  
app = Flask(__name__) 
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'}) 

CORS(app)
import routes.credential_route
import routes.paginas_route
import routes.tipoeventos_route
import routes.notificaciones_route
import routes.usuarios_routes
import routes.respuestasnoti_route
from routes.paginas_route import pagina_no_encontrada

if __name__ == '__main__':
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(debug = True)

