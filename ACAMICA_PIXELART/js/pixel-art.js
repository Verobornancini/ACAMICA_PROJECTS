var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

//variables globales
var colorPersonalizado = document.getElementById('color-personalizado'); // Variable para guardar el elemento 'color-personalizado'
var paleta = document.getElementById('paleta'); //guardo en una variable el elemento de id=paleta
var grillaPixeles= document.getElementById("grilla-pixeles");//guardo en una variable el elemento de id=grilla-pixeles
var mouseApretado; //variable para detectar si el mouse esta apretado o no

//funcion para paleta de colores
function paletaDeColores (){
  for (var i=0; i<nombreColores.length; i++){ //recorro el arreglo de colores
    var paletaHijo = document.createElement("div"); // creo un div por cada color del arreglo
    paletaHijo.style.backgroundColor = nombreColores[i]; //le doy un color a cada div
    paletaHijo.className="color-paleta"; // le asigno la clase al div creado
    paleta.appendChild(paletaHijo); //agrego y enlazo el div a una rama existente
  }
};

//funcion para la grilla de pantalla
function crearGrilla(){
  for(var i = 0; i < 1750; i++){ //la grilla debe tener 1750 pixeles 
    var pixel = document.createElement('div'); //cada pixel será un div
    grillaPixeles.appendChild(pixel); //agrego y enlazo el div a una rama existente
  }
};

//seleccionar un color de la paleta
paleta.addEventListener("click",cambiarColor); // le aplico el evento OnClick a la paleta y le paso una callback 

function cambiarColor(event){ //event guarda la informacion del evento en este caso la informacion de donde se hizo el click en la paleta
  var colorSeleccionado= event.target.style.backgroundColor; //guardo la informacion del color del div clickeado
  var indicadorDeColor = document.getElementById('indicador-de-color'); //guardo en una variable el indicado de color
  indicadorDeColor.style.backgroundColor= colorSeleccionado; //modifico el indicador de color con el color seleccionado
};

// funcion para que el indicador de color de la rueda de colores tenga el color seleccionado
colorPersonalizado.addEventListener('change', cambiarColorRueda);

function cambiarColorRueda() {
  var colorActual = colorPersonalizado.value;// Se guarda el color de la rueda en colorActual
  var indicadorDeColor = document.getElementById('indicador-de-color'); //guardo en una variable el indicado de color
  indicadorDeColor.style.backgroundColor= colorActual; //modifico el indicador de color con el color seleccionado
};

//pintar un pixel de la grilla y pintar en movimiento
grillaPixeles.addEventListener('mousedown', pintarPixel);// le aplico el evento OnMouseDown para detectar si se apreta el mouse
grillaPixeles.addEventListener('mouseover', pintarTrazo);// le aplico el evento OnMouseOver para detectar si el mouse para por el elemento
grillaPixeles.addEventListener('mouseup', soltarClick);// le aplico el evento OnMouseUp para detectar si se suelta el mouse

function pintarPixel(event){ //event guarda la informacion del evento en este caso la informacion de donde se hizo el click en la grilla
  var pixelPintado= event.target; // guardo la informacion del pixel clickeado
  var indicadorDeColor= document.getElementById('indicador-de-color'); //guardo en una variable el indicado de color
  nuevoColor= indicadorDeColor.style.backgroundColor; // defino el color con el que voy a pintar
  pixelPintado.style.backgroundColor= nuevoColor; //pinto el pixel asignandole el color del indicador de color
  mouseApretado = true;
};

function pintarTrazo(event){
  if(mouseApretado){
    pintarPixel(event);}
};

function soltarClick(){
  mouseApretado = false;
};

//Cargar super Heroes en la grilla

$("#batman").click(
  function (){
    cargarSuperheroe(batman);
});

$("#wonder").click(
  function (){
    cargarSuperheroe(wonder);
});

$("#flash").click(
  function (){
    cargarSuperheroe(flash);
});

$("#invisible").click(
  function (){
    cargarSuperheroe(invisible);
});

// boton borrar todo, para borrar los pixeles de la grilla para volver a comenzar
$('#borrar').click(
  function(){
    $('#grilla-pixeles DIV').animate({'backgroundColor': '#fff'}, 1000);
});

//boton guardar, para guardar el pixel-art en un archivo .png
$('#guardar').click(
  function(){
    guardarPixelArt();
});

//Llamo las funciones de la paleta y de la grilla
crearGrilla();
paletaDeColores();