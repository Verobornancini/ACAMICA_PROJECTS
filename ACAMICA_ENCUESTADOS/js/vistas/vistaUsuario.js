/* Vista usuario */
var VistaUsuario = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  //suscripcion a eventos del modelo
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
    contexto.reconstruirGrafico();
    });
  this.modelo.listaModificada.suscribir(function() {
    contexto.reconstruirLista();
    });
};

VistaUsuario.prototype = {
  inicializar: function() {
    validacionDeFormulario();
    this.configuracionDeBotones();
    this.reconstruirLista();
    this.reconstruirGrafico();
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;
    e.botonAgregar.click(function() {
      contexto.agregarVotos(); 
      window.location.reload();
    });
  },

  reconstruirGrafico: function(){
    var contexto = this;
    var preguntas = this.modelo.preguntas; //obtiene las preguntas del local storage
    preguntas.forEach(function(clave){
      var listaParaGrafico = [[clave.textoPregunta, 'Cantidad']];
      var respuestas = clave.cantidadPorRespuesta;
      respuestas.forEach (function(elemento) {
        listaParaGrafico.push([elemento.textoRespuesta,elemento.cantidad]);
      });
      contexto.dibujarGrafico(clave.textoPregunta, listaParaGrafico);
    })
  },

  reconstruirLista: function() {
    var listaPreguntas = this.elementos.listaPreguntas;
    listaPreguntas.html('');
    var contexto = this;
    var preguntas = this.modelo.preguntas;
    preguntas.forEach(function(clave){
       listaPreguntas.append($('<div>', {
        value: clave.textoPregunta,
        text: clave.textoPregunta,
        id: clave.id,
      }));
      var respuestas = clave.cantidadPorRespuesta;
      contexto.mostrarRespuestas(listaPreguntas,respuestas, clave);
    })
  },

  mostrarRespuestas:function(listaPreguntas,respuestas, clave){
    respuestas.forEach (function(elemento) {
      listaPreguntas.append($('<input>', {
        type: 'radio',
        value: elemento.textoRespuesta,
        name: clave.id,
      }));
      listaPreguntas.append($("<label>", {
        for: elemento.textoRespuesta,
        text: elemento.textoRespuesta
      }));
    });
  },

  agregarVotos: function(){
    var contexto = this;
    $('#preguntas').find('div').each(function(){
        var nombrePregunta = $(this).attr('value');
        var id = $(this).attr('id');
        var respuestaSeleccionada = $('input[name=' + id + ']:checked').val();
        $('input[name=' + id + ']').prop('checked',false);
        if (respuestaSeleccionada !== undefined) {
          contexto.controlador.agregarUnVoto(nombrePregunta,respuestaSeleccionada);
        }
      });
    contexto.reconstruirLista();
    contexto.reconstruirGrafico();
  },

  dibujarGrafico: function(nombre, respuestas){
    var seVotoAlgunaVez = false;
    for(var i=1;i<respuestas.length;++i){
      if(respuestas[i][1]>0){
        seVotoAlgunaVez = true;
      }
    }
    var contexto = this;
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      var data = google.visualization.arrayToDataTable(respuestas);
      var options = {
        title: nombre,
        is3D: true,
      };
      var ubicacionGraficos = contexto.elementos.graficosDeTorta;
      var id = (nombre.replace(/\W/g, '')).split(' ').join('')+'_grafico';
      if($('#'+id).length){$('#'+id).remove()}
      var div = document.createElement('div');
      ubicacionGraficos.append(div);
      div.id = id;
      div.style.width = '400';
      div.style.height = '300px';
      var chart = new google.visualization.PieChart(div);
      if(seVotoAlgunaVez){
        chart.draw(data, options);
      }
    }
  },
};
