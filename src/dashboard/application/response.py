import requests, json
from config import API_SERVER

class DashboardResponse:
    def responseListTableEvents(self, cod_cuenta, cod_cliente):
        datapayload = {
            "cod_cuenta": cod_cuenta,
            "cod_cliente": cod_cliente
        }
        print(datapayload)
        url = f"{API_SERVER}/api/v1/home/clientes"
        print(url)
        resp = requests.post(url, data=json.dumps(datapayload))
        data = resp.json()
        print(data)
        return data
        
