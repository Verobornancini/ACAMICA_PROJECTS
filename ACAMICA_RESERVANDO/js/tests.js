var expect = chai.expect;
var testParaRestaurante = new Restaurant(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]);
var testParaListado = new Listado(2, "Mandarín Kitchen", "Asiática", "Londres", ["15:00", "14:30", "12:30"], "../img/asiatica2.jpg", [7, 7, 3, 9, 7]);
var testParaReserva = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1")

describe('Test para chequear la funcion reservarHorario()', function(){
    beforeEach(function(){
        testParaRestaurante.horarios = ['15:00', '14:30', '12:30'];
    })
    it('Si se reserva un horario disponible, este se elimina del arreglo', function(){
        testParaRestaurante.reservarHorario('15:00');
        var horariosDisponibles = testParaRestaurante.horarios.length;
        expect(horariosDisponibles).to.equal(2);
    })
    it('El arreglo se mantiene igual si se reserva un horario que no existe', function(){
        testParaRestaurante.reservarHorario('11:00');
        var horariosDisponibles = testParaRestaurante.horarios.length;
        expect(horariosDisponibles).to.equal(3);
    })
    it('El arreglo se mantiene igual si no se le pasa ningun valor para reservar', function(){
        testParaRestaurante.reservarHorario(undefined);
        var horariosDisponibles = testParaRestaurante.horarios.length;
        expect(horariosDisponibles).to.equal(3);
    })
});

describe ('Test para chequear el promedio de las puntuaciones', function (){
    it ('Si las calificaciones son positivas', function (){  
        testParaRestaurante.calificaciones = [10,8];   
        var puntuacion = testParaRestaurante.obtenerPuntuacion();
        expect(puntuacion).to.equal(9);
    })
    it ('Si las calificaciones son negativas', function (){  
        testParaRestaurante.calificaciones = [10,-8];   
        var puntuacion = testParaRestaurante.obtenerPuntuacion();
        expect(puntuacion).to.equal(1);
        })
    it ('Si las calificaciones son cero', function (){  
        testParaRestaurante.calificaciones = [0,0];   
        var puntuacion = testParaRestaurante.obtenerPuntuacion();
        expect(puntuacion).to.equal(0);
        })
    it ('Si tengo solo una calificacion', function (){  
         testParaRestaurante.calificaciones = [8];   
        var puntuacion = testParaRestaurante.obtenerPuntuacion();
        expect(puntuacion).to.equal(8);
        })
});

describe ('Test para chequear si el restaurante no tiene ninguna puntuacion', function (){
    it ('No hay puntuaciones', function (){  
        testParaRestaurante.calificaciones = []; 
        var puntuacion = testParaRestaurante.obtenerPuntuacion();
        expect(puntuacion).to.equal(0);
    })
});

describe ('Test para chequear la funcion calificar()', function (){ 
    beforeEach(function(){
        testParaRestaurante.calificaciones = [];
    })
    it('Si la calificacion es 0', function(){
        testParaRestaurante.calificar(0);
        var cantidadDeCalificaciones= testParaRestaurante.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(0);
    })
    it('Si la calificacion es un valor positivo', function(){
        testParaRestaurante.calificar(7);
        var cantidadDeCalificaciones= testParaRestaurante.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(1);
    })
    it('Si la calificacion es un valor negativo', function(){
        testParaRestaurante.calificar(-8);
        var cantidadDeCalificaciones= testParaRestaurante.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(0);
    })
    it('Si la calificacion es un valor mayor a 10', function(){
        testParaRestaurante.calificar(15);
        var cantidadDeCalificaciones= testParaRestaurante.calificaciones.length;
        expect(cantidadDeCalificaciones).to.equal(0);
    })
});

describe ('Test para chequear la funcion buscarRestaurante()', function (){ 
    it ('Si el id del restaurante esta en la lista', function (){  
        //utilizo al nuevo objeto listado definido como: var listado = new Listado(listadoDeRestaurantes)
        var idRestaurante = listado.buscarRestaurante(2); 
        expect(idRestaurante).to.eql(listadoDeRestaurantes[1]); //to.eql para comparar objetos
    })
    it ('Si el id del restaurante no esta en la lista', function (){  
        var idRestaurante = listado.buscarRestaurante(85); 
        expect(idRestaurante).to.equal("No se ha encontrado ningún restaurant");
    })
    it ('Si el id del restaurante es cero', function (){  
        var idRestaurante = listado.buscarRestaurante(0); 
        expect(idRestaurante).to.equal("No se ha encontrado ningún restaurant");
    })
});

describe ('Test para chequear la funcion obtenerRestaurantes()', function (){ 
    it ('Si los tres filtros son nulos', function (){
        var filtros=listado.obtenerRestaurantes (null, null, null);
        expect(filtros).to.equal(listadoDeRestaurantes);
    })
    it('Si solo se aplica correctamente el filtro de rubro', function(){
        var filtros = listado.obtenerRestaurantes("Asiática", null, null);//obtengo un arreglo
        expect(filtros.length).to.equal(3);//comparo el largo del arreglo obtenido con el esperado
    })
    it('Si solo se aplica correctamente el filtro de ciudad', function(){
        var filtros = listado.obtenerRestaurantes(null, 'Londres', null);
        expect(filtros.length).to.equal(4);
    })
    it('Si solo se aplica correctamente el filtro de horario', function(){
        var filtros = listado.obtenerRestaurantes(null, null, "15:00");
        expect(filtros.length).to.equal(9);
    })
    it ('Si los tres filtros son validos', function (){
        var filtros=listado.obtenerRestaurantes("Asiática","Londres","15:00");
        expect(filtros.length).to.equal(1);
    })
});

describe('Test para chequear los precios de las reservas', function(){
    it('Si la reserva se genera con el precio correcto', function(){
        var precioBase = testParaReserva.precioBase();
        expect(precioBase).to.equal(2800);
    })
    it('Si se calcula correctamente el descuento por grupos grandes', function(){
        var descuento= testParaReserva.descuentoPorGruposGrandes();
        expect(descuento).to.equal(280);
    })
    it('Si se calcula correctamente el descuento por un código', function(){
        var descuento= testParaReserva.descuentoPorCodigo();
        expect(descuento).to.equal(350);
    })
    it('Si se calcula correctamente el adicional por horario', function(){
        var adicional= testParaReserva.adicionalPorHorario();
        expect(adicional).to.equal(0);
    })
    it('Si se calcula correctamente el adicional por dia.', function(){
        var adicional= testParaReserva.adicionalPorDia();
        expect(adicional).to.equal(280);
    })
    it('Si se calcula correctamente el precio final de la reserva.', function(){
        var precioTotal = testParaReserva.precioTotal();
        expect(precioTotal).to.equal(2450);
    })
});