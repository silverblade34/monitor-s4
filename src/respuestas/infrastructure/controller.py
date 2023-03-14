from ..application.response import RespuestasResponse

class RespuestasController:
    def __init__(self):
        self.response = RespuestasResponse()

    def listarRespuestas(self, cod_cliente):
        dataresp = self.response.responseListarRespuestas(cod_cliente)
        return dataresp
    
    def crearRespuestas(self, data):
        dataresp = self.response.responseCrearRespuestas(data)
        return dataresp
    
    def buscarRespuestas(self, codigo, cod_cliente):
        dataresp = self.response.responseBuscarRespuestas(codigo, cod_cliente)
        return dataresp
    
    def actualizarRespuestas(self, data):
        dataresp = self.response.responseActualizarRespuestas(data) 
        return dataresp