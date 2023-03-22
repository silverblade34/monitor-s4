from ..application.response import DashboardResponse

class DashboardController:
    def listTablaEventos(self, cod_cuenta, cod_cliente):
        response = DashboardResponse()
        data = response.responseListTableEvents(cod_cuenta, cod_cliente)
        return data
