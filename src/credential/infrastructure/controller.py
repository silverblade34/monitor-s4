from src.credential.application.response import ResponseCredential
from src.credential.infrastructure.api import ApiConnection

class CredentialController:
    def validarUsuario(self, username, passwoord):
        response = ResponseCredential()
        connectapi = ApiConnection()
        data = connectapi.connectionApi(username, passwoord)
        return data