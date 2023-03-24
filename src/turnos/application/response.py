import requests
import json
from config import API_SERVER


class TurnosResponse:
    def responseListarTurnos(self, cod_cliente):
        dataEnviar = {
            "cod_cliente": cod_cliente
        }
        resp = requests.get(f'{API_SERVER}/api/v1/allShifts',
                            data=json.dumps(dataEnviar))
        data = resp.json()
        return data

    def responseCrearTurno(self, dataturno):
        dataEnviar = {
            "id": dataturno["id"],
            "cod_turno": "",
            "descripcion": dataturno["descripcion"],
            "desde": dataturno["hora_desde"],
            "hasta": dataturno["hora_hasta"]
        }
        resp = requests.post(f'{API_SERVER}/api/v1/createShifts',
                            data=json.dumps(dataEnviar))
        data = resp.json()
        return data
    
    def responseBuscarTurnoOperador(self, codigoturno, cod_cliente):
        dataturnos = self.responseListarTurnos(cod_cliente)
        for turno in dataturnos["data"][0]["turnos"]:
            if turno["cod_turno"] == codigoturno:
                return turno
            
    def responseActualizarTurnoOperador(self, dataturno):
        print("---------------1")
        dataEnviar = {
            "id": dataturno["id"],
            "cod_turno": dataturno["codigo"],
            "descripcion": dataturno["descripcion"],
            "desde": dataturno["hora_desde"],
            "hasta": dataturno["hora_hasta"]
        }
        print(json.dumps(dataEnviar))
        resp = requests.put(f'{API_SERVER}/api/v1/editShifts',
                            data=json.dumps(dataEnviar))
        data = resp.json()
        return data
