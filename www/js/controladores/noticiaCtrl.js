angular.module('lectorQR.controllers')
        .controller('noticiaControl', function ($scope, $state, Noticias, $stateParams, $ionicPopup, $timeout, $cordovaCamera, $cordovaImagePicker, RegistroNoticia, AuthService) {




$scope.mascota = $stateParams.myParam;
$scope.idmascota=$scope.mascota.id;



$scope.id= AuthService.logeadoid();


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

            $scope.mensajeadvertencia = '';

//            $scope.tomarfoto = function () {
//
//
//
//
//                var options = {
//                    quality: 50,
//                    destinationType: Camera.DestinationType.DATA_URL,
//                    sourceType: Camera.PictureSourceType.CAMERA,
//                    allowEdit: true,
//                    encodingType: Camera.EncodingType.PNG,
//                    targetWidth: 100,
//                    targetHeight: 100,
//                    popoverOptions: CameraPopoverOptions,
//                    saveToPhotoAlbum: true,
//                    correctOrientation: true
//                };
//
//
//
//
//                $cordovaCamera.getPicture(options).then(function (imageData) {
//                    var image = document.getElementById('myImage');
//                    image.src = "data:image/png;base64," + imageData;
//                    $scope.mascota.pin = image.src;
//                }, function (err) {
//                    // error
//                });
//
//
//            };


//            $scope.escojerfoto = function () {
//
//                var options = {
//                    quality: 50,
//                    destinationType: Camera.DestinationType.DATA_URL,
//                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//                    allowEdit: true,
//                    encodingType: Camera.EncodingType.PNG,
//                    targetWidth: 100,
//                    targetHeight: 100,
//                    popoverOptions: CameraPopoverOptions,
//                    saveToPhotoAlbum: false,
//                    correctOrientation: true
//                };
//
//
//
//
//
//                $cordovaCamera.getPicture(options).then(function (imageData) {
//                    var image = document.getElementById('myImage');
//                    image.src = "data:image/png;base64," + imageData;
//                    $scope.mascota.pin = image.src;
//                }, function (err) {
//                    // error
//                });
//
//
//            };



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
//                if( $scope.mascota.pin === "./img/mascotafoto.jpg"){
//                    var imgElem = document.getElementById('myImage');
//                    var imgData = getBase64Image(imgElem);
//                    console.log(imgData);
////                    $scope.mascota.pin="data:image/png;base64," +imgData;
//                    $scope.mascota.pin=imgData;
//                }else{
//                  $scope.mascota.pin= $scope.mascota.pin.replace(/^data:image\/(png|jpg);base64,/, "");
//                }
                $scope.noticia.fecha=new Date();
                $scope.entry.data = $scope.noticia;
                console.log(angular.toJson($scope.entry.data, true));
                
                RegistroNoticia.save($scope.entry.data, function (data) {
                    $scope.mensaje = data[0].Mensaje;
                    $scope.tipomsj = data[0].tipo;
                    Noticias.agregaritem(data[1]);
                    
                    $scope.showAlert();

                })
//                Mascotas.agregarmascota($scope.mascota);          
            };






            $scope.editar = function () {

                if ($scope.validar() === true) {

                    return false;

                }
//                Mascotas.editarmascota($scope.mascota);
                $state.go("principal.publico");
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
// imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    console.log("PASOS ELEGANTE:"+canvas.height)
//    canvas.width = 80;
//    canvas.height = 80;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, -canvas.width/2, -canvas.height/2);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
    
            
            
            
            
            
        });


