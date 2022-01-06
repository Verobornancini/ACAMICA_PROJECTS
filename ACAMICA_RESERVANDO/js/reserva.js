//CLASE RESTAURANT
var Reserva = function(horario, personas, precioPorPersona, codigoDescuento) {
    this.horario = horario;
    this.personas = personas;
    this.precioPorPersona = precioPorPersona;
    this.codigoDescuento = codigoDescuento;
};

//FUNCION PARA CALCULAR EL PRECIO BASE DE UNA RESERVA
Reserva.prototype.precioBase = function() {
    if (this.personas>0 && this.precioPorPersona>0){
        var precio= this.personas*this.precioPorPersona;
        return precio;}
    else{
        return 0;
    }
};

//FUNCION PARA CALCULAR EL DESCUENTO POR UN CÓDIGO
Reserva.prototype.descuentoPorCodigo = function() {
    if (this.codigoDescuento==="DES15"){
        return this.precioBase*15/100;
    }
    else if (this.codigoDescuento==="DES200"){
        return 200;
    }
    else if (this.codigoDescuento==="DES1"){
        return this.precioPorPersona;
    }
    else {
        return 0;
    }
};

//FUNCION PARA CALCULAR EL DESUCENTO POR UN GRUPO GRANDE
Reserva.prototype.descuentoPorGruposGrandes = function() {
    if(this.personas >= 4 && this.personas <= 6) {
        return this.precioBase() *5/100;
    } 
    else if(this.personas == 7 || this.personas == 8) {
        return this.precioBase() *10/100;
    } 
    else if(this.personas >= 8) {
        return this.precioBase() *15/100;
    } 
    else {
        return 0;
    };
};

//FUNCION PARA CALCULAR EL ADISIONAL POR HORARIO
Reserva.prototype.adicionalPorHorario = function() {
    var hora = this.horario.getHours();
    if(hora == 13 || hora == 14 ||hora == 20 || hora== 21) {
        return this.precioBase() *5/100;} 
    else {
        return 0;};
};

//FUNCION PARA CALCULAR EL ADISIONAL POR FIN DE SEMANA
Reserva.prototype.adicionalPorDia = function() {
    var dia = this.horario.getDay();
    if(dia >= 5 && dia <= 7) { //5,6 y 7 son Viernes, Sábado y Domingo en el objero horario
        return this.precioBase() *10/100;} 
    else {
        return 0;};
};

//FUNCION PARA CALCULAR EL PRECIO TOTAL DE UNA RESERVA
Reserva.prototype.precioTotal= function(){
    return this.precioBase() - this.descuentoPorGruposGrandes() - this.descuentoPorCodigo() +  this.adicionalPorHorario() + this.adicionalPorDia();
};
