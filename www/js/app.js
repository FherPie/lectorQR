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
    reload:true,
    views: {
        'dash-tab': {
          templateUrl: 'plantillas/tablero.html',
          controller: 'DashCtrl'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
 .state('principal.infoadicicional', {
    url: 'principal/infoadicicional',
    reload:true,
   params: { entidad:null, noticia:null, mascota:null},
    views: {
        'dash-tab': {
          templateUrl: 'plantillas/infoadicicional.html',
          controller: 'infoadicionalCtrl'
        }
    },   
     onEnter: function ($state, $stateParams) {
      if (!$stateParams.entidad ||!$stateParams.noticia || !$stateParams.mascota ) {
        $state.go('principal.tablero', {}, {reload: true});
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
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
          templateUrl: 'plantillas/nuevamascota.html',
          controller: 'mascotas1'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  }) 
  .state('principal.editarmascota', {
    url: 'principal/editarmascota/',
   params: { id:null},
    views: {
        'public-tab': {
          templateUrl: 'plantillas/editarmascota.html',
          controller: 'mascotas1'
        }
    },   
 onEnter: function ($state, $stateParams) {
      if (!$stateParams.id) {
        $state.go('principal.publico', {}, {reload: true});
      }
      
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
 .state('principal.insertarnoticia', {
    url: 'principal/insertarnoticia/',
   params: {myParam: null},
    views: {
        'public-tab': {
          templateUrl: 'plantillas/nuevanoticia.html',
        controller:"noticiaControl"
        }
    },
    onEnter: function ($state, $stateParams) {
      console.log($stateParams.myParam);
      if (!$stateParams.myParam) {
//        $stateParams.restaurantId = $cookies.restaurantId;
        $state.go('principal.publico', {}, {reload: true});
      }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
   .state('principal.editarnoticia', {
    url: 'principal/editarnoticia/',
   params: { myNoti:null},
    views: {
        'dash-tab': {
          templateUrl: 'plantillas/editarnoticia.html',
          controller:"noticiaControl"
        }
    },
    onEnter: function ($state, $stateParams) {
//      console.log($stateParams.myParam);
      if (!$stateParams.myNoti) {
        $state.go('principal.tablero', {}, {reload: true});
      }
      
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  })
  .state('registropersona', {
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


