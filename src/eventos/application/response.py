import requests, json

class EventosResponse:
    def responseDataEventos(self, cod_cuenta, cod_cliente):
        data = {
                "cod_cuenta": cod_cuenta,
                "cod_cliente": cod_cliente
                }
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/notifications/Account', data=json.dumps(data))
        data = resp.json()
        if data["data"] is not None:
            return data["data"]
        else:
            return []
    
    def responseBuscarEvento(self, idevento):
        data = {"id": idevento}
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/notificationsById', data=json.dumps(data))
        data = resp.json()
        return data
    