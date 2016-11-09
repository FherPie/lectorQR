// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('lectorQR', ['lectorQR.controllers','ionic','ngCordova', 'ngResource' ])

.run(function($ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS) {
    
    
    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
 
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login'  && next.name !== 'registropersona') {
        event.preventDefault();
        $state.go('login');
      }
    }
  }); 
    
    
    
    
    
    
    
    
    
  $ionicPlatform.ready(function() {


// alert("holra");




  });


//$httpBackend.whenGET(/plantillas\/\w+.*/).passThrough();


})
.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
// $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'plantillas/login.html',
    controller: 'LoginCtrl'
  })
  .state('principal', {
    url: '/',
    abstract: true,
    templateUrl: 'plantillas/principal.html'
  })
  .state('principal.tablero', {
    url: 'principal/tablero',
    views: {
        'dash-tab': {
          templateUrl: 'plantillas/tablero.html',
          controller: 'DashCtrl'
        }
    }
  })
  .state('principal.publico', {
    url: 'principal/publico',
    reload:true,
    views: {
        'public-tab': {
          templateUrl: 'plantillas/publico.html',
          controller:"mascotas"
        }
    }
  })
  .state('principal.administrador', {
    url: 'principal/administrador',
    views: {
        'admin-tab': {
          templateUrl: 'plantillas/administrador.html'
        }
    },
    // Esto da el rol al cual se loge al app
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
  .state('principal.insertarmascota', {
    url: 'principal/insertarmascota',
    views: {
        'public-tab': {
          templateUrl: 'plantillas/nuevamascota.html'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  }) 
          
    .state('principal.insertarnoticia', {
    url: 'principal/insertarnoticia/',
   params: {myParam: null, myNoti:null},
    views: {
        'public-tab': {
          templateUrl: 'plantillas/nuevanoticia.html',
        controller:"noticiaControl"
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
  
  
   .state('principal.editarnoticia', {
    url: 'principal/editarnoticia/',
   params: {myParam: null, myNoti:null},
    views: {
        'public-tab': {
          templateUrl: 'plantillas/nuevanoticia.html',
        controller:"noticiaControl"
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
  
  
  
  
                 
       .state('principal.editarmascota', {
    url: 'principal/editarmascota/{id}',
    views: {
        'public-tab': {
          templateUrl: 'plantillas/editarmascota.html'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  }).state('registropersona', {
    url: '/registropersona',
    templateUrl: 'plantillas/registropersona.html',
    controller:"registro"

  }).state('principal.detallemasc', {
    url: 'principal/detallemasc',
    views: {
        'public-tab': {
          templateUrl: 'plantillas/detallemasc.html'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  });
  
  // Thanks to Ben Noblet!
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("login");
  });
});


