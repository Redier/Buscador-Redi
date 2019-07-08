<?php
require_once '../clases/buscador.class.php';

$data = file_get_contents("../data-1.json");
$DB = json_decode($data, true);
$obBuscador=new Buscador();
if(isset($_REQUEST["CargarCiudad"])){


    $DatosCiudades=$obBuscador->RetorneValoresUnicos($DB,"Ciudad");
    $DatosTipo=$obBuscador->RetorneValoresUnicos($DB,"Tipo");
    $Respuesta['Ciudades']=$DatosCiudades;
    $Respuesta['Tipo']=$DatosTipo;
    echo json_encode($Respuesta);
}

if(isset($_REQUEST["rangoPrecio"])){

    $RangoPrecio=$_REQUEST["rangoPrecio"];
    $Ciudad=$_REQUEST["selectCiudad"];
    $Tipo=$_REQUEST["selectTipo"];
    $Resultados=$obBuscador->BusqueEnDB($DB, $RangoPrecio,$Ciudad,$Tipo);
    if($Resultados==''){
        $Resultados["Error"]="No hay resultados en la busqueda";
    }

    echo json_encode($Resultados);
}
