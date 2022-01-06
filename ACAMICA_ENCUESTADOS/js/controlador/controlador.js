/* Controlador */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(indice) {
    this.modelo.borrarPregunta(indice);
  },
  editarPregunta: function(indice, pregunta) {
    this.modelo.editarPregunta(indice, pregunta);
  },
  borrarTodo: function() {
    this.modelo.borrarTodo();
  },
  agregarUnVoto: function(nombrePregunta,respuestaSeleccionada){
    this.modelo.agregarUnVoto(nombrePregunta,respuestaSeleccionada)
  },
  guardar: function() {
    this.modelo.guardar();
  },
  
};
