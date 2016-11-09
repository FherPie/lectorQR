angular.module('lectorQR.controllers')
  .controller('mascotas', function ($scope, $ionicModal, BuscarMascotaCodigo, AuthService, Mascotas) {
      

$scope.id=AuthService.logeadoid();

      
        $scope.mascotas = new Array();
      
  
    
    
      BuscarMascotaCodigo.query({code: $scope.id }).$promise.then(function(data) {

        Mascotas.listamascotas(data);   
        
        $scope.mascotas = Mascotas.getlistamascotas();
        
      //Login.query({user: name+"_"+pw});
      if ($scope.mascotas[0]  && $scope.mascotas) {
//        resolve('Login success.');
         } else {
//        reject('Login Failed.');
      }     
    });
    
    
    
     $scope.loadMore = function () {
//    $http.get('/more-items').success(function(items) {
//      useItems(items);
//      $scope.$broadcast('scroll.infiniteScrollComplete');
//    });
                console.log("CARGE POR FA");
                
                $scope.mascotas = new Array();
    
       BuscarMascotaCodigo.query({code: $scope.id }).$promise.then(function(data) {
        $scope.mascotas = data;
      //Login.query({user: name+"_"+pw});
      if ($scope.mascotas[0]  && $scope.mascotas) {
             
          
            console.log( $scope.mascotas);
//       resolve('Login success.');
         } else {
//        reject('Login Failed.');
      }     
    });

//                $scope.items.push({titulo: "Hola", fecha: new Date()}, {titulo: "Hola", fecha: new Date()}, {titulo: "Hola", fecha: new Date()});
                $scope.$broadcast('scroll.infiniteScrollComplete');
     };
     
    $scope.moreDataCanBeLoaded = function () {
      return true;
     };
     

  
      
    $scope.$on('$stateChangeSuccess', function () {
                $scope.loadMore();
    });
    
    
    $scope.doRefresh = function() {
    $http.get('/new-items')
     .success(function(newItems) {
       $scope.items = newItems;
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
      
      
    
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    
    
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });


});
