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
let productos;

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
    if (producto.cantidad > 1) {
      return producto.cantidad * producto.precio;
    } else {
      return precioAnterior + producto.precio;
    }
  }, 0);

  return resultado;
}

totalCart();
cargarJson();
console.log(productos);
function cargarJson() {
  fetch(
    "https://raw.githubusercontent.com/nicomacha/productosFetch/main/producto.json"
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      data.forEach((producto) => {
        $containerRemeras.innerHTML += templateRemera(producto);
      });
    })
    .catch((error) => {
      console.log("Error al cargar los productos !");
      Toastify({
        text: "Error al cargar los productos !",
        duration: 5000,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #e05d44, #e05d44)",
        },
      }).showToast();
    });
}

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

/*
1. validar si el producto que viene por parametro existe en el array cart, cambiar la propiedad cantidad si es uno, pasar 2 (++)

*/

function addToCart(remera) {
  $cartList.innerHTML = "";
  const elProductoExisteEnElCarrito = cart.some((producto) => {
    return producto.id === remera.id;
  });
  console.log(
    "el producto existe en el carrito?" + " " + elProductoExisteEnElCarrito
  );
  if (elProductoExisteEnElCarrito) {
    const productoEncontrado = cart.find((producto) => {
      return producto.id === remera.id;
    });

    productoEncontrado.cantidad++;
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
        background: "linear-gradient(to right, #008000, #008000)",
      },
    }).showToast();
    console.log(cart);
  } else {
    remera.cantidad = 1;
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
        background: "linear-gradient(to right, #008000, #008000)",
      },
    }).showToast();
  }
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
            <p>Cantidad:${producto.cantidad}</p>
            <p>${producto.cuotas} cuotas de ${Number(
    producto.precio / producto.cuotas
  ).toFixed(2)}</p>
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

const carritoLs = JSON.parse(localStorage.getItem("enCarrito"));

console.log(carritoLs);
