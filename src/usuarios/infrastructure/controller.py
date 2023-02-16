from src.usuarios.application.response import UsuariosResponse
class UsuariosController:
    def listarUsuarios(self, cod_cuenta):
        response = UsuariosResponse()
        data = response.responseListarUsuarios(cod_cuenta)
        return data
    
    def crearUsuario(self, datauser):
        response = UsuariosResponse()
        data = response.responseCrearUsuario(datauser)
        return data
    
    def eliminarUsuario(self, idusuario):
        response = UsuariosResponse()
        data = response.responseDeleteUsuario(idusuario)
        return data
    
    def buscarUsuario(self, idusuario, codcuenta):
        response = UsuariosResponse()
        datausuarios = response.responseListarUsuarios(codcuenta)
        usuario = response.responseBuscarUsuario(datausuarios, idusuario)
        return usuario
    
    def actualizarUsuario(self,id, data, codcuenta):
        response = UsuariosResponse()
        dataresp = response.responseActualizarUsuario(id, data, codcuenta) 
        return dataresp
    
    def listarCuentas(self, codcuenta):
        response = UsuariosResponse()
        data = response.responseListarCuentas(codcuenta)
        return data
    
    def crearUsuarioCliente(self, datauser, codcuenta):
        response = UsuariosResponse()
        data = response.responseCrearUsuarioCliente(datauser, codcuenta)
        return data
    
    def buscarUsuarioCliente(self, idcuenta, codcliente, codcuenta):
        response = UsuariosResponse()
        datausuarios = response.responseListarUsuarios(codcuenta)
        usuario = response.responseBuscarUsuarioCliente(datausuarios, idcuenta, codcliente) 
        return usuario
    
    def actualizarUsuarioCliente(self,id, data, codcuenta):
        response = UsuariosResponse()
        dataresp = response.responseActualizarUsuarioCliente(id, data, codcuenta) 
        return dataresp
    
    def eliminarUsuarioCliente(self, idusuario, codcliente):
        response = UsuariosResponse()
        data = response.responseDeleteUsuarioCliente(idusuario, codcliente)
        return data
    

