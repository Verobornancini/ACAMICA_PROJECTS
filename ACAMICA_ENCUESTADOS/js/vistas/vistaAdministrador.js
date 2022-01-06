/* Vista administrador */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;
  this.modelo.preguntas = JSON.parse(localStorage.getItem('preguntas'));

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
    });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
    });
  this.modelo.todoBorrado.suscribir(function() {
    contexto.reconstruirLista();
    });
  this.modelo.votoAgregado.suscribir(function() {
    contexto.reconstruirLista();
    });
  this.modelo.listaModificada.suscribir(function() {
    contexto.reconstruirLista();
    });
};

VistaAdministrador.prototype = {
  inicializar: function() { //Inicia la lista
    validacionDeFormulario(); //llama al metodo para agregar respuestas
    this.reconstruirLista(); //llama al metodo para reconstruir la lista
    this.configuracionDeBotones(); //llama al metodo para configurar botones
  },

  construirElementoPregunta: function(pregunta){
    var nuevoItem= $('<li/>').addClass('list-group-item').attr('id', pregunta.id).text(pregunta.textoPregunta);
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a botones
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      $('[name="option[]"]').each(function() {
        var respuesta = $(this).val(); // contiene el texto de la respuesta
        if(respuesta) {
          respuestas.push({'textoRespuesta': respuesta, 'cantidad': 0}); //La cantidad de votos se setea en 0
        }})
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    
    e.botonBorrarPregunta.click(function() { 
      var id = parseInt($('.list-group-item.active').attr('id')); // detecta el elemento con el id seleccionado
      var indice = contexto.modelo.preguntas.findIndex(
        function pregunta(){ 
          pregunta.id === id});
      contexto.controlador.borrarPregunta(indice);
    });

    e.botonEditarPregunta.click(function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(id) {
        var preguntaAEditar = contexto.modelo.preguntas.find(pregunta => pregunta.id === id);
        var indice = contexto.modelo.preguntas.findIndex(pregunta => pregunta.id === id);
        var nuevaPregunta = prompt('Editar pregunta', preguntaAEditar.textoPregunta);
        contexto.controlador.editarPregunta(indice, nuevaPregunta);
      };
    });

    e.borrarTodo.click(function() {
      contexto.controlador.borrarTodo();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
