angular.module('lectorQR')
.factory('ListaNoticias', function($resource, HOST) {
  return $resource(HOST.HostName+'Noticias/:code',  {code:'@code'}, {
     query:{method: "GET", isArray:true}
 })})
.factory('RegistroNoticia', function($resource, HOST) {
  var data= $resource(HOST.HostName+'Noticias/registro',  {}, {
     save:{method: 'POST', headers: [{'Content-Type': 'application/json'}], isArray:true},
     update:{method:'PUT', headers: [{'Content-Type': 'application/json'}], isArray:true}
  });
  return data;
})
.factory('Noticiaid', function($resource, HOST) {
  var data= $resource(HOST.HostName+'Noticias/xid/:code',{code:'@code'}, {
     get:{method: 'GET', isArray:true},
     remove:{method:'DELETE', isArray:false}
  });
  return data;
})
//        .factory('EditarNoticia', function ($resource,  HOST) {
//      var data = $resource(HOST.HostName+'Noticias/registro', {}, {
//     
//      });
//      return data;
// })
//})
//    .factory('EditarNoticia', function ($resource,  HOST) {
//      var data = $resource(HOST.HostName+'http://jsonplaceholder.typicode.com/users/:user', {user: '@user'}, {
//      update:{
//          method:'PUT', headers: [{'Content-Type': 'application/json'}], isArray:true
//          }
//      });
//      return data;
//  })
.service('Noticias', function() {

//    var items=[
//      {titulo: "Nueva Exposicion Canina en Quito", 
//      fecha: 123456789},
//       {titulo: "Quito tiene la mayor pablacion de pastores alemanes por Humano en el Mundo", 
//      fecha: 123456789},
//       {titulo: "Apadrina a un Animal", 
//      fecha: 123456789},
//         {titulo: "Cuidados de los Gatos en el Invierno", 
//      fecha: 123456789},
//      {titulo: "Nueva Exposicion Canina en Quito", 
//      fecha: 123456789},
//       {titulo: "Quito tiene la mayor pablacion de pastores alemanes por Humano en el Mundo", 
//      fecha: 123456789},
//       {titulo: "Apadrina a un Animal", 
//      fecha: 123456789},
//         {titulo: "Cuidados de los Gatos en el Invierno", 
//      fecha: 123456789}
//    ];
// 
// 
//var getItems= function(){
//    console.log("se ejecuta get items");
//    return items;
//    
//};
//
// 
//
// 
//  return {
//    items: getItems()
//  };
//  
 var items = new Array();
 
 
 var setItems= function(lista){
  
     items=lista;
//     console.log(mascotas);
 
};


var getItems= function(){

    return items;
    
};

var getItem= function(index){
    return items[index];  
};


 var addItem = function(mascota) {
//      mascota.id=mascotas.length;
     items.push(mascota);
 };
  
 var editItem = function(mascota) {
     items[mascota.id]=mascota;
  };

 var removeItem = function(index) {
     items.splice(index,1);
 };


  return {
    getlistaitems: getItems, 
    listaitems: setItems, 
    agregaritem: addItem,
    obteneritem:getItem,
    editaritem:editItem,
    eliminaritem:removeItem
  };
  
  
});

