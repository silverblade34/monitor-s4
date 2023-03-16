import requests, json, datetime
from datetime import datetime
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
        
    def responseDataReporteFiltros(self, cod_cuenta, cod_cliente, fecha_desde, fecha_hasta, placa, cod_evento, descripcion_estado):
        dataNotificaciones = self.responseDataEventos(cod_cuenta, cod_cliente)
        parametros_filtrar = {
            "cod_cuenta" : cod_cuenta,
            "cod_cliente" : cod_cliente,
            "fecha_desde" : fecha_desde,
            "fecha_hasta" : fecha_hasta,
            "placa" : placa,
            "descripcion_estado": descripcion_estado,
            "cod_evento" : cod_evento
        }
        datos_filtrados = self.filtrar_por_parametros(dataNotificaciones, parametros_filtrar)
        print(json.dumps(datos_filtrados))
        return datos_filtrados

    def filtrar_por_parametros(self, lista, parametros_filtrar):
        def filtro(diccionario):
            fecha_desde = ""
            fecha_hasta = ""
            if parametros_filtrar["fecha_desde"]:
                fecha_desde = datetime.strptime(parametros_filtrar["fecha_desde"], "%Y-%m-%d")
            if parametros_filtrar["fecha_hasta"]:
                fecha_hasta = datetime.strptime(parametros_filtrar["fecha_hasta"], "%Y-%m-%d")
            fecha_lista = datetime.strptime(diccionario["fecha"],"%d.%m.%Y %H:%M:%S")
            parametros_filtrar["fecha_desde"]
            print(fecha_desde)
            if parametros_filtrar["cod_cuenta"] != "" and diccionario["cod_cuenta"] != parametros_filtrar["cod_cuenta"]:
                return False
            if parametros_filtrar["cod_cliente"] != "" and diccionario["cod_cliente"] != parametros_filtrar["cod_cliente"]:
                return False
            if fecha_desde != "" and fecha_lista < fecha_desde:
                return False
            if fecha_hasta != "" and fecha_lista > fecha_hasta:
                return False
            if parametros_filtrar["placa"] != "" and diccionario["placa"] != parametros_filtrar["placa"]:
                return False
            if parametros_filtrar["descripcion_estado"] != "" and diccionario["DescripcionEstado"] != parametros_filtrar["descripcion_estado"]:
                return False
            if parametros_filtrar["cod_evento"] != "" and diccionario["cod_evento"] != parametros_filtrar["cod_evento"]:
                return False
            return True

        return list(filter(filtro, lista))

    