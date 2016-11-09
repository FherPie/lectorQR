angular.module('lectorQR.controllers')
        .controller('DashCtrl', function ($scope, $state, $http, $ionicPopup, AuthService, Noticias, ListaNoticias, $ionicPopover) {
            
 
      $scope.checkboxModel = {
       value1 : false,
     };      
     
     
     $scope.id= AuthService.logeadoid();

                    
              $scope.logout = function () {
                AuthService.logout();
                $state.go('login');
            };
            
            

      LlenarLista($scope.checkboxModel.value1);




  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });


            $scope.loadMore = function () {
//    $http.get('/more-items').success(function(items) {
//      useItems(items);
//      $scope.$broadcast('scroll.infiniteScrollComplete');
//    });
                console.log("se ejecuta load more");
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };




            $scope.CargarMisNoticias = function () {
              LlenarLista($scope.checkboxModel.value1);
                $scope.closePopover();
         
            };







  $scope.closePopover = function() {
    $scope.popover.hide();
  };


function LlenarLista(verdad) {
    
    if($scope.checkboxModel.value1===false){
    
     $scope.items = new Array();
     
//      ListaNoticias.query({code: $scope.id }).$promise.then(function(data) {
      ListaNoticias.query({code: "-1" }).$promise.then(function(data) {

        Noticias.listaitems(data); 
        
        
        $scope.items = Noticias.getlistaitems();
        console.log($scope.items);
        
      //Login.query({user: name+"_"+pw});
      if ($scope.items[0]  && $scope.items) {
          
//             if ( $scope.items.length>0) {
//         
//             }
//        resolve('Login success.');
         } else {
//        reject('Login Failed.');
      }     
    });
}else{
    
         $scope.items = new Array();
     
      ListaNoticias.query({code: $scope.id }).$promise.then(function(data) {

        Noticias.listaitems(data); 
        
        
        $scope.items = Noticias.getlistaitems();
        console.log($scope.items);
        
      if ($scope.items[0]  && $scope.items) {
         } else {
      }     
    });
    
    
    
}
    
};





            $scope.$on('$stateChangeSuccess', function () {
                $scope.loadMore();
            });


        });

