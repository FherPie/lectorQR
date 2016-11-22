angular.module('lectorQR.controllers')
        .controller('infoadicionalCtrl', function ($scope, $state, Mascotas, $stateParams, $ionicPopup, $timeout, $cordovaCamera, $cordovaImagePicker, RegistroMascota, AuthService, Mascotaid) {


$scope.id= AuthService.logeadoid();


     

            
            
          $scope.$on('$stateChangeSuccess', function () {
                 
              
           if ($stateParams.noticia) {
                $scope.noticia=$stateParams.noticia;
            }
               
           if ($stateParams.entidad) {
                $scope.entidad=$stateParams.entidad;
            }
           if ($stateParams.mascota) {
               
               
            Mascotaid.query({code:  $stateParams.mascota}).$promise.then(function(mascota) {
             $scope.mascota = mascota[0]; 
            });
            }
               

    });
            







            $scope.validar = function () {

                if ($scope.mascota.nombres === "" || !$scope.mascota.nombres) {
                    $scope.mensajeadvertencia = "*Escribe el Nombre";
                    return true;
                }

                if ($scope.mascota.raza === "" || !$scope.mascota.raza) {
                    $scope.mensajeadvertencia = "*Escribe la Raza";
                    return true;
                }

                if ($scope.mascota.color1 === "" || !$scope.mascota.color1) {
                    $scope.mensajeadvertencia = "*Escriba el Color 1";
                    return true;
                }

                if ($scope.mascota.tipopelo === "" || !$scope.mascota.tipopelo) {
                    $scope.mensajeadvertencia = "*Escriba el Tipo de Pelo";
                    return true;
                }

                if ($scope.mascota.edad === "" || !$scope.mascota.edad) {
                    $scope.mensajeadvertencia = "*Escribe la Edad";
                    return true;
                }

                $scope.mensajeadvertencia = '';
                return false;
            };





            $scope.insertar = function () {
                if ($scope.validar() === true) {
                    return false;
                }
                
                if( $scope.mascota.pin === "./img/mascotafoto.jpg"){
                    var imgElem = document.getElementById('myImage');
                    var imgData = getBase64Image(imgElem);
                    console.log(imgData);
//                    $scope.mascota.pin="data:image/png;base64," +imgData;
                    $scope.mascota.pin=imgData;
                }else{
                  $scope.mascota.pin= $scope.mascota.pin.replace(/^data:image\/(png|jpg);base64,/, "");
                }
            
                $scope.entry.data = $scope.mascota;
                console.log(angular.toJson($scope.entry.data, true));
                    RegistroMascota.save($scope.entry.data, function (data) {
                    $scope.mensaje = data[0].Mensaje;
                    $scope.tipomsj = data[0].tipo;
                    Mascotas.agregarmascota(data[1]);
                    
                    $scope.showAlert();

                })
//                Mascotas.agregarmascota($scope.mascota);          
            };

            $scope.editar = function () {
                if ($scope.validar() === true) {
                    return false;
                }
         
                $scope.mascota.pin= $scope.mascota.pin.replace(/^data:image\/(png|jpg);base64,/, "");
                console.log($scope.mascota.pin);
                  $scope.entry.data = $scope.mascota;
                  RegistroMascota.update($scope.entry.data, function (data) {
                    $scope.mensaje = data[0].Mensaje;
                    $scope.tipomsj = data[0].tipo;
                    $scope.showAlertEdit();
                    console.log(data);
                })
                  console.log( Mascotas.getlistamascotas());
               Mascotas.getlistamascotas()[$scope.mascotaindex]=$scope.mascota;
            };
            
            
         $scope.showAlertEdit = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Publicación',
                    template: $scope.mensaje
                });

                alertPopup.then(function () {
                    $state.go('principal.publico', {}, {reload: true});

                });
            };

            
          
           $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Mascota',
                    template: $scope.mensaje 
                });

                alertPopup.then(function () {
                         $state.go('principal.publico', {}, {reload: true});

                });
            };
            
            

            
            
            
            
            
        });


