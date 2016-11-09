/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('lectorQR.controllers')

        .controller('LoginCtrl', function ($scope, $state, $ionicPopup, AuthService, $ionicSlideBoxDelegate) {

            $scope.data = {username:"",
        password:""};
    
    
    
     $scope.mensajeadvertencia='';
     
            $scope.validar = function () {
                
                
                
                 if ($scope.data.username === "") {
                  $scope.mensajeadvertencia="*Escriba su usuario";
                    return true;
                }

    

       
                if ($scope.data.password=="") {
                   $scope.mensajeadvertencia="*Escriba la contraseña";
                    return true;
                }

                

                $scope.mensajeadvertencia='';
                return false;
            };
    
    
    
    


            $scope.login = function () {
                
                 if ($scope.validar() === true) {

                    return false;
                } 
                AuthService.login($scope.data.username, $scope.data.password).then(function (authenticated) {
                    $state.go('principal.tablero', {}, {reload: true});
                    $scope.setCurrentUsername($scope.data.username);
                }, function (err) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                });
            };


//   $scope.slideHasChanged = function(index) {
//       console.log(index);
//       
////    $scope.items.push({name:'John', age:25, gender:'boy'});
//    $ionicSlideBoxDelegate.update();
//  };


            $scope.nextSlide = function () {
                $ionicSlideBoxDelegate.next();
            }



        });