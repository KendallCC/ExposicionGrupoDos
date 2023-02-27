//Jquery seletores

// $("*") selecciona todos los elementos
// $("#lastname") Selecciona por medio de un ID
// $(".intro") Selecciona por medio de una clase
// $("div ~ p") Selecciona al Elemento p que aparecen luego de un Div

//Ver mas selectores ir a https://www.w3schools.com/jquery/jquery_ref_selectors.asp

// Ejemplo 1 DOM escribir html
$("#EjemploDOM1").html("Soy DOM");

// ejemplo 2 Dom Remover del html
$("#EjemploDOM2").remove();

//Ejemplo 3 DOM saber el contendor padre
myParent = $("#EjemploDOM3").parent().prop("nodeName");
// alert(myParent);

//Ejemplo 1 Jquery desaparecer objetos por ID
$(document).ready(function () {
  $("#BotonEliminar1").click(function () {
    $("#menuBorrar1").remove();
  });

  $("#BotonEliminar2").click(function () {
    $("#menuBorrar2").remove();
  });

  $("#BotonEliminar3").click(function () {
    $("#menuBorrar3").remove();
  });
});

//Ejemplo 2 Jquery desaparecer con animacion y tiempos
$(document).ready(function () {
  $("#BtnDesaparecer1").click(function () {
    $("div.Desaparecido1").fadeOut();
  });

  $("#BtnDesaparecer2").dblclick(function () {
    $("div.Desaparecido2").fadeOut(1000);
  });

  $("#BtnDesaparecer3").click(function () {
    $("div.Desaparecido3").fadeOut(2000);
  });
});

//Ejemplo 3 Jquery Card que aparecen y desaparecen con el mouse
$(document).ready(function () {
  $("#Card1").hover(
    function () {
      $("#Card1").fadeOut(1000);
    },
    function () {
      $("#Card1").fadeIn(1000);
    }
  );
  $("#Card2").hover(
    function () {
      $("#Card2").fadeOut(1000);
    },
    function () {
      $("#Card2").fadeIn(1000);
    }
  );
  $("#Card3").hover(
    function () {
      $("#Card3").fadeOut(1000);
    },
    function () {
      $("#Card3").fadeIn(1000);
    }
  );
});




//Ejemplo Api de google maps


//encontrar la ubicacion en especifico
function EncontrarUbicacion() {
  var output = document.getElementById("ubicacion");

  //Referencia a objeto Geolocalizacion
  if (navigator.geolocation) {
    output.innerHTML = "<p>Soporta la geolocalizacion</p>";
  } else {
    output.innerHTML = "<p>NO Soporta la geolocalizacion</p>";
    return;
  }

  function localizacion(posicion) {
    //Obtener las coordenadas de la posicion
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;

    output.innerHTML =
      "<p>Latitud: " + latitud + "<br>Longitud: " + longitud + "</p>";
    initMap(latitud, longitud);
  }

  function error() {
    output.innerHTML = "<p>No se pudo obtener tu ubicacion</p>";
  }
    //metodo para recuperar la posicion actual
  navigator.geolocation.getCurrentPosition(localizacion, error);
   //Dibuja el mapa con el marcador en la ubicacion que especificamos
  function initMap(latitud, longitud) {
    var miPosicion = { lat: latitud, lng: longitud };
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: miPosicion,
    });
    var marker = new google.maps.Marker({
      position: miPosicion,
      map: map,
    });
  };
}; 
//Calcular distancias entre 2 puntos especificados
function calcularDistancia() {
  // Obtener las coordenadas de los dos puntos
  var punto1 = new google.maps.LatLng(40.748817, -73.985428); // Nueva York
  var punto2 = new google.maps.LatLng(37.774929, -122.419416); // San Francisco
  // Calcular la distancia entre los dos puntos en metros
  var distancia = google.maps.geometry.spherical.computeDistanceBetween(punto1, punto2);

  // Mostrar la distancia en la página
  var distanciaKM = (distancia/1000).toFixed(2);
  var resultado = document.getElementById("resultado");
  resultado.innerHTML = "La distancia entre Nueva York y San Francisco es de " + distanciaKM + " km.";
}
//Posicionamiento continuo
function posicionamiento(){
  var map = new google.maps.Map(document.getElementById('mapa'), {
    zoom: 14,
    center: new google.maps.LatLng(40.748817, -73.985428) // Nueva York
  });
  
  // Crear un marcador en la posición inicial
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(40.748817, -73.985428),
    map: map
  });
  
  // Función para actualizar la posición del marcador
  function actualizarPosicion(posicion) {
    var latitud = posicion.coords.latitude;
    var longitud = posicion.coords.longitude;
    var nuevaPosicion = new google.maps.LatLng(latitud, longitud);
    marker.setPosition(nuevaPosicion);
    map.setCenter(nuevaPosicion);
  }
  
  // Obtener la posición del dispositivo cada 5 segundos  Error             presicion                   ms            ms
  navigator.geolocation.watchPosition(actualizarPosicion, null, {enableHighAccuracy:true, maximumAge:30000, timeout:27000});
} 
// MaximumAge: tiempo máximo que puede haber pasado desde que se almacenó en caché la posición anterior
// timeout: especifica el tiempo máximo, en milisegundos, que el sistema debe esperar para obtener la posición del dispositivo antes de llamar al manejador de error.


//Ejemplo de Google tranlate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'es',
    includedLanguages: 'en,fr',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
//Ejemplo con google charts



google.charts.load('current', {'packages':['bar']});
    // Configuramos la función que se ejecutará cuando se cargue la librería
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      // Creamos los datos del gráfico
      var data = google.visualization.arrayToDataTable([
        ['Ciudad', 'Población'],
        ['Madrid', 3200000],
        ['Barcelona', 1600000],
        ['Sevilla', 690000],
        ['Valencia', 790000],
        ['Málaga', 570000]
      ]);

      // Configuramos las opciones del gráfico
      var options = {
        chart: {
          title: 'Población de ciudades españolas'
        },
        bars: 'horizontal' // orientación horizontal de las barras
      };

      // Creamos una instancia del gráfico y lo dibujamos en el elemento HTML con ID 'chart_div'
      var chart = new google.charts.Bar(document.getElementById('chart_div'));
      chart.draw(data, google.charts.Bar.convertOptions(options));
    }