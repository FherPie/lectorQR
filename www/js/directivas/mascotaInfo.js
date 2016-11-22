angular.module('lectorQR').directive('mascotaInfo', function($ionicActionSheet, Mascotas, $state,$ionicPopup, $timeout, Mascotaid, Login) { 
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
  console.log($attr.index);  
              $state.go('principal.editarmascota', {id:$attr.index }, {reload: true});
 
 
         } 
         
              //Publicar MASCOTA 
         if(index===1){
            
//          console.log(Mascotas.obtenermascota($scope.info));   

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
 
  $scope.id= Mascotas.getlistamascotas()[$attr.index].id;
    
 
        
     Mascotaid.remove({code: $scope.id }).$promise.then(function(data) {

                 console.log("data");
                    console.log(data.Mensaje);
    });

    Mascotas.eliminarmascota($attr.index);
     
     
     
 
 
     } else {


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


