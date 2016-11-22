angular.module('lectorQR.controllers')
        .controller('noticiaControl', function ($scope, $state, Noticias, $stateParams, $ionicPopup, $timeout, $cordovaCamera, $cordovaImagePicker, RegistroNoticia, AuthService, Noticias) {








            if ($stateParams.myParam) {
               $scope.mascota = $stateParams.myParam;
               $scope.idmascota = $scope.mascota.id;
              }
              

            $scope.id = AuthService.logeadoid();


            $scope.entry = new RegistroNoticia();
            $scope.noticia = {
                id: "",
                cuerpo: "",
                asunto: "",
                fecha: "",
                activo: "",
                entidad: $scope.id,
                mascota: $scope.idmascota
            };



            if ($stateParams.myNoti) {
                $scope.noticiaindex = $stateParams.myNoti;
                $scope.noticia = Noticias.getlistaitems()[$scope.noticiaindex];
//                $scope.mascota = $scope.noticia.mascota;
            }



            $scope.mensajeadvertencia = '';



            $scope.validar = function () {

                if ($scope.noticia.asunto === "" || !$scope.noticia.asunto) {
                    $scope.mensajeadvertencia = "*Escribe el Asunto";
                    return true;
                }

                if ($scope.noticia.cuerpo === "" || !$scope.noticia.cuerpo) {
                    $scope.mensajeadvertencia = "*Escribe la Cuerpo";
                    return true;
                }


                $scope.mensajeadvertencia = '';
                return false;
            };





            $scope.insertar = function () {
                if ($scope.validar() === true) {
                    return false;
                }

                $scope.noticia.fecha = new Date();
                $scope.entry.data = $scope.noticia;
                RegistroNoticia.save($scope.entry.data, function (data) {
          
                    console.log(data);
                    $scope.mensaje = data[0].Mensaje;
                    $scope.tipomsj = data[0].tipo;
                   
                    $scope.showAlert();
                })
            };






            $scope.editar = function () {

                if ($scope.validar() === true) {
                    return false;
                }
                
                
                $scope.noticia.fecha = new Date($scope.noticia.fecha);
                 $scope.entry.data = $scope.noticia;
               RegistroNoticia.update($scope.entry.data, function (data) {
                    $scope.mensaje = data[0].Mensaje;
                    $scope.tipomsj = data[0].tipo;
                    $scope.showAlertEdit();
                    console.log(data);
                })
                Noticias.getlistaitems()[$scope.noticiaindex]=$scope.noticia;
                
            };



           $scope.showAlertEdit = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Publicación',
                    template: $scope.mensaje
                });

                alertPopup.then(function (res) {
                    $state.go('principal.tablero', {}, {reload: true});

                });
            };



            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Publicación',
                    template: $scope.mensaje
                });

                alertPopup.then(function (res) {
                    $state.go('principal.publico', {}, {reload: true});

                });
            };



            function getBase64Image(imgElem) {
                var canvas = document.createElement("canvas");
                canvas.width = imgElem.clientWidth;
                canvas.height = imgElem.clientHeight;
                console.log("PASOS ELEGANTE:" + canvas.height)
                var ctx = canvas.getContext("2d");
                ctx.drawImage(imgElem, -canvas.width / 2, -canvas.height / 2);
                var dataURL = canvas.toDataURL("image/png");
                return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            }






        });


