angular.module('lectorQR')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
  admin: 'admin_role'
//  publico: 'public_role'
})

.constant('HOST', {
//  HostName: 'http://localhost:8080/DOGSIAPPREST/resources/',
  HostName: 'http://192.168.100.7:8080/DOGSIAPPREST/resources/',
  publico: 'public_role'
});