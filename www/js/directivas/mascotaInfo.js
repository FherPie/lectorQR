angular.module('lectorQR').directive('mascotaInfo', function($ionicActionSheet, Mascotas, $state,$ionicPopup, $timeout) { 
  return { 
    restrict: 'E', 
    replace:false, 
    scope: { 
         index:'@',
      info: '=' 
    }, 
    templateUrl: 'js/directivas/mascotaInfo.html', 
    link: function($scope,  $elem, $attr){
        
        
        
$scope.mensajes= function(){
console.log("La mascota recibe una notificación  que la puede leer. Alguien se puedo en contacto con ella\n\
atravez de la aplicacion le envio un mensaje o algo asi");
};      
        
        
        
        
        

       
  $scope.showActionsheet = function() {
      
      
   
    $ionicActionSheet.show({
      titleText: 'Mascota',
      buttons: [
        { text: '<i class="icon ion-edit"></i> Editar' },
        { text: '<i class="icon ion-navigate"></i> Publicar' }
//        { text: '<i class="icon ion-arrow-move"></i> Move' }
      ],
      destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
         //EDITAR MASCOTA 
         if(index===0){
            
//           Mascotas.mascota($scope.info.id);

  $state.go('principal.editarmascota', {id:$scope.info.id }, {reload: true});
//          console.log(Mascotas.obtenermascota($scope.info.id));   
         } 
         
              //Publicar MASCOTA 
         if(index===1){
            

      $state.go('principal.insertarnoticia', {myParam:$scope.info }, {reload: true});
         
               
              
              
         }     
         
          
        console.log('BUTTON CLICKED', index);
        return true;
      },
      destructiveButtonClicked: function() {
         
           // A confirm dialog
 $scope.showConfirm = function() {
 
var confirmPopup = $ionicPopup.confirm({
     title: 'Eliminar',
     template: 'Esta seguro de Eliminar a la mascota?'
   });
   
 
   
   confirmPopup.then(function(res) {
     if(res) {
         Mascotas.eliminarmascota($scope.info.id);
         console.log($scope.info.id);
         $state.go('principal.publico', { }, {reload: true}); 
         
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
 };
          
    $scope.showConfirm();         
    console.log('DESTRUCT');
        
        
        
        
        
        
        return true;
      }
    });
  };  
        
    }
  }; 
});


