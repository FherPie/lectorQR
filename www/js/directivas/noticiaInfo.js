angular.module('lectorQR').directive('noticiaInfo', function($ionicActionSheet, Mascotas, $state,$ionicPopup, $timeout, AuthService, Noticias, Noticiaid, Usuario) { 
  return { 
    restrict: 'E', 
    replace:false, 
    scope: { 
         index:'@',
      info: '=' 
    }, 
    templateUrl: 'js/directivas/noticiaInfo.html', 
    link: function($scope,  $elem, $attr ){
        
$scope.id= $scope.info.entidad;        
        
$scope.mensajes= function(){
    $state.go('principal.infoadicicional', {entidad: $scope.entidad, noticia: $scope.info, mascota: $scope.info.mascota}, {reload: true});   
}; 




 
 $scope.entidad;
 $scope.mascota;

        Usuario.query({code:  $scope.id}).$promise.then(function(user) {
        $scope.entidad = user[0]; 
        });
        

     
        $scope.id= $scope.info.entidad;
        $scope.idlogueado=AuthService.logeadoid();
        
        
$scope.editar= function(){
    

$state.go('principal.editarnoticia', {myNoti:$attr.index }, {reload: true});
        
//         console.log($scope.info.mascota);   
};   


$scope.borrar= function(){
    
 $scope.showConfirm();
    
    
};   







        
  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Confirmación',
//     template: 'Deseas borrar publicación'+$attr.index
     template: 'Deseas borrar publicación'
   });

   confirmPopup.then(function(res) {
     if(res) {
         

    $scope.id= Noticias.getlistaitems()[$attr.index].id;
    
    console.log(Noticias.getlistaitems());
        
     Noticiaid.delete({code: $scope.id }).$promise.then(function(data) {

                 console.log("data");
                    console.log(data.Mensaje);
    });

    Noticias.eliminaritem($attr.index);
     
     
     
     

       
       
     } else {
       
       
       
     }
   });
 };       

        
    }
  }; 
});


