import requests, json, hashlib

class UsuariosResponse:
    def __init__(self):
        pass
    def responseListarUsuarios(self):
        resp = requests.get(f'http://161.35.104.161:3000/api/v1/Allusuarios')
        data = resp.json()
        return data
    
    def responseListarCuentas(self):
        resp = requests.get(f'http://161.35.104.161:3000/api/v1/Allusuarios')
        data = resp.json()
        cuentasmaestras = []
        for usuario in data["data"]:
            if usuario["cod_cliente"] == "All" and usuario["cod_cuenta"] != "0000":
                cuentasmaestras.append(usuario)
        return cuentasmaestras
    
    def responseCrearUsuario(self, datauser):
        hed = {"Content-Type": "application/json"}
        hash_object = hashlib.md5(datauser["contrasena"].encode())
        contrasena = hash_object.hexdigest()
        payload = {"cod_cuenta": datauser["cod_cuenta"], "cod_cliente" : datauser["cod_cliente"], "contrasena" : contrasena, "usuario" : datauser["usuario"], "ruc" : datauser["ruc"], "nombre_cuenta": datauser["nombre_cuenta"],
        "nombre_cliente": datauser["nombre_cliente"], "nombre_rol": datauser["nombre_rol"], "estado" : True}
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/Addusuarios', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data
    
    def responseDeleteUsuario(self, idusuario):
        hed = {"Content-Type": "application/json"}
        payload =  {"id" : idusuario}
        resp = requests.delete(f'http://161.35.104.161:3000/api/v1/Deleteusuarios', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data
    
    def responseBuscarUsuario(self, datausuarios, idusuario):
        for usuario in datausuarios["data"]:
            if str(usuario["ID"]) == str(idusuario):
                print(usuario)
                return usuario
    
    def responseActualizarUsuario(self,id, data):
        hed = {"Content-Type": "application/json"}
        datausuarios = self.responseListarUsuarios()
        hash_object = hashlib.md5(data["contrasena"].encode())
        contrasena = hash_object.hexdigest()
        contrasenafin = ""
        for usuario in datausuarios["data"]:
            if usuario["ID"] == id:
                if usuario["contrasena"] == data["contrasena"]:
                    contrasenafin = usuario["contrasena"]
                else:
                    contrasenafin = contrasena
        payload = { "id": id, "cod_cliente": data["cod_cliente"], "cod_cuenta": data["cod_cuenta"], "contrasena": contrasenafin, "usuario": data["usuario"],"ruc": data["ruc"],
                   "nombre_cuenta": data["nombre_cuenta"],"nombre_cliente": data["nombre_cliente"], "nombre_rol": data["nombre_rol"], "estado" : data["estado"]}
        resp = requests.put(f'http://161.35.104.161:3000/api/v1/Editusuarios', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data

    def responseCrearUsuarioCliente(self, datauser, cod_cuenta):
        hed = {"Content-Type": "application/json"}
        hash_object = hashlib.md5(datauser["contrasena"].encode())
        contrasena = hash_object.hexdigest()
        payload = {"cod_cuenta": cod_cuenta, "cod_cliente" : datauser["cod_cliente"], "contrasena" : contrasena, "usuario" : datauser["usuario"], "ruc" : datauser["ruc"], "nombre_cuenta": datauser["nombre_cuenta"],
        "nombre_cliente": datauser["nombre_cliente"], "nombre_rol": datauser["nombre_rol"], "estado" : True}
        resp = requests.post(f'http://161.35.104.161:3000/api/v1/Addusuarios', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data