angular.module('lectorQR.controllers')
// .controller('registro', function ($scope, $ionicModal, Registro) {
        .controller('registro', function ($scope, Registro, $ionicPopup, $state) {
            $scope.entry = new Registro();
            $scope.mensaje;
            $scope.tipomsj;

            $scope.persona = {
                nombres: "",
                apellidos: "",
                email: "",
                pwd: "",
                userid: ""
            };

            $scope.validar = function () {

                if ($scope.persona.nombres === "") {
                    $scope.mensajeadvertencia = "*Escribe un Nombre";
                    return true;
                }


                if ($scope.persona.email === "" || !$scope.persona.email) {
                    $scope.mensajeadvertencia = "*Escribe un Email";
                    return true;
                }

                if ($scope.persona.userid === "" || !$scope.persona.userid) {
                    $scope.mensajeadvertencia = "*Escribe un Usuario";
                    return true;
                }
                
                if($scope.persona.userid.length<6){
                    $scope.mensajeadvertencia = "*Escribe un Usuario con 6 o más caracteres.";
                    return true;
                }

                if ($scope.persona.pwd === "" || !$scope.persona.pwd) {
                    $scope.mensajeadvertencia = "*Escribe una Contraseña";
                    return true;
                }
                
                if($scope.persona.pwd.length<6){
                    $scope.mensajeadvertencia = "*Escribe una Contraseña con 6 o más caracteres.";
                    return true;
                }


                if ($scope.persona.apellidos === "" || !$scope.persona.apellidos) {
                    $scope.mensajeadvertencia = "*Re-Escribe una Contraseña";
                    return true;
                }


                if ($scope.persona.apellidos !== $scope.persona.pwd) {
                    $scope.mensajeadvertencia = "*Las Contraseñas deben ser las mismas";
                    return true;
                }


                $scope.mensajeadvertencia = '';
                return false;
            };


            $scope.insertar = function () {
                if ($scope.validar() === true) {

                    return false;
                }
                $scope.entry.data = $scope.persona;
                console.log(angular.toJson($scope.entry.data, true));
                Registro.save($scope.entry.data, function (data) {
                    $scope.mensaje = data[0].Mensaje;
                    $scope.tipomsj = data[0].tipo;

//           
//              if ($scope.mensaje === "" || !$scope.mensaje) {
//                   $scope.mensajeadvertencia="El correo ya existe";
//                }else{

                    $scope.showAlert();
//                }
                });







//           $scope.openModal();   

            };

            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Registro',
                    template: $scope.mensaje 
                });

                alertPopup.then(function (res) {
                    $state.go("login");

                });
            };
            
            
            
//   $ionicModal.fromTemplateUrl('my-modal.html', {
//        scope: $scope,
//        animation: 'slide-in-up',
//        backdropClickToClose:false
//    }).then(function (modal) {
//        $scope.modal = modal;
//    });
//    
//      $scope.openModal = function () {
//        $scope.modal.show();
//    };  
//
//    $scope.closeModal = function () {
//        $scope.modal.hide();
//    };
//    //Cleanup the modal when we're done with it!
//    $scope.$on('$destroy', function () {
//        $scope.modal.remove();
//    });
//    // Execute action on hide modal
//    $scope.$on('modal.hidden', function () {
//        // Execute action
//    });
//    // Execute action on remove modal
//    $scope.$on('modal.removed', function () {
//        // Execute action
//    });


        })

        ;