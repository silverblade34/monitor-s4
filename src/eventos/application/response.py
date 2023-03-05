import requests, json, datetime

class EventosResponse:
    def responseDataEventos(self, cod_cuenta, cod_cliente):
        dataEnviar = {
                "cod_cuenta": cod_cuenta,
                "cod_cliente": cod_cliente
                }
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/notifications/Account', data=json.dumps(dataEnviar))
        data = resp.json()
        if data["data"] is not None:
            return data["data"]
        else:
            return []
    
    def responseBuscarEvento(self, idevento):
        dataEnviar = {"id": idevento}
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/notificationsById', data=json.dumps(dataEnviar))
        data = resp.json()
        return data
    
    def responseAgregarComentario(self, datacomentario):
        fecha_actual = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        dataEnviar = {
            "id": datacomentario["id"],
            "comentario":datacomentario["comentario"],
            "fecha_envio": str(fecha_actual),
            "descripcion_estado": datacomentario["desc_estado"],
            "usuario": datacomentario["usuario"]
        }
        print(dataEnviar)
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/addComment', data=json.dumps(dataEnviar))
        data = resp.json()
        print(data)
        return data
    