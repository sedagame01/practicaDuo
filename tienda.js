const formulario=document.querySelector("#formProducto");
const listaProductos =document.querySelector("#listaProductos");
const fragment=document.createDocumentFragment();

//preguntar no funciona sin 

const productos =[{
    nombre:"manzana",
    unidades:15
},{nombre:"ropa",
    unidades:2,
},]


localStorage.setItem("listaProductos", JSON.stringify(productos));

const listaDesdeLocal=localStorage.getItem("listaProductos")



/* añadir nuevos nuevos productos*/
formulario.addEventListener('submit',(ev)=>{
    const producto= formulario.elements["nombreProducto"].value;
    incomporarProducto(producto)
    event.preventDefault();
})

const  incomporarProducto=(testeo)=>{
    const ejemplo= productos.find((valor)=>valor.nombre===testeo)
if (ejemplo){
    return console.log("este elemento ya existe")
}else{
     productos.push({nombre:testeo,unidades:1})
     añadirProductoTabla(testeo)
}
return console.log(productos)
}


/* aññadir los produtos a una tabla */
const añadirProductoTabla=(productoNuevo)=>{
    const caja=document.createElement('TR')
    caja.id=productoNuevo;
    const producto=document.createElement('TH')
    const cantidad = document.createElement('TH')
    const añadir=document.createElement('BUTTON')
    const restar=document.createElement('BUTTON')

    producto.textContent=`${productoNuevo}`
    
    añadir.textContent="SUMAR +"
    restar.textContent="RESTAR -"
    restar.id=restar.textContent
    cantidad.textContent="1"

    
    caja.append(producto,restar,añadir,cantidad)

    fragment.append(caja)


    //const fila=docu

    const formularioPrueba = document.querySelector("#listaProductos #tabla-productos #producto");
    formularioPrueba.append(fragment)
    //console.log(formularioPrueba)
}

//añadirProductoTabla("colacao")


document.addEventListener("click",(evento)=>{
if (evento.target.matches(`#mango button`)){
    [{nombre,unidades}]=productos
    
    console.log(productos)

}    
const sumarCantidad=(productoNombre)=>{
    productos.forEach(element => {
        //si el atributo nombre del objeto es igual al que se recibe por parametro
        if(element.nombre==productoNombre){
            element.unidades++;
            const capturaCantidad=document.querySelector(`#${element.nombre}:nth-child(5)`);
            console.log(element.nombre)
            console.log(capturaCantidad);
            
        }
    });
}
 

})

/**PRUEBA */
sumarCantidad("manzana")
console.log(productos);
/**FIN PRUEBA */


/* restarStock.addEventListener("click", function (event) {
    
    console.log(event)
});
 
  */

console.log(productos)
