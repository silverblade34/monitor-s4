import requests, json, hashlib
from config import API_SERVER
from werkzeug.utils import secure_filename
from config import UPLOAD_FOLDER
import os

class UsuariosResponse:
    def __init__(self):
        pass
    def responseListarUsuarios(self, cod_cuenta):
        hed = {"Content-Type": "application/json"}
        payload = {"cod_cuenta":cod_cuenta}
        resp = requests.post(f'{API_SERVER}/api/v1/listAccounts', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data
    
    def responseListarCuentas(self, cod_cuenta):
        data = self.responseListarUsuarios(cod_cuenta)
        cuentasmaestras = []
        for usuario in data["data"]:
            if usuario["cod_cuenta"] != "0000":
                cuentasmaestras.append(usuario)
        return cuentasmaestras
    
    def responseCrearUsuario(self, datauser):
        hed = {"Content-Type": "application/json"}
        hash_object = hashlib.md5(datauser["contrasena"].encode())
        contrasena = hash_object.hexdigest()
        payload = {"cod_cuenta": datauser["cod_cuenta"],"cod_cliente": "All", "contrasena" : contrasena, "usuario" : datauser["usuario"], "ruc" : datauser["ruc"], "empresa": datauser["nombre_cuenta"].upper(),
        "rol": datauser["nombre_rol"],"sigla" : datauser["sigla"].upper(), "nombre_contacto1": datauser["namecontacto1"], "telefono_contacto1": datauser["contacto1"], "nombre_contacto2": datauser["namecontacto2"],
          "telefono_contacto2": datauser["contacto2"], "estado" : True,  "clientes": []}
        resp = requests.post(f'{API_SERVER}/api/v1/createAccount', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data
    
    def responseDeleteUsuario(self, idusuario):
        hed = {"Content-Type": "application/json"}
        payload =  {"id" : idusuario}
        resp = requests.delete(f'{API_SERVER}/api/v1/deleteAccount', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data
    
    def responseBuscarUsuario(self, datausuarios, idusuario):
        for usuario in datausuarios["data"]:
            if str(usuario["ID"]) == str(idusuario):
                return usuario
    
    def responseActualizarUsuario(self,id, data, codcuenta):
        hed = {"Content-Type": "application/json"}
        datausuarios = self.responseListarUsuarios(codcuenta)
        hash_object = hashlib.md5(data["contrasena"].encode())
        contrasena = hash_object.hexdigest()
        contrasenafin = ""
        for usuario in datausuarios["data"]:
            if usuario["ID"] == id:
                if usuario["contrasena"] == data["contrasena"]:
                    contrasenafin = usuario["contrasena"]
                else:
                    contrasenafin = contrasena
        payload = { "id": id, "cod_cuenta": data["cod_cuenta"], "contrasena": contrasenafin, "usuario": data["usuario"], "sigla": data["sigla"].upper(),"nombre_contacto1": data["namecontacto1"], "telefono_contacto1": data["contacto1"], "nombre_contacto2": data["namecontacto2"],
          "telefono_contacto2": data["contacto2"], "ruc": data["ruc"], "empresa": data["nombre_cuenta"].upper(), "rol": data["nombre_rol"], "estado" : data["estado"]}
        print(json.dumps(payload))
        resp = requests.put(f'{API_SERVER}/api/v1/editAccount', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data

    def responseCrearUsuarioCliente(self, datauser, codcuenta):
        datausuarios = self.responseListarUsuarios(codcuenta)
        cod_cuenta = ""
        for cuenta in datausuarios["data"]:
            if cuenta["ID"] == datauser["idcuenta"]:
                cod_cuenta = cuenta["cod_cuenta"]
        hed = {"Content-Type": "application/json"}
        hash_object = hashlib.md5(datauser["contrasena"].encode())
        contrasena = hash_object.hexdigest()
        payload = {"id": datauser["idcuenta"], "cod_cliente" : datauser["cod_cliente"],"cod_cuenta": cod_cuenta ,"contrasena" : contrasena, "sigla" : datauser["sigla"].upper() ,"usuario" : datauser["usuario"], "ruc" : datauser["ruc"],
        "empresa": datauser["nombre_cliente"].upper(), "rol": datauser["nombre_rol"], "estado" : True}
        resp = requests.post(f'{API_SERVER}/api/v1/createClient', data= json.dumps(payload), headers= hed)
        data = resp.json()
        print(data)
        return data
    
    def responseBuscarUsuarioCliente(self, datacuentas, idcuenta, codcliente):
        for cuenta in datacuentas["data"]:
            if str(cuenta["ID"]) == str(idcuenta):
                for cliente in cuenta["clientes"]:
                    if cliente["cod_cliente"] == codcliente:
                        return cliente
                    
    def responseActualizarUsuarioCliente(self,id, data, codcuenta):
        hed = {"Content-Type": "application/json"}
        datacuentas = self.responseListarUsuarios(codcuenta) 
        contrasenafin = ""
        for cuenta in datacuentas["data"]:
            if cuenta["ID"] == id:
                for cliente in cuenta["clientes"]:
                    if cliente["cod_cliente"] == data["cod_cliente"]:
                        hash_object = hashlib.md5(data["contrasena"].encode())
                        contrasena = hash_object.hexdigest()
                        if cliente["contrasena"] == data["contrasena"]:
                            contrasenafin = cliente["contrasena"]
                        else:
                            contrasenafin = contrasena
        payload = { "id": id, "cod_cliente": data["cod_cliente"] ,"empresa": data["nombre_cliente"].upper(), "usuario": data["usuario"], "sigla" : data["sigla"].upper() , "contrasena": contrasenafin,"ruc": data["ruc"],
                   "rol": data["rol_cliente"], "estado" : data["estado"]}
        print(json.dumps(payload))
        resp = requests.put(f'{API_SERVER}/api/v1/editClient', data= json.dumps(payload), headers= hed)
        data = resp.json()
        print(data)
        return data
    
    def responseDeleteUsuarioCliente(self, idusuario, codcliente):
        hed = {"Content-Type": "application/json"}
        payload =  {"id" : idusuario, "cod_cliente": codcliente}
        resp = requests.delete(f'{API_SERVER}/api/v1/deleteClient', data= json.dumps(payload), headers= hed)
        data = resp.json()
        return data
    
    def validarusuarioUnico(self, usuario):
        payload =  {"usuario" : usuario}
        resp = requests.get(f'{API_SERVER}/api/v1/repeatUser', data= json.dumps(payload))
        data = resp.json()
        return data
    
    def guardarImage(self, file, usuario):
        try:
            filename = secure_filename(usuario + '.' + file.filename.split('.')[-1])
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            return "Guardado"
        except Exception as err:
            return err
        