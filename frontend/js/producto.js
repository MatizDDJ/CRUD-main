// URL base del endpoint
const API_URL = "http://localhost/CRUD-main/backend/api_productos.php"; // Cambia esta URL según corresponda
// Obtener todos los productos (GET)
function listarProductos() {
  fetch(API_URL)
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      console.log("Productos:", data); // Muestra los productos en consola
      mostrarTablaProductos(data); // Llama a la función para mostrar la tabla en el HTML
    })
    .catch(err => console.error("Error al obtener productos:", err));
}

// Función para mostrar la tabla de productos en el div 'productosContainer'
function mostrarTablaProductos(productos) {
  const container = document.getElementById('productosContainer');
  if (!Array.isArray(productos) || productos.length === 0) {
    container.innerHTML = 'No hay productos para mostrar.';
    return;
  }
  let html = '<table border="1" cellpadding="5"><thead><tr>';
  html += "<th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Accion</th></tr></thead><tbody>";
  productos.forEach(p => {
    html += `<tr>
      <td>${p.id}</td>
      <td>${p.nombre}</td>
      <td>${p.descripcion}</td>
      <td>${p.precio}</td>
      <td>
        <button onclick="eliminarProducto(${p.id})">Eliminar</button>
      </tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

// Obtener un producto por ID (GET)
function mostrarProducto(id) {
  fetch(`${API_URL}/id/${id}`)
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => console.log("Producto:", data)) // Muestra el producto en consola
    .catch(err => console.error("Error al obtener producto:", err));
}

// Agregar un producto nuevo (POST)
function agregarProducto(nombre, descripcion, precio) {
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, descripcion, precio })
  })
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => listarProductos())
    .catch(err => console.error("Error al agregar producto:", err));
    listarProductos();
    {
      // Simulación de productos desde una fuente de datos
      const productos = JSON.parse(localStorage.getItem('productos')) || [];
  
      const tbody = document.querySelector('#tablaProductos');
      tbody.innerHTML = ''; // Limpia el contenido anterior
  
      productos.forEach((producto, index) => {
          const tr = document.createElement('tr');
  
          tr.innerHTML = `
              <td>${index + 1}</td>
              <td><span>${producto.nombre}</span></td>
              <td><span>${producto.descripcion}</span></td>
              <td><span>${producto.precio.toFixed(2)}</span></td>
              <td>
                  <button onclick="editarProducto(${index})">Modificar</button>
              </td>
          `;
  
          tbody.appendChild(tr);
      });
  }
  

}

// Modificar un producto (PUT)
function modificarProducto(id, nombre, descripcion, precio) {
  fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, nombre, descripcion, precio })
  })
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => console.log("Producto modificado:", data)) // Muestra el resultado en consola
    .catch(err => console.error("Error al modificar producto:", err));
}

// Eliminar un producto (DELETE)
function eliminarProducto(id) {
  fetch(`${API_URL}?id=${id}`, {
    method: "DELETE"
  })
    .then(res => res.json()) // Convierte la respuesta a JSON
    .then(data => {
      listarProductos();
       console.log("Producto eliminado:", data)}) // Muestra el resultado en consola
    .catch(err => console.error("Error al eliminar producto:", err));
}

// Ejemplos de uso
// listarProductos();
// mostrarProducto(1);
// agregarProducto("Producto X", "Descripción X", 99.99);
// modificarProducto(1, "Nuevo nombre", "Nueva descripción", 123.45);
// eliminarProducto(1);