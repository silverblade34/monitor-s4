function randombg() {
  var random = Math.floor(Math.random() * 3) + 0;
  var bigSize = [
    "url('https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2021/12/iveco-camion-autonomo-2565959.jpg?tf=3840x')", 
    "url('https://localizadorgpstracker.com.mx/wp-content/uploads/2018/06/beneficios-de-gps-para-empresas.jpg')",
    "url('https://images7.alphacoders.com/311/thumb-1920-311833.jpg')",
    "url('https://img.freepik.com/foto-gratis/hombre-vista-lateral-coche-entregando-paquete_23-2148889990.jpg?w=740&t=st=1676157659~exp=1676158259~hmac=63e702e9e3df38d7faca0122199c6b7b4da4163e6ef90a55e0fa208622bd4d46')",
  ];
  document.getElementById("right").style.backgroundImage = bigSize[random];
}

document.getElementById("password-toggle").addEventListener("click", function() {
  var input = document.getElementById("password-input");
  if (input.type === "password") {
    this.classList.remove("fa-eye");
    this.classList.add("fa-eye-slash");
    input.type = "text";
  } else {
    this.classList.remove("fa-eye-slash");
    this.classList.add("fa-eye");
    input.type = "password";
  }
});

// Ventana de loader

const btns = document.querySelectorAll(".btn-ingresar-monitor");
const hiddenLoa = document.getElementById("hidden-loader");

btns.forEach(btn => {
	btn.addEventListener("click", function(){
		console.log("----------------------------1")
		// Mostrando el div
		hiddenLoa.style.display = "flex";
	});

})
// Ventana de loader