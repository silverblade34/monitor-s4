function randombg() {
  var random = Math.floor(Math.random() * 3) + 0;
  var bigSize = [
    "url('https://gesab.com/wp-content/uploads/2019/02/cabecera-centro-control-web.jpg')", 
    "url('https://ubitec.mx/wp-content/uploads/2020/03/UbiTec-Flotillas.jpg')",
    "url('https://www.trackperu.com/wp-content/uploads/2021/01/Servidor-gps.jpg')",
    "url('https://mercadovial.tv/wp-content/uploads/2022/09/Electricos_3-scaled.jpg')",
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
		// Mostrando el div
		hiddenLoa.style.display = "flex";
	});

})
// Ventana de loader