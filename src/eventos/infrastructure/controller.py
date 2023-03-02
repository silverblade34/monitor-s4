from src.eventos.application.response import EventosResponse

class EventosController:
    def listarEventos(self, cod_cuenta, cod_cliente):
        response = EventosResponse()
        data = response.responseDataEventos(cod_cuenta, cod_cliente)
        return data
    
    def buscarEvento(self, idevento):
        response = EventosResponse()
        data = response.responseBuscarEvento(idevento)
        return data
    

    
