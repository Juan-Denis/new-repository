fetch("productos.json")
  .then(response => response.json())
  .then(data => {
    mostrarProductos(data);
  })
  .catch(error => console.log("Error:", error));


function mostrarProductos(productos) {
  const contenedor = document.getElementById("productos");

  contenedor.innerHTML = ""; // limpia por si acaso

  productos.forEach(producto => {
    contenedor.innerHTML += `
      <div class="cajasshop">
        <div class="cajagorra">
          <img class="gorra" src="${producto.imagen}" alt="">
        </div>
        <p class="textt"><b>${producto.nombre}</b></p>
        <p class="textp">COP $${producto.precio}</p>
      </div>
    `;
  });
}