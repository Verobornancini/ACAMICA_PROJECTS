//CLASE RESTAURANT
var Restaurant = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
};

//FUNCION REFACTORIZADA PARA RESERVAR HORARIO = UTILIZANDO FUNCIONES DE ORDEN SUPERIOR
Restaurant.prototype.reservarHorario = function(horarioReservado) {
    var nuevosHorariosDisponibles = this.horarios.filter((horario)=>{
        return horario !== horarioReservado;
    })
    this.horarios=nuevosHorariosDisponibles;
};

/*FUNCIÓN ORIGINAL PARA RESERVAR HORARIO
Restaurant.prototype.reservarHorario = function(horarioReservado) {
    for (var i = 0; i < this.horarios.length; i++) {
        if (this.horarios[i] === horarioReservado) {
            this.horarios.splice(i, 1); //recibe un inicio y la cantidad de elementos que debe eliminar
            return;}}};*/

//FUNCION REFACTORIZADA PARA OBTENER PUNTUACION = MODULARIZADA
Restaurant.prototype.obtenerPuntuacion = function() { 
    var promedio= this.divisionDeSumatoriaDePuntuaciones(this.sumatoriaDePuntuaciones(), this.calificaciones.length);
    return Math.round(promedio * 10) / 10;
};

Restaurant.prototype.sumatoriaDePuntuaciones = function() {
    var suma = 0;
    for(var i = 0; i < this.calificaciones.length; i++) {
    if (typeof this.calificaciones[i] === 'number') {
        suma += this.calificaciones[i];
    }}
    return suma;
};

Restaurant.prototype.divisionDeSumatoriaDePuntuaciones = function(a,b) { 
    if (b===0){ //le agrego una validacion a mi funcion
        return 0;
    } else {
        return a/b;}
};

//FUNCIÓN ORIGINAL PARA OBTENER PUNTUACION
/*Restaurant.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        var sumatoria = 0;
        for (var i = 0; i < this.calificaciones.length; i++) {
            sumatoria += this.calificaciones[i]
        }
        var promedio = sumatoria / this.calificaciones.length;
        return Math.round(promedio * 10) / 10;
    }
}*/

//FUNCIÓN PARA CALIFICAR
Restaurant.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10){
        this.calificaciones.push(nuevaCalificacion);
    }
};