from src.credential.application.response import ResponseCredential
from src.credential.infrastructure.api import ApiConnection

class CredentialController:
    def validarUsuario(self, codcuenta, passwoord):
        connectapi = ApiConnection()
        data = connectapi.connectionApi(codcuenta, passwoord)
        return data
    