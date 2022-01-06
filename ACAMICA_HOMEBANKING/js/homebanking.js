//Declaración de variables
var nombreUsuario= 'Verónica Bornancini';
var saldoCuenta= 85000;
var limiteExtraccion= 2000;
var agua = 350;
var telefono = 425;
var luz = 210;
var internet = 570;
var cuentaAmiga1=1234567;
var cuentaAmiga2=7654321;
var codigoSeguridad=7410

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    limiteExtraccion = prompt ('Ingrese el nuevo límite de extracción');
    if (esUnValorAceptado (limiteExtraccion)){
        limiteExtraccion = parseInt (limiteExtraccion);
        alert("Tu nuevo límite de extracción es: $ "+ limiteExtraccion);
        actualizarLimiteEnPantalla();
    }
}

function extraerDinero() {
    var montoExtraccion = prompt ('Ingrese el monto que desea extraer');
    if (esUnValorAceptado (montoExtraccion)){
        montoExtraccion = parseInt (montoExtraccion);
        if (haySaldoDisponible(montoExtraccion) && !superaLimiteExtraccion(montoExtraccion) && esMultiploDeCien(montoExtraccion)){
            var saldoAnterior = saldoCuenta;
            saldoCuenta -= montoExtraccion;
            alert("Has retirado: $ "+ montoExtraccion + "\n Saldo Anterior: $ "+ saldoAnterior + "\n Saldo Actual: $ "+ saldoCuenta);
        }
        else if (!haySaldoDisponible(montoExtraccion)) {
        alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero");
        }
        else if (superaLimiteExtraccion(montoExtraccion)){
        alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción");
        }
        else if (!esMultiploDeCien(montoExtraccion)){
        alert("Solo puedes extraer billetes de 100");
        }
    }
    actualizarSaldoEnPantalla();
}

function depositarDinero() {
    var montoIngreso = prompt ('Ingrese el monto que desea depositar');
    if (esUnValorAceptado (montoIngreso)){
        montoIngreso = parseInt (montoIngreso);
        var saldoAnterior = saldoCuenta;
        saldoCuenta += montoIngreso;
        alert("Has depositado: $ "+ montoIngreso + "\n Saldo Anterior: $ "+ saldoAnterior + "\n Saldo Actual: $ "+ saldoCuenta);
        actualizarSaldoEnPantalla();
    }
}

function pagarServicio() {
    var servicio = prompt ('Ingresa el numero que corresponda con el servicio que quieres pagar \n 1-Agua \n 2-Luz \n 3-Internet \n 4-Teléfono');
    var montoServicio;
    if (esUnValorAceptado (servicio)){
        servicio = parseInt (servicio);
        switch (servicio) {
            case 1:
            montoServicio=agua;
            break;
            case 2:
            montoServicio=luz;
            break;
            case 3:
            montoServicio=internet;
            break;
            case 4:
            montoServicio=telefono;
            break;
            default:
            alert ('No existe el servicio que se ha seleccionado');
            montoServicio=0;
            break;
    }
    if (haySaldoDisponible(montoServicio)){
        saldoCuenta -= montoServicio;}
    else {
        alert ('No hay suficiente saldo en tu cuenta para pagar este servicio');
    }
    actualizarSaldoEnPantalla();
    }
}

function transferirDinero() {
    var transferencia = prompt ('Ingrese el monto que desea transferir');
    if (esUnValorAceptado (transferencia)){
        transferencia = parseInt (transferencia);
        if (haySaldoDisponible(transferencia)){
            var cuentaIngresada = parseInt(prompt ('Ingrese el número de cuenta a la que desea transferir'));
            if (cuentaIngresada==cuentaAmiga1||cuentaIngresada==cuentaAmiga2){
                saldoCuenta -= transferencia;
                alert ("Se han transferido: $ "+ transferencia + "\n cuenta Destino: $ "+ cuentaIngresada);}
            else {
                alert ('Solo puede realizar transferencias a Cuentas Amigas');}
        }
        else {
            alert ('No hay suficiente saldo en tu cuenta para realizar esta transferencia');
            }
    }
    actualizarSaldoEnPantalla();
}
function iniciarSesion() {
    var codigoIngresado = parseInt(prompt ('Ingrese su código de seguridad'));
    if (codigoIngresado==codigoSeguridad){
        alert ('Bienvenido/a '+ nombreUsuario +' ya puedes comenzar a realizar operaciones');
    }
    else {
        alert ('Código incorrecto: Tu dinero ha sido retenido por cuestiones de seguridad');
        saldoCuenta=0;
        nombreUsuario= 'Usuario Retenido';
        limiteExtraccion=0;
        actualizarSaldoEnPantalla();}
    }

//Buenas prácticas
function haySaldoDisponible(montoExtraccion){
    return montoExtraccion <= saldoCuenta;
}
function superaLimiteExtraccion(montoExtraccion){
    return montoExtraccion > limiteExtraccion;
}
function esMultiploDeCien(montoExtraccion){
    return montoExtraccion % 100 == 0;
}

function esUnValorAceptado (valor){
    if (valor==null){
        return false;
    }    
    else if (!isNaN(valor)) {
        return valor;
        }
    else {
        alert ("No es un valor aceptado");
    }
}
//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}