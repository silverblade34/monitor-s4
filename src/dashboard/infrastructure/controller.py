from ..application.response import DashboardResponse

class DashboardController:
    def listTablaEventos(self, cod_cuenta, cod_cliente):
        response = DashboardResponse()
        data = response.responseListTableEvents(cod_cuenta, cod_cliente)
        return data

    def cardsClientes(self, cod_cuenta, cod_cliente):
        response = DashboardResponse()
        data = response.responseCardsClientes(cod_cuenta, cod_cliente) 
        return data

    def cardsCuentas(self, cod_cuenta, cod_cliente):
        response = DashboardResponse()
        data = response.responseCardsCuentas(cod_cuenta, cod_cliente) 
        return data
    
    def graficosCuentas(self, cod_cuenta, cod_cliente):
        response = DashboardResponse()
        data = response.responseGraficosCuentas(cod_cuenta, cod_cliente)  
        return data