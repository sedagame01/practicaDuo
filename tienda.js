const formulario=document.querySelector("#formProducto");
const listaProductos =document.querySelector("#listaProductos");
const cuerpoTabla=document.querySelector('#cuerpoTabla')
const fragment=document.createDocumentFragment();

//preguntar no funciona sin 
//productos en local o array vacio para meter el primer producto 
let productos = JSON.parse(localStorage.getItem("listaProductos")) || []

//actualizar producto pasando el nombre y cantidad
const actualizarProductos=(nombreProducto,nuevaCantidad)=>{
    const cajaProducto = document.getElementById(nombreProducto)
    if (cajaProducto){
        const buscarClase=cajaProducto.querySelector('.cantidad')
        buscarClase.textContent=nuevaCantidad     
    }
    localStorage.setItem("listaProductos", JSON.stringify(productos));
}




const restarProducto =(nombreProducto)=>{
    //buscamos el producto
    const busqueda = productos.find(element=>element.nombre===nombreProducto)
    if (busqueda&&(busqueda.unidades>1)){
        busqueda.unidades--;
        actualizarProductos(nombreProducto,busqueda.unidades)
    }else if(busqueda&&(busqueda.unidades===1)){
        document.getElementById(nombreProducto).remove()
        productos = productos.filter(p => p.nombre !== nombreProducto);
        localStorage.setItem("listaProductos", JSON.stringify(productos));
    }
}

const sumaProducto=(nombreProducto)=>{
    const busqueda = productos.find(element=>element.nombre===nombreProducto)
    if (busqueda){
        busqueda.unidades++
        actualizarProductos(nombreProducto,busqueda.unidades)
    }
}

/* aññadir los produtos a una tabla  le pasamos un obj*/
const añadirProductoTabla=(productoNuevo)=>{
    //crear
    const caja=document.createElement('TR')
    caja.id=productoNuevo.nombre;
    const producto= document.createElement('TD')
    const cantidad= document.createElement('TD')
    const acciones= document.createElement('TD')
    const añadir=document.createElement('BUTTON')
    const restar=document.createElement('BUTTON')
    //asigancion
    producto.textContent=productoNuevo.nombre
    cantidad.textContent=productoNuevo.unidades
    cantidad.classList.add('cantidad')

    añadir.addEventListener('click',()=>sumaProducto(productoNuevo.nombre))
    restar.addEventListener('click',()=>restarProducto(productoNuevo.nombre))
    añadir.textContent="SUMAR +"
    restar.textContent="RESTAR -"
    //armado
    acciones.append(añadir,restar)
    caja.append(producto,cantidad,acciones)
    fragment.append(caja)
    cuerpoTabla.append(fragment)

}

//pasamos al hacer clic en el boton el nombre del producto
const  incomporarProducto=(testeo)=>{
    //buscamos si existe ya 
    const ejemplo= productos.find((valor)=>valor.nombre===testeo)
if (ejemplo){
    console.log(`el producto ${testeo} ya existe en la base de datos`)
}else{
     const nuevoProducto={nombre:testeo,unidades:1};
     productos.push(nuevoProducto)
     añadirProductoTabla(nuevoProducto)
     localStorage.setItem("listaProductos", JSON.stringify(productos))
}
formulario.reset()
console.log(productos)
}
   
const cargarElementos = () => {
    productos.forEach(producto => {
        añadirProductoTabla(producto);
    });
};




/* --------------EVENTOS---------------------- */
/* añadir nuevos nuevos productos al hacer clic en boton*/
formulario.addEventListener('submit',(ev)=>{
    const producto= formulario.elements["nombreProducto"].value;
    incomporarProducto(producto)
    ev.preventDefault();
})
cargarElementos()

console.log(productos)
