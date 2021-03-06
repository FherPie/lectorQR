angular.module('lectorQR')
 
.service('AuthService', function($q, $http, USER_ROLES, Login) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
  var usercard= new Array();
  var logeadoid = '';
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    username = token.split('.')[0];
    logeadoid = token.split('.')[1];
    isAuthenticated = true;
    authToken = token;
 
//    if (username == 'admin') {
      role = USER_ROLES.admin;
//    }
//    if (username == 'user') {
//      role = USER_ROLES.public
//    }
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    logeadoid = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }
 
  var login = function(name, pw) {
    return $q(function(resolve, reject) {
   
        Login.query({user: name+"_"+pw}).$promise.then(function(user) {
        usercard = user;
      //Login.query({user: name+"_"+pw});
      if (usercard[0]  && usercard) {
        // Make a request and receive your auth token from your server
  
//       console.log(logeadoid);
        storeUserCredentials(name +'.'+ usercard[0].id +'.yourServerToken');
        resolve('Login success.');
         } else {
        reject('Login Failed.');
      }     
        
    });
        

    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };
  


 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return   username;},
    logeadoid: function() {return   logeadoid;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});

