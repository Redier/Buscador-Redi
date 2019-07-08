$('#mostrarTodos').click(cargarDatosCompletos);

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

//Funcion para cargar todos los datos del archivo JSON despues de dar click en el boton cargar todos
function cargarDatosCompletos(){
    $(document).ready(function() {
        $.ajax({
            url: "./data-1.json",
            type: "POST",
            async: true,
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(response) {
                CargueResultados(response)

            }
        });
    });
}

function CargueResultados(response){
    $('#ResultadosBusqueda').html("");
    $.each(response, function(i, data) {
        $('#ResultadosBusqueda').append(
              "<div class ='card horizontal'>"
            +  "<div class='card-image'><img src='img/home.jpg' /> </div>"
            + "<div class='card-stacked'> <div class='card-content'>"
            +      "<p >Direccion: <b>"+data.Direccion+"</b></p>"
            +      "<p >Ciudad: <b>"+data.Ciudad+"</b></p>"
            +      "<p>Telefono: <b>"+data.Telefono+"</b></p>"
            +      "<p>Codigo_Postal: <b>"+data.Codigo_Postal+"</b></p>"
            +      "<p>Tipo: <b>"+data.Tipo+"</b></p>"
            +      "<p class='precioTexto'>Precio: <b>"+data.Precio+"</b></p>"
            + "</div> </div> </div>"
          );
      });
}

function CargarCiudadesYTipos(){
    //Callback para cargar en los selectores ciudad y tipo todos las ciudades disponibles en el archivo
    $(document).ready(function() {

        $.ajax({
            url: "./modelo/procesa.php",
            type: 'POST',
            dataType: 'json', //se especifica que el tipo de datos es json
            data: {CargarCiudad: 1,Tipo: 1},
            success: function(data) {

                Object.keys(data.Ciudades).forEach(function(key){

                    $('#selectCiudad').append("<option value='"+data.Ciudades[key]+"'>"+data.Ciudades[key]+"</option>");

                });

                Object.keys(data.Tipo).forEach(function(key){

                    $('#selectTipo').append("<option value='"+data.Tipo[key]+"'>"+data.Tipo[key]+"</option>");

                });
                $(document).ready(function(){$('#selectCiudad').formSelect();});
                $(document).ready(function(){$('#selectTipo').formSelect();});
            }
        });
    });
}


$('#submitButton').click(submitInfo);

function submitInfo(event){

  event.preventDefault();
  var form_data = getInfoForm();
  $.ajax({
    url: "./modelo/procesa.php",
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(data){
      if (data != "") {
          console.log(data)
          CargueResultados(data)
      }else {
        alert("No hay resultados para la consulta");
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
  })
}


function getInfoForm(){
  var form_data = new FormData();
  form_data.append('selectCiudad', $("[id='selectCiudad']").val());
  form_data.append('selectTipo', $("[id='selectTipo']").val());
  form_data.append('rangoPrecio', $("[id='rangoPrecio']").val());

  return form_data;
}

inicializarSlider();
CargarCiudadesYTipos();
$(document).ready(function(){$('#selectCiudad').formSelect();});

$(document).ready(function(){$('#selectTipo').formSelect();});
