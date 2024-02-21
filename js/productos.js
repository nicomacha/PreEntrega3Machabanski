// Elementos del DOM, osea el HTML.
const $buttonAddToCart = document.getElementById("add-to-cart");
const $containerRemeras = document.getElementById("container_remeras");
const $cartContainer = document.getElementById("cart");
const $cartCount = document.querySelector("#cart-count");
const $cartList = document.getElementById("cart-list");
const $sumaTotal = document.getElementById("suma-total");

// Variables con datos;
let cart = [];
const storageGuardado = JSON.parse(localStorage.getItem("enCarrito"));

const productos = [
  {
    id: 1,
    nombre: "Remera White",
    imagen: "/img/remera_blanca.jpg",
    color: "Blanco",
    precio: 4500,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 2,
    nombre: "Remera Green",
    imagen: "/img/remera_verde.jpg",
    color: "Verde",
    precio: 6000,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 3,
    nombre: "Remera Black",
    imagen: "/img/remera_negra.jpg",
    color: "Negro",
    precio: 8000,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 4,
    nombre: "Jean Sky Blue",
    imagen: "/img/jean_celeste.jpg",
    color: "Azul",
    precio: 17000,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 5,
    nombre: "Jean Navy Blue",
    imagen: "/img/jean_marino.jpg",
    color: "Negro",
    precio: 15000,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 6,
    nombre: "Jean Worn Out",
    imagen: "/img/jean_desgastad.jpg",
    color: "Celeste",
    precio: 4500,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 7,
    nombre: "Buzo Grey",
    imagen: "/img/buzo_gris.jpg",
    color: "Gris",
    precio: 16000,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 8,
    nombre: "Buzo Yellow",
    imagen: "/img/buzo_amarillo.jpg",
    color: "Amarillo",
    precio: 14000,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
  {
    id: 9,
    nombre: "Buzo White",
    imagen: "/img/buzo_blanco.jpg",
    color: "Blanco",
    precio: 19000,
    cuotas: 3,
    talles: [
      { talle: "S" },
      { talle: "M" },
      { talle: "L" },
      { talle: "XL" },
      { talle: "XXL" },
    ],
  },
];

if (storageGuardado) {
  cart = storageGuardado;
  $cartCount.textContent = cart.length;
  cart.forEach((product) => {
    $cartList.innerHTML += templateProductCart(product);
  });
}
console.log(cart);
// Funciones
function totalCart() {
  const resultado = cart.reduce((precioAnterior, producto) => {
    return precioAnterior + producto.precio;
  }, 0);

  console.log("sumando" + resultado);

  return resultado;
}

totalCart();

function templateRemera(remera) {
  return `<div class="col card_remera">
  <div class="card h-100 card-complete">
    <img
      src=${remera.imagen}
      class="card-img-top img_prod"
      alt="Remera White"
    />
    <div class="card-body">
      <h5 class="card-title"><strong>${remera.nombre}</strong></h5>
      <p class="card-text">
        $${remera.precio}<br />${
    remera.cuotas
  } CUOTAS SIN INTERES DE <br /><strong
          >$${Number(remera.precio / remera.cuotas).toFixed(2)}</strong
        >
      </p>
    </div>
    <div class="card-footer">
      <small class="text-body-secondary boton_prod">
        <button
          type="button"
          class="btn btn-outline-dark"
          id="add-to-cart"
          onclick='addToCart(${JSON.stringify(remera)})'
        >
          Agregar al carrito 
        </button></small
      >
    </div>
  </div>
</div>`;
}

function addToCart(remera) {
  $cartList.innerHTML = "";
  cart.push(remera);
  $cartCount.textContent = cart.length;
  totalCart();
  cart.forEach((product) => {
    $cartList.innerHTML += templateProductCart(product);
  });
  window.localStorage.setItem("enCarrito", JSON.stringify(cart));
  $sumaTotal.innerHTML = `<div>Total:${Number(totalCart()).toFixed(2)}</div>`;
  Toastify({
    text: "Producto agregado al carrito",
    duration: 1000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #000, #000)",
    },
  }).showToast();
}

function templateProductCart(producto) {
  return `
  <div class="border d-flex">
          <img src=${
            producto.imagen
          } alt="" style="width: 40%; object-fit:cover;" />
          <div class="p-3">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio}</p>
            <p>${producto.cuotas} cuotas de ${
    producto.precio / producto.cuotas
  }</p>
            <button type="button" class="btn btn-danger" onclick="deleteProductoToCart(${JSON.stringify(
              producto.id
            )})">Eliminar</button>
          </div>
  </div>
  `;
}

function deleteProductoToCart(id) {
  $cartList.innerHTML = "";
  const carritoModificado = cart.filter((producto) => {
    if (producto.id !== id) {
      return producto;
    }
  });
  cart = carritoModificado;
  cart.forEach((producto) => {
    $cartList.innerHTML += templateProductCart(producto);
  });
  totalCart();
  $cartCount.textContent = cart.length;
  Toastify({
    text: "Producto eliminado del carrito",
    duration: 1000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #e05d44, #e05d44)",
    },
  }).showToast();
  window.localStorage.setItem("enCarrito", JSON.stringify(cart));
  $sumaTotal.innerHTML = `<div>Total:${Number(totalCart()).toFixed(2)}</div>`;
}

productos.forEach((producto) => {
  $containerRemeras.innerHTML += templateRemera(producto);
});

const carritoLs = JSON.parse(localStorage.getItem("enCarrito"));

console.log(carritoLs);
