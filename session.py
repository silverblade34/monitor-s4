from flask import session, request
import uuid

def set_session_cookie_name():
    # Generar un identificador de sesión si no existe
    if 'session_id' not in session:
        session['session_id'] = str(uuid.uuid4())

    # Establecer el nombre de la cookie de sesión en base al usuario o al identificador de sesión
    if 'user' in session:
        session_name = 'session_' + str(session['user'])
    else:
        session_name = 'session_' + session['session_id']

    # Establecer el nombre de la cookie de sesión
    request.session_cookie_name = session_name
    print(f"Valor de session['session_id'] después: {session.get('session_id')}")
