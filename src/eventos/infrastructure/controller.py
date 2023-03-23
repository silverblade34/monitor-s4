from src.eventos.application.response import EventosResponse

class EventosController:
    def listarEventos(self, cod_cuenta, cod_cliente):
        response = EventosResponse()
        data = response.responseDataEventos(cod_cuenta, cod_cliente)
        return data
    
    def buscarEvento(self, idevento, cod_cuenta, cod_cliente):
        response = EventosResponse()
        data = response.responseBuscarEvento(idevento, cod_cuenta, cod_cliente)
        return data
    
    def agregarComentario(self, datacomentario):
        response = EventosResponse()
        data = response.responseAgregarComentario(datacomentario) 
        return data
    
    def listarNotiReporte(self, cod_cuenta, cod_cliente):
        response = EventosResponse()
        data = response.responseDataEventos(cod_cuenta, cod_cliente) 
        return data
    
    def listarNotiReporteFiltros(self, cod_cuenta, cod_cliente, fecha_desde, fecha_hasta, placa, eventos, estados):
        response = EventosResponse()
        data = response.responseDataReporteFiltros(cod_cuenta, cod_cliente, fecha_desde, fecha_hasta, placa, eventos, estados) 
        return data
    

    
