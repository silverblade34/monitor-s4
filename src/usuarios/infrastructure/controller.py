from src.usuarios.application.response import UsuariosResponse
class UsuariosController:
    def listarUsuarios(self):
        response = UsuariosResponse()
        data = response.responseListarUsuarios()
        return data
    
    def crearUsuario(self, datauser):
        response = UsuariosResponse()
        data = response.responseCrearUsuario(datauser)
        return data
    
    def eliminarUsuario(self, idusuario):
        response = UsuariosResponse()
        data = response.responseDeleteUsuario(idusuario)
        return data
    
    def buscarUsuario(self, idusuario):
        response = UsuariosResponse()
        datausuarios = response.responseListarUsuarios()
        usuario = response.responseBuscarUsuario(datausuarios, idusuario)
        return usuario
    
    def actualizarUsuario(self,id,cod_cuenta, cod_cliente, contrasena, usuario, ruc):
        response = UsuariosResponse()
        dataresp = response.responseActualizarUsuario(id,cod_cuenta, cod_cliente, contrasena, usuario, ruc) 
        return dataresp
