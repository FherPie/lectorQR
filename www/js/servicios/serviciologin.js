angular.module('lectorQR')
.factory('Login', function($resource, HOST) {
  return $resource(HOST.HostName+'Login/:user',  {user:'@user'}, {
     query:{method: "GET", isArray:true}
  });})
  
.factory('Registro', function($resource, HOST) {
  var data= $resource(HOST.HostName+'Login/registro',  {}, {
     save:{method: 'POST', headers: [{'Content-Type': 'application/json'}], isArray:true}
  });
  return data;
});  
  
