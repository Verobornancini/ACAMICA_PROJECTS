/* Modelo */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;
  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.listaModificada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    if(this.preguntas.length === 0) {
      return 0;
    }
    else {
      var ultimaPregunta = this.preguntas[this.preguntas.length - 1];
      return ultimaPregunta.id;
    }
  },

  //se agrega una pregunta 
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //Se borra una pregunta según su indice, del array de preguntas
  borrarPregunta: function(indice) {
    this.preguntas.splice(indice, 1); // splice elimina 1 elemento del arreglo de preguntas
    this.guardar();
    this.preguntaBorrada.notificar();
  },

  // se edita una pregunta existente
  editarPregunta: function(indice, nuevaPregunta) {
    this.preguntas[indice].textoPregunta = nuevaPregunta;
    this.guardar();
    this.preguntaEditada.notificar();
  },

  // se borran todas las preguntas
  borrarTodo: function() {
    this.preguntas = [];
    this.guardar();
    this.todoBorrado.notificar();
  },

  // se agrega un voto a una respuesta seleccionada
  agregarUnVoto: function(nombrePregunta,respuestaSeleccionada){
    this.preguntas.filter(
      pregunta => { 
        pregunta.textoPregunta === nombrePregunta 
        pregunta.cantidadPorRespuesta.forEach(
          respuesta => {
          if(respuestaSeleccionada === respuesta.textoRespuesta){
            respuesta.cantidad++;
            this.guardar();
          }
        })
      }
    ); 
    this.votoAgregado.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas)); //setItem: clave, valor(objeto convertido en string)
    this.listaModificada.notificar();
  },
  
};


