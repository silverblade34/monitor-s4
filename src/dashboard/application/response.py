import requests, json
from config import API_SERVER

class DashboardResponse:
    def responseListTableEvents(self, cod_cuenta, cod_cliente):
        datapayload = {
            "cod_cuenta": cod_cuenta,
            "cod_cliente": cod_cliente
        }
        print(datapayload)
        url = f"{API_SERVER}/api/v1/home/clientes"
        resp = requests.post(url, data=json.dumps(datapayload))
        data = resp.json()
        return data
    
    def responseCardsClientes(self, cod_cuenta, cod_cliente):
        dataEnviar = {
            "cod_cuenta": cod_cuenta,
            "cod_cliente": cod_cliente
        }
        resp = requests.post(
            f'{API_SERVER}/api/v1/notifications/Account', data=json.dumps(dataEnviar))
        data = resp.json()
        events_sinatender = 0
        events_engestion = 0
        events_confirmados = 0
        events_descartados = 0
        datareturn = {}
        if len(data["data"]) > 0:
            for events in data["data"]:
                if events["descripcion_estado"] == "Sin Atender":
                    events_sinatender += 1
                elif events["descripcion_estado"] == "En Gestion":
                    events_engestion += 1
                elif events["descripcion_estado"] == "Confirmado":
                    events_confirmados += 1
                elif events["descripcion_estado"] == "Descartado":
                    events_descartados += 1
        datareturn["events_sinatender"] = events_sinatender
        datareturn["events_engestion"] = events_engestion
        datareturn["events_confirmados"] = events_confirmados
        datareturn["events_descartados"] = events_descartados
        return datareturn
        
