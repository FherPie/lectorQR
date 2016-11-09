angular.module('lectorQR.controllers', ['ionic', 'ngCordova'])


        .controller('AppCtrl', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {

            $scope.username = AuthService.username();

          $scope.idid = AuthService.logeadoid();
          
          
            $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Unauthorized!',
                    template: 'You are not allowed to access this resource.'
                });
            });

            $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
                AuthService.logout();
                $state.go('login');
                var alertPopup = $ionicPopup.alert({
                    title: 'Session Lost!',
                    template: 'Sorry, You have to login again.'
                });
            });

            $scope.setCurrentUsername = function (name) {
                $scope.username = name;
            };



        })




        .controller('lectorController', function ($scope, $cordovaBarcodeScanner, $state) {

           $scope.mascota = {codigo:""};
            $scope.leercodigo = function () {

                $cordovaBarcodeScanner.scan().then(function (barcodeData) {
                    alert(barcodeData.text);
                    
//                    if(barcodeData.text)
                    
                    
                    $state.go('principal.detallemasc', {}, {reload: true});
                    
                    

                }, function (error) {


                    alert('Ha ocurrido un error' + error);




                });

            };
            
            
             $scope.validar = function () {
             if ($scope.mascota.codigo === "") {
                  $scope.mensajeadvertencia="*Escriba el codigo";
                    return true;
                }
                return false;
            };
            
            
            
            
            
                $scope.buscar = function () {
                
                if ($scope.validar() === true) {
                    return false;
                } 
                $scope.mensajeadvertencia="";
            
               $state.go('principal.detallemasc', {}, {reload: true});
            };     
            



        })
// .controller('registro', function ($scope, $ionicModal, Registro) {
// .controller('registro', function ($scope, Registro, $ionicPopup, $state) {
// $scope.entry = new Registro();
// $scope.mensaje;
// 
//        $scope.persona = {
//                nombres: "",
//                apellidos: "",
//                email:"",
//                pwd:""
//            };
//
//            $scope.validar = function () {
//                
//                
//                
//                 if ($scope.persona.nombres === "") {
//                  $scope.mensajeadvertencia="*Escribe  un  Nombre";
//                    return true;
//                }
//           
//
//                if ($scope.persona.email === "" || !$scope.persona.email) {
//                   $scope.mensajeadvertencia="*Escribe un Email";
//                    return true;
//                }
//                
//                
//              if ($scope.persona.pwd === "" || !$scope.persona.pwd) {
//                   $scope.mensajeadvertencia="*Escribe una Contraseña";
//                    return true;
//                }
//                
//                
//                if ($scope.persona.apellidos === "" || !$scope.persona.apellidos) {
//                   $scope.mensajeadvertencia="*Re-Escribe una Contraseña";
//                    return true;
//                }
//                
//                
//               if ($scope.persona.apellidos !== $scope.persona.pwd) {
//                   $scope.mensajeadvertencia="*Las Contraseñas deben ser las mismas";
//                    return true;
//                }
//      
//
//                $scope.mensajeadvertencia='';
//                return false;
//            };
//
//
//$scope.insertar=function(){    
//                if ($scope.validar() === true) {
//
//                    return false;
//                } 
//               $scope.entry.data=$scope.persona ;
//               console.log(angular.toJson($scope.entry.data, true));
//               Registro.save($scope.entry.data, function(data){     
//               $scope.mensaje=data[0].Mensaje;
//           
////           
////              if ($scope.mensaje === "" || !$scope.mensaje) {
////                   $scope.mensajeadvertencia="El correo ya existe";
////                }else{
//                    
//                        $scope.showAlert();
////                }
//                  
//          
//              
//              
//              
//              });
//
//
//
//
//
//         
//       
////           $scope.openModal();   
//    
//};
//
//   $scope.showAlert = function() {
//   var alertPopup = $ionicPopup.alert({
//     title: 'Registro',
//     template: $scope.mensaje
//   });
//
//   alertPopup.then(function(res) {
//        $state.go("login");
//       
//   });
// };
////   $ionicModal.fromTemplateUrl('my-modal.html', {
////        scope: $scope,
////        animation: 'slide-in-up',
////        backdropClickToClose:false
////    }).then(function (modal) {
////        $scope.modal = modal;
////    });
////    
////      $scope.openModal = function () {
////        $scope.modal.show();
////    };  
////
////    $scope.closeModal = function () {
////        $scope.modal.hide();
////    };
////    //Cleanup the modal when we're done with it!
////    $scope.$on('$destroy', function () {
////        $scope.modal.remove();
////    });
////    // Execute action on hide modal
////    $scope.$on('modal.hidden', function () {
////        // Execute action
////    });
////    // Execute action on remove modal
////    $scope.$on('modal.removed', function () {
////        // Execute action
////    });
//
//
//})

        ;