angular.module('lectorQR')
 .factory('BuscarMascotaCodigo', function($resource, HOST) {
  return $resource(HOST.HostName+'Mascotas/:code',  {code:'@code'}, {
     query:{method: "GET", isArray:true}
  })})
  
  
 .factory('RegistroMascota', function($resource, HOST) {
  var data= $resource(HOST.HostName+'Mascotas/registro',  {}, {
     save:{method: 'POST', headers: [{'Content-Type': 'application/json'}], isArray:true}
  });
  return data;
})


//
.service('Mascotas', function() {
   
   var mascotas = new Array();
 
 
 var setMascotas= function(lista){
  
     mascotas=lista;
//     console.log(mascotas);
 
};


var getMascotas= function(){

    return mascotas;
    
};

var getMascota= function(index){
    return mascotas[index];  
};


 var addMascota = function(mascota) {
//      mascota.id=mascotas.length;
     mascotas.push(mascota);
 };
  
 var editMascota = function(mascota) {
     mascotas[mascota.id]=mascota;
  };

 var removeMascota = function(index) {
     mascotas.splice(index,1);
 };

var hi= function(index){
    console.log("se ejecuta get items");
    ;
    
};

  return {
    getlistamascotas: getMascotas, 
    listamascotas: setMascotas, 
    agregarmascota: addMascota,
    obtenermascota:getMascota,
    editarmascota:editMascota,
    eliminarmascota:removeMascota
  };
});

