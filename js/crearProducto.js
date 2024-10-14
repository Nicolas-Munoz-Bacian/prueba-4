import { conexionAPI } from "./conexionAPI";

// Capturar el formulario usando el data-attribute
const formulario = document.querySelector("[data-formulario]");

async function crearCard(evento) {
    evento.preventDefault();

    // Capturar cada campo del formulario usando data-attributes
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
    const url = document.querySelector("[data-url]").value;

    // Valida que los campos no estén vacíos, en caso contrario no enviar la petición
    if (!name || !price || !image || !url) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        // Llamar a la función para enviar la información a la API
        await conexionAPI.enviarCard(name, price, url, image);

        // Redireccionar después de enviar el producto
        window.location.href = "path/to/envio-concluido.html";
    } catch (error) {
        console.error('Error al crear tarjeta:', error);
    }
}

// Añadir un oyente de eventos al formulario para manejar la presentación del formulario
formulario.addEventListener("submit", crearCard);
