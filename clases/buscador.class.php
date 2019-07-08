<?php

class Buscador{
    //Convierte una matriz en valores unicos
    function unique_multidim_array($array, $key) {
        $temp_array = array();      
        
        for($i=0;$i<count($array);$i++){
            
            $temp_array[$i]=$array[$i][$key];
        }
        return array_unique($temp_array); 
    }
    
    
    public function RetorneValoresUnicos($data,$Clave){
        
        return $this->unique_multidim_array($data,$Clave);
        //return ($this->unique_multidim_array($data,$Clave)); 
    }
    
    //Busca un rango de precios
    
    public function BusqueEnDB($data,$RangoPrecio,$Ciudad,$Tipo) {
        $temp_array = array();
        $Rango= explode(";", $RangoPrecio);
        $Resultados=array();
        $z=0;
        for($i=0;$i<count($data);$i++){
            $Precio=str_replace("$","",$data[$i]["Precio"]);
            $Precio=str_replace(",","",$Precio);
            $Find=0;
            if($Precio>=$Rango[0] and $Precio<=$Rango[1]){
                if($Tipo=='' and $Ciudad<>''){
                    if($Ciudad==$data[$i]["Ciudad"]){
                        $Find=1;                    
                    }
                }
                if($Tipo<>'' and $Ciudad==''){
                    if($Tipo==$data[$i]["Tipo"]){
                        $Find=1;                    
                    }
                }
                                
                if($Tipo<>'' and $Ciudad<>'' ){
                    if($Ciudad==$data[$i]["Ciudad"] and $Tipo==$data[$i]["Tipo"]){
                        $Find=1;
                    }
                    
                }
                if($Tipo=='' and $Ciudad==''){
                    
                    $Find=1;                    
                    
                }
                if($Find==1){
                    $Resultados[$z]=$data[$i];
                    $z++;
                }
                
                                
            }
        }
        return($Resultados);
    }
    
    //Busca por ciudad
    
    public function BusquePorCiudad($data,$Ciudad) {
        $Resultados=array();
        $z=0;
        for($i=0;$i<count($data);$i++){
            
            if($Ciudad==$data[$i]){
                
                $Resultados[$z]=$data[$i];
                
                $z++;                
            }
        }
        return($Resultados);
    }
    
}