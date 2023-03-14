import requests, json
from config import API_SERVER

class RespuestasResponse:
    def responseListarRespuestas(self, cod_cliente):
        dataEnviar = {
            "cod_cliente": cod_cliente
        }
        resp = requests.get(f'{API_SERVER}/api/v1/allResponses', data=json.dumps(dataEnviar))
        data = resp.json()
        if data["data"] is not None:
            respuesta = data["data"][0]
            return respuesta
        else:
            return []
        
    def responseCrearRespuestas(self, data):
        dataEnviar = {
            "id": data["id"],
            "codigo":"",
            "sigla":data["sigla"],
            "text":data["texto"]
        }
        resp = requests.post(f'{API_SERVER}/api/v1/createResponse', data=json.dumps(dataEnviar))
        data = resp.json()
        return data
        
    def responseBuscarRespuestas(self, codigo, cod_cliente):
        dataresp = self.responseListarRespuestas(cod_cliente)
        for respuesta in dataresp["respuestas"]:
            if respuesta["codigo"] == codigo:
                return respuesta
            
    def responseActualizarRespuestas(self, data):
        dataEnviar = {
            "id": data["id"],
            "codigo":data["codigo"],
            "sigla":data["sigla"],
            "text":data["texto"]
        }
        print(dataEnviar)
        resp = requests.put(f'{API_SERVER}/api/v1/editResponse', data=json.dumps(dataEnviar))
        print("-----")
        data = resp.json()
        print(data)
        return data