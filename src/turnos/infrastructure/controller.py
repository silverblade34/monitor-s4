from src.turnos.application.response import TurnosResponse
class TurnosController:
    def listarTurnosOperarios(self, cod_cliente):
        response = TurnosResponse()
        data = response.responseListarTurnos(cod_cliente)
        return data
    
    def crearTurnoOperador(self, dataturno):
        response = TurnosResponse()
        data = response.responseCrearTurno(dataturno) 
        return data
    
    def buscarTurnoOperador(self, codigoturno, cod_cliente):
        response = TurnosResponse()
        data = response.responseBuscarTurnoOperador(codigoturno, cod_cliente)  
        return data
    
    def actualizarTurnoOperador(self, dataturno):
        response = TurnosResponse()
        data = response.responseActualizarTurnoOperador(dataturno)    
        return data