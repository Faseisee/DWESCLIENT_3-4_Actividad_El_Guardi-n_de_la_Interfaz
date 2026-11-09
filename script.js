
// VARIABLES

const formulario = document.getElementById("formulario-preferencias");

const nombre = document.getElementById("nombre");

const colorFondo = document.getElementById("colorFondo");

const temaSeleccionado = document.getElementById("tema");

const container = document.getElementById("contenedor-bienvenida");

const botonRestablecer = document.getElementById("restablecer");




// FUNCIONES 
function mostrarBienvenida(nombre) {

    container.textContent = "";

    // AQUI CREAMOS EL LA ETIQUETA DEL TITULO CON createElement
    let titulo = document.createElement("h2");

    // AQUI CREAMOS EL TEXTO QUE LLEVARA EL TITULO
    let textoTitulo = document.createTextNode(`Hola de nuevo ${nombre}`);

    // AQUI INTRODUCIMOS EL TEXTO EN LA ETIQUETA
    titulo.appendChild(textoTitulo);

    // AQUI YA INTRODUCIMOS LA ETIQUETA YA CON SU TEXTO Y TODO BIEN CREADO EN SU CONTENEDOR
    container.appendChild(titulo);

    // AHORA VAMOS A CREAR EL PARRAFO DE LA MISMA MANERA QUE EL TITULO ANTERIOR
    let parrafo = document.createElement("p");

    let textoParrafo = document.createTextNode("Pagina con las preferencias guardadas");

    parrafo.appendChild(textoParrafo);

    container.appendChild(parrafo);
}


// FUNCION PARA GUARDAR LAS PREFERENCIAS DEL USUARIO EN COOKIES
function guardarPreferencias() {

    // CREAMOS UNA FECHA ACTUAL
    let fecha = new Date();

    // CALCULAMOS LA FECHA DE EXPIRACION SUMANDO 7 DIAS
    fecha.setTime(fecha.getTime() + (7 * 24 * 60 * 60 * 1000));

    // CONVERTIMOS LA FECHA AL FORMATO QUE NECESITAN LAS COOKIES
    let expiracion = "expires=" + fecha.toUTCString();

    // GUARDAMOS EL NOMBRE DURANTE 7 DIAS
    document.cookie = "nombre=" + encodeURIComponent(nombre.value) + ";" + expiracion + ";path=/";

    // GUARDAMOS EL COLOR DE FONDO DURANTE 7 DIAS
    document.cookie = "colorFondo=" + encodeURIComponent(colorFondo.value) + ";" + expiracion + ";path=/";

    // GUARDAMOS EL TEMA COMO COOKIE DE SESION, SIN FECHA DE EXPIRACION
    document.cookie = "tema=" + encodeURIComponent(temaSeleccionado.value) + ";path=/";

}


// FUNCION PARA LEER UNA COOKIE CONCRETA
function getCookie(nombre) {

    const pares = document.cookie.split("; ");

    for (let par of pares) {

        const [clave, valor] = par.split("=");

        if (clave === nombre) {
            return decodeURIComponent(valor);
        }
    }

    return null; // No encontrada
}


// FUNCION PARA APLICAR EL COLOR DE FONDO
function aplicarColor() {

    document.body.style.backgroundColor = colorFondo.value;

}


// FUNCION PARA APLICAR EL TEMA SELECCIONADO
function aplicarTema() {

    // ELIMINAMOS LAS CLASES ANTERIORES
    document.body.classList.remove("tema-claro", "tema-oscuro");

    // AÑADIMOS LA CLASE DEL TEMA SELECCIONADO
    document.body.classList.add(`tema-${temaSeleccionado.value}`);

}


// FUNCION PARA RECUPERAR LAS PREFERENCIAS GUARDADAS
function cargarPreferencias() {

    // RECUPERAMOS EL NOMBRE GUARDADO EN LA COOKIE
    let nombreGuardado = getCookie("nombre");

    // COMPROBAMOS SI EXISTE UN USUARIO REGISTRADO
    if (nombreGuardado !== null) {

        // RECUPERAMOS EL COLOR Y EL TEMA
        let colorGuardado = getCookie("colorFondo");
        let temaGuardado = getCookie("tema");

        // RELLENAMOS LOS CAMPOS DEL FORMULARIO
        nombre.value = nombreGuardado;

        if (colorGuardado !== null) {
            colorFondo.value = colorGuardado;
        }

        // SI NO EXISTE LA COOKIE DEL TEMA, UTILIZAMOS EL TEMA CLARO
        if (temaGuardado === null) {
            temaGuardado = "claro";
        }

        // SELECCIONAMOS EL TEMA GUARDADO
        temaSeleccionado.value = temaGuardado;

        // APLICAMOS EL COLOR Y EL TEMA RECUPERADOS
        aplicarColor();
        aplicarTema();

        // MOSTRAMOS EL MENSAJE DE BIENVENIDA
        mostrarBienvenida(nombreGuardado);

    }

}


// FUNCION QUE ELIMINA EL MENSAJE DEL CONTAINER BIENVENIDA
function eliminarBienvenida() {

    //HACE QUE BORREMOS EL CONTENIDO DEL CONTANIER, UTILIZAMOS EL WHILE YA QUE HEMOS CREADO DOS ETIQUETAS, UN H2 Y UN PARRAFO
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

}
// FUNCION PARA RESTABLECER LA INTERFAZ
function restablecerInterfaz() {

    // ELIMINAMOS LAS COOKIES ESTABLECIENDO UNA FECHA DE EXPIRACION PASADA
    document.cookie = "nombre=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "colorFondo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "tema=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    // RESTABLECEMOS EL COLOR DE FONDO ORIGINAL
    document.body.style.backgroundColor = "";

    // ELIMINAMOS LAS CLASES DE LOS TEMAS
    document.body.classList.remove("tema-claro", "tema-oscuro");

    // VACIAMOS LOS CAMPOS DEL FORMULARIO
    formulario.reset();

    // ELIMINAMOS EL MENSAJE DE BIENVENIDA
    eliminarBienvenida();

}

//AÑADIMOS FUNCIONALIDAD AL FORMULARIO CON EL EVENTO SUBMIT 
formulario.addEventListener("submit", (event) => {

    // EVITAMOS QUE EL FORMULARIO RECARGUE LA PAGINA
    event.preventDefault();

    // GUARDAMOS LAS PREFERENCIAS EN LAS COOKIES
    guardarPreferencias();

});


// AÑADIMOS FUNCIONALIDAD AL COLOR DE FONDO QUE VAYA ELIGIENDO EL USUARIO CON EL EVENTO INPUT
colorFondo.addEventListener("input", aplicarColor);


//COMO HEMOS HECHO CON EL COLOR DE FONDO Y EL FORMULARIO LE DAMOS FUNCIONALIDAD AL TEMA QUE ELIJA EL USUARIO CON EL EVENTO CHANGE
temaSeleccionado.addEventListener("change", aplicarTema);

// AÑADIMOS FUNCIONALIDAD AL BOTON DE RESTABLECER
botonRestablecer.addEventListener("click", restablecerInterfaz);


// Aquí comprobaremos si existen cookies
// y recuperaremos las preferencias del usuario.

// EJECUTAMOS LA FUNCION AL CARGAR LA PAGINA
cargarPreferencias();
