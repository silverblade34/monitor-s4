import requests, json
from datetime import datetime
class TipoEventosResponse:
    def responseCrearTipoEvento(self,cod_cuenta, cod_cliente, dataform):
        datarequest = self.requestEventos(cod_cuenta, cod_cliente)
        _id = datarequest["data"][0]["_id"]
        fecha_actual = datetime.now().strftime('%d-%m-%Y')
        data = {
                "id": _id,
                "cod_evento": dataform["codevento"],
                "descripcion": dataform["descripcion"],
                "fecha_creacion": fecha_actual,
                "prioridad": dataform["prioridad"],
                "usuario": cod_cliente,
                "status": True
                }
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/createEvents', data = json.dumps(data))
        data = resp.json()
        return data
        
    def responseListarTipoEventos(self, cod_cuenta, cod_cliente):
        data = self.requestEventos(cod_cuenta, cod_cliente)
        if len(data['data']) == 1:
            result = data['data'][0]["eventos"]
            return result
        else:
            listeventos = []
            for eventclient in data['data']:
                for eventos in eventclient["eventos"]:
                    eventoobject = eventos
                    eventoobject["cod_cliente"] = eventclient["cod_cliente"]
                    listeventos.append(eventoobject)
            return listeventos
    
    def requestEventos(self,cod_cuenta, cod_cliente):
        dataEnviar = {
                "cod_cuenta": cod_cuenta,
                "cod_cliente": cod_cliente
                }
        resp = requests.get(f'http://161.35.104.161:3000/api/v1/allEvents', data=json.dumps(dataEnviar))
        data = resp.json()
        return data
    
    def responseBuscarTipoEventos(self, cod_cuenta, cod_cliente, cod_evento):
        datarequest = self.requestEventos(cod_cuenta, cod_cliente)
        eventos = datarequest["data"][0]["eventos"]
        id = datarequest["data"][0]["_id"]
        for evento in eventos:
            if evento["cod_evento"] == cod_evento:
                evento["id"] = id
                return evento
    
    def actualizarTipoEventos(self, dataEvento):
        print(json.dumps(dataEvento))
        resp = requests.put(f'http://161.35.104.161:3000/api/v1/editEvents', data=json.dumps(dataEvento))
        data = resp.json()
        print(data)
        return data
