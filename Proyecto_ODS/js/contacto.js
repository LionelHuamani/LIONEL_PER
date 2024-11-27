
/* menu amburguesa */
hamburguesa = document.querySelector('.hamburguesa');
hamburguesa.onclick = function(){
	navBar = document.querySelector('nav');
	navBar.classList.toggle("active");
}

/* validaciones del formulario  */
/* document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener todos los campos
    const nombre = document.querySelector("input[name='nombre']");
    const apellido = document.querySelector("input[name='apellido']");
    const email = document.querySelector("input[name='email']");
    const comentario = document.querySelector("textarea[name='comentario']");

    // Limpiar mensajes de error previos
    document.querySelectorAll(".error-message").forEach(msg => msg.remove());

    let isValid = true;

    // Validación del campo "Nombre" solo letras
    if (nombre.value.trim() === "") {
        showError(nombre, "El nombre es obligatorio.");
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(nombre.value.trim())) {
        showError(nombre, "El nombre solo debe contener letras.");
        isValid = false;
    }

    // Validación del campo "Apellido" solo letras
    if (apellido.value.trim() === "") {
        showError(apellido, "El apellido es obligatorio.");
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(apellido.value.trim())) {
        showError(apellido, "El apellido solo debe contener letras.");
        isValid = false;
    }

    // Validación del campo "Email"
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        showError(email, "El email es obligatorio.");
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        showError(email, "Ingresa un email válido.");
        isValid = false;
    }

    // Validación del campo "Comentario"
    if (comentario.value.trim() === "") {
        showError(comentario, "El comentario es obligatorio.");
        isValid = false;
    }

    // Si todos los campos son válidos, enviar el formulario o mostrar mensaje de éxito
    if (isValid) {
        alert("Formulario enviado con éxito.");
        document.querySelector("form").reset();
    }
});

// Función para mostrar el mensaje de error debajo del campo
function showError(element, message) {
    const errorMessage = document.createElement("p");
    errorMessage.className = "error-message";
    errorMessage.style.color = "#d9534f";// color rojo 
    errorMessage.style.fontSize = "0.875em";
    errorMessage.style.marginTop = "5px";
    errorMessage.textContent = message;

    element.style.borderColor = "#d9534f";
    element.insertAdjacentElement("afterend", errorMessage); // Coloca el mensaje justo debajo del campo

    // Eliminar el estilo de error al escribir en el campo
    element.addEventListener("input", function() {
        element.style.borderColor = "";
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}
 */