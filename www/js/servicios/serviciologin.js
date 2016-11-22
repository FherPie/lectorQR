angular.module('lectorQR')
.factory('Login', function($resource, HOST) {
  return $resource(HOST.HostName+'Login/:user',  {user:'@user'}, {
     query:{method: "POST", isArray:true}
  });})
  
.factory('Registro', function($resource, HOST) {
  var data= $resource(HOST.HostName+'Login/registro',  {}, {
     save:{method: 'POST', headers: [{'Content-Type': 'application/json'}], isArray:true}
  });
  return data;
})
.factory('Usuario', function($resource, HOST) {
  var data= $resource(HOST.HostName+'Login/xid/:code',{code:'@code'}, {
     query:{method: 'GET', isArray:true}
  });
  return data;
})

; 
  
