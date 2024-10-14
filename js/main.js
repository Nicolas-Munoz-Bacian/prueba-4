// Importar función desde el archivo de API
import { enviarProducto } from './api.js';

// Variables Global
const productsContainer = document.getElementById('products-container');
let products = [];

// Iniciar aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', init);

// Función para inicializar el listado
async function init() {
    await fetchProducts();
    renderProducts();
}

// Función para obtener productos desde la API
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        products = await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Función para renderizar productos en el DOM
function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="card" data-id="${product.id}">
                <img class="image" src="${product.url}" alt="${product.name}"/>
                <div class="card-container--info">
                    <p class="name">${product.name}</p>
                    <div class="card-container--value">
                        <p class="price">$${product.price}</p>
                        <button class="btn__eliminar__producto" type="button">
                            <img src="./assets/bote-de-basura.png" alt="Eliminar producto">
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });

    // Despues de renderizar, añadir eventos para eliminar
    document.querySelectorAll('.btn__eliminar__producto').forEach(button => {
        button.addEventListener('click', handleDelete);
    });
}

// Función para manejar eliminación de productos
async function handleDelete(event) {
    const productCard = event.target.closest('.card');
    const productId = productCard.getAttribute('data-id');
    
    try {
        await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' });
        products = products.filter(product => product.id !== parseInt(productId));
        renderProducts();
    } catch (error) {
        console.error('Error eliminating product:', error);
    }
}

// Función para agregar un producto nuevo
async function addProduct(event) {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value.trim();
    const price = document.querySelector("[data-price]").value.trim();
    const url = document.querySelector("[data-url]").value.trim();

    if (!name || !price || !url) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const newProduct = { name, price, url };

    try {
        const savedProduct = await enviarProducto(newProduct);
        products.push(savedProduct);
        renderProducts();
        clearForm();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Función para limpiar el formulario
function clearForm() {
    document.querySelector("[data-name]").value = '';
    document.querySelector("[data-price]").value = '';
    document.querySelector("[data-url]").value = '';
}

// Evento para manejar el envío del formulario
document.querySelector('[data-formulario]').addEventListener('submit', addProduct);
