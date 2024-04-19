const $contenedor = document.querySelector(".contenedor"),
  $formulario = document.querySelector("form");
/* Contraseña */
const $pass = document.getElementById("password"), 
  $icon = document.querySelector(".bx");
/* Otros campos */
const $nombreInput = document.getElementById("nombre"),
  $apellidosInput = document.getElementById("apellidos"),
  $dniInput = document.getElementById("dni"),
  $correoInput = document.getElementById("email"),
  $telefonoInput = document.getElementById("telefono"),
  $busqueda = document.getElementById("busqueda"),
  $asuntoInput = document.getElementById("asunto"),
  $mensajeInput = document.getElementById("mensaje");
// Obtener todos los inputs y textareas dentro del formulario
const $inputs = $formulario.querySelectorAll('input, textarea');
// Obtener la ruta del archivo HTML actual
const path = window.location.pathname;
// Expresiones regulares
const regexNombre = /^[A-ZÁÉÍÓÚÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
const regexCorreo = /^[a-zA-Z0-9!*_-]+@[^\s@]+\.[a-zA-Z]{2,3}/;
const regexTelefono = /^\d{3} \d{3} \d{3}/;
const regexDNI = /^\d{8}[A-Z]$/;

// Objeto global
let datosIngreso = {
  nombre: "",
  apellidos: "",
  dni: "",
  email: "",
  telefono: ""
}
let datosContacto = {
  nombre: "", 
  email: "",
  asunto: "",
  mensaje: ""
}
let datosLogin = {
  email: "",
  password: ""
}


if (path === '/formulario-login.html') {
  $icon.addEventListener("click", e => {
      if ($pass.type === "password") {
          $pass.type = "text"; // convierto el <input> en texto
          $icon.classList.remove('bx-show-alt');
          $icon.classList.add('bx-hide');
      } else {
          $pass.type = "password"; // convierto el texto en contraseña
          $icon.classList.add('bx-show-alt');
          $icon.classList.remove('bx-hide');
      }
  });
}

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validarDatos(e)) {
    // Simulación de envío de datos al servidor (AJAX)
    // ...
    alert("Formulario validado con éxito!!!");
    // Recargar la página
    location.reload();
  }
});

$formulario.addEventListener("reset", (e) => {

  $inputs.forEach((input) => {
    // Verificar el tipo de cada elemento y restablecer su valor
    switch (input.type) {
      case 'text':
      case 'email':
      case 'textarea':
      case 'password':
        input.value = '';  // Restablecer a valor vacío
        break;
      case 'checkbox':
      case 'radio':
        input.checked = false;  // Desmarcar checkboxes y radios
        break;
    }

    // Restablecer estilos si los has modificado
    if(input.id != "password"){
      input.style.borderColor = "#ccc";
      input.style.outline = "none";
      input.nextElementSibling.style.color = "transparent";
    }
  });
});

const validarCampos = (target, validado) => {
  if(validado){
    target.style.borderColor = "green";
    target.style.outline = "medium solid green";
    target.nextElementSibling.classList.remove("bi-x");
    target.nextElementSibling.classList.add("bi-check");
    target.nextElementSibling.style.color = "green";
  } else {
    target.style.borderColor = "red";
    target.style.outline = "medium solid red";
    target.nextElementSibling.classList.remove("bi-check");
    target.nextElementSibling.classList.add("bi-x");
    target.nextElementSibling.style.color = "red";
    target.nextElementSibling.style.fontSize = "2.5rem";
    target.nextElementSibling.style.top = "-9px";
  }
}

document.addEventListener('blur', function(event) {
  let target = event.target; // Elemento que activó el evento
  let valor = target.value.trim(); // Obtener valor y quitar espacios en blanco
  let validado = false;

  if (valor !== "") {
    switch (target.id) {
      case 'nombre':
        if (regexNombre.test(valor)) {
          validado = true;
        } 
        break;
      case 'apellidos':
        if (regexNombre.test(valor)) {
          validado = true;
        }
        break;
      case 'dni':
        if (regexDNI.test(valor)) {
          validado = true;
        }
        break;
      case 'email':
        if (regexCorreo.test(valor)) {
          validado = true;
        }
        break;
      case 'telefono':
        if (regexTelefono.test(valor)) {
          validado = true;
        } 
        break;
      case 'asunto':
        validado = true;
        break;
      case 'mensaje':
        validado = true;
        break;
      case 'password':
        validado = true;
        datosLogin.password = valor;
        break;
    }
    if((target.id != 'password'))
      validarCampos(target,validado);
  } else if((target.type != 'submit') && (target.type != 'reset') && (target.id != 'password')){
    target.style.borderColor = "#ccc";
    target.style.outline = "none";
    target.nextElementSibling.style.color = "transparent";
  }
}, true); // El tercer parámetro indica que el evento se manejará en la fase de captura

const validarDatos = function(e) {
  let valor = "";
  let validado = false;

  for(const input of $inputs){
    // Verificar el tipo de cada elemento y verificar su valor
    switch (input.type) {
      case 'text':
        if(input.id === "nombre"){
          valor = input.value;
          if(!regexNombre.test(valor)) {
            alert('Nombre no válido');
            $nombreInput.focus();
            validado = false;
          } else {
            datosContacto.nombre = valor;
            datosIngreso.nombre = valor;
            validado = true;
          }
        } else if(input.id === "asunto"){
          valor = input.value;
          if(valor === ""){
            alert('Asunto vacío');
            $asuntoInput.focus();
            validado = false;
          } else {
            datosContacto.asunto = valor;
            validado = true;
          }
        } else if(input.id === "apellidos"){
          valor = input.value;
          if(!regexNombre.test(valor)) {
            alert('Apellidos no válidos');
            $apellidosInput.focus();
            validado = false;
          } else {
            datosContacto.nombre = valor;
            datosIngreso.apellidos = valor;
            validado = true;
          }
        }
      case 'email':
        if(input.id === "email"){
          valor = input.value;
          if(!regexCorreo.test(valor)) {
            alert('Correo electrónico no válido');
            $correoInput.focus();
            validado = false;
          } else {
            datosContacto.email = valor;
            datosIngreso.email = valor;
            validado = true;
          }
        }
      case 'textarea':
        if(input.id === "textarea") {
          valor = input.value;
          if(valor === ""){
            alert("Mensaje vacío");
            $mensajeInput.focus();
            validado = false;
          } else {
            datosContacto.mensaje = valor;
            validado = true;
          }
        }
      case 'tel':
        if(input.id === "telefono"){
          valor = input.value;
          if(!regexTelefono.test(valor)) {
            alert('Teléfono no válido');
            $telefonoInput.focus();
            validado = false;
          } else {
            datosIngreso.telefono = valor;
            validado = true;
          }
        }
      case 'password':
        if(input.id === "password"){
          valor = input.value;
          if(valor != 'admin'){
            alert('La contraseña no es correcta');
            $pass.focus();
            validado = false;
          } else {
            datosLogin.password = valor;
            validado = true;
          }
        }
      case 'checkbox':
      case 'radio':
        input.checked = false;  // Desmarcar checkboxes y radios
        break;
    }
    
    if(!validado){
      break;
    }
  } // fin for..of
  return validado;
}