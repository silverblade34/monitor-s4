from src.tipoEventos.application.response import TipoEventosResponse
class TipoEventosController:
    def crearTipoEvento(self,cod_cuenta, cod_cliente, data):
        response = TipoEventosResponse()
        data = response.responseCrearTipoEvento(cod_cuenta, cod_cliente, data)
        return data
    
    def listarTipoEventos(self,cod_cuenta, cod_cliente):
        response = TipoEventosResponse()
        data = response.responseListarTipoEventos(cod_cuenta, cod_cliente) 
        return data
    
    def buscarTipoEventos(self,cod_cuenta, cod_cliente, cod_evento):
        response = TipoEventosResponse()
        data = response.responseBuscarTipoEventos(cod_cuenta, cod_cliente, cod_evento)
        return data
    
    def actualizarTipoEventos(self, dataEvento):
        response = TipoEventosResponse()
        data = response.actualizarTipoEventos(dataEvento)
        return data