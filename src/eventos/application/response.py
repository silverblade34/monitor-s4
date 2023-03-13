import requests, json, datetime
from config import API_SERVER
class EventosResponse:
    def responseDataEventos(self, cod_cuenta, cod_cliente):
        dataEnviar = {
                "cod_cuenta": cod_cuenta,
                "cod_cliente": cod_cliente
                }
        resp = requests.post(f'{API_SERVER}/api/v1/notifications/Account', data=json.dumps(dataEnviar))
        data = resp.json()
        if data["data"] is not None:
            return data["data"]
        else:
            return []
    
    def responseBuscarEvento(self, idevento):
        dataEnviar = {"id": idevento}
        resp = requests.post(f'{API_SERVER}/api/v1/notificationsById', data=json.dumps(dataEnviar))
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
        resp = requests.post(f'{API_SERVER}/api/v1/addComment', data=json.dumps(dataEnviar))
        data = resp.json()
        return data
    
    def responseDataReporte(self, cod_cuenta, cod_cliente):
        dataEnviar = {
                "cod_cuenta": cod_cuenta,
                "cod_cliente": cod_cliente,
                "estado": 1 
                }
        resp = requests.get(f'{API_SERVER}/api/v1/allNotifications', data=json.dumps(dataEnviar))
        data = resp.json()
        if data is not None:
            return data
        else:
            return []
        
    def responseDataReporteFiltros(self, cod_cuenta, cod_cliente, fecha_desde, fecha_hasta, placa):
        dataEnviar = {
                "cod_cuenta": cod_cuenta,
                "cod_cliente": cod_cliente,
                "estado": 1 
                }
        resp = requests.get(f'{API_SERVER}/api/v1/allNotifications', data=json.dumps(dataEnviar))
        data = resp.json()
        listNoti = []
        if data is not None:
            if placa != "" and fecha_desde == "" and fecha_hasta == "":
                for noti in data:
                    if noti["placa"] == placa.upper():
                        listNoti.append(noti)
                return listNoti
            elif fecha_desde != "" and fecha_hasta != "" and placa == "" :
                listfechas = self.obtener_elementos_por_rango_de_fechas(data, fecha_desde, fecha_hasta)
                return listfechas     
            elif fecha_desde != "" and fecha_hasta != "" and placa != "":
                listfechas = self.obtener_elementos_por_rango_de_fechas(data, fecha_desde, fecha_hasta)
                for noti in listfechas:
                    if noti["placa"] == placa.upper():
                        listNoti.append(noti)
                return listNoti
            else:
                return data
        else:
            return []
        
    def obtener_elementos_por_rango_de_fechas(self, lista, fecha_desde, fecha_hasta):
        return [elemento for elemento in lista if fecha_desde <= elemento['fecha'] <= fecha_hasta]

    