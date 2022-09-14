let productos = [{ id: 1, nombre: 'Delineador', marca: 'Maybelline', precio: 3000, imagen: "./imagenes/delinea.jpg", stock: 1 },
{ id: 2, nombre: 'Base de maquillaje', marca: 'Loreal', precio: 6000, imagen: "./imagenes/base.jpg", stock: 1 },
{ id: 3, nombre: 'Paleta de sombras', marca: 'NYX', precio: 10500, imagen: "./imagenes/paleta.jpg", stock: 1 },
{ id: 4, nombre: 'Serum Acido Hialuronico', marca: 'Loreal', precio: 12000, imagen: "./imagenes/serum.jpg", stock: 1 },
{ id: 5, nombre: 'Crema Hidratante', marca: 'Neutrogena', precio: 15000, imagen: "./imagenes/neutrogena.jpg", stock: 1 },
{ id: 6, nombre: 'Set rubores', marca: 'MAC', precio: 8000, imagen: "./imagenes/rubor.jpg", stock: 1 },
{ id: 7, nombre: 'Máscara de pestañas', marca: 'Maybelline', precio: 9000, imagen: "./imagenes/mascara.jpg", stock: 1 },
{ id: 8, nombre: 'Set labiales', marca: 'Beauty Creations', precio: 13000, imagen: "./imagenes/labiales.jpg", stock: 1 }]


let carrito = []

const mostrarProductos = () => {
    const contenedorProductos = document.getElementById("contenedor-productos")
    productos.forEach((producto, indice) => {
        let card = document.createElement("div")
        card.classList.add("card", "col-sm-12", "col-lg-3")
        card.innerHTML = ` <img src = ${producto.imagen} alt=''>
        <div class="card-body">
        <h5 class = "card-title"> ${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <p class="card-text">${producto.marca}</p>
        <button id="agregar ${producto.id}" class= "btn btn-info boton-agregar"> Agregar</button>
        </div>`
        contenedorProductos.appendChild(card)
        const boton = document.getElementById(`agregar ${producto.id}`)
        boton.addEventListener('click', () => {
            //envio id por parametro
            agregarCarrito(producto.id)
        })
    })
}
mostrarProductos()

const agregarCarrito = (productoId) => {
    //verifico si producto id ya esta agregado y si esta aumento cantidad stock
    const existe = carrito.some(producto => producto.id === productoId)
    if (existe) {
        const producto = carrito.map(producto => {
            if (producto.id === productoId) {
                producto.stock++
            }
        })
    } else {
        const item = productos.find((producto) => producto.id === productoId)
        carrito.push(item)
    }
    actualizarCarrito()
}

//limpiar contenido
const botonLimpiar = document.getElementById('limpiar-carrito')
botonLimpiar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


const contenedorCarrito = document.getElementById('lista-carrito')
const actualizarCarrito = () => {
    //reseteo carrito
    contenedorCarrito.innerHTML = ""
    carrito.forEach((producto) => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <img src=${producto.imagen} width="150" height=150";>
        <td> ${producto.nombre}</td>
        <td> ${producto.marca}</td>
        <td> Precio unitario: $${producto.precio}</td>
        <td>Cantidad:${producto.stock}</td>
        <td> Subtotal: $${producto.precio * producto.stock}</td>`
        contenedorCarrito.appendChild(row)
    })

    //calculo total 
    const precioTotal = document.getElementById('precioTotal')
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.stock * producto.precio, 0)
}