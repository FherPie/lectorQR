angular.module('lectorQR.controllers')
        .controller('mascotas1', function ($scope, $state, Mascotas, $stateParams, $ionicPopup, $timeout, $cordovaCamera, $cordovaImagePicker, RegistroMascota, AuthService) {


$scope.id= AuthService.logeadoid();


            $scope.entry = new RegistroMascota();
            $scope.mascota = {
                nombres: "",
                apellidos: "",
                raza: "",
                color1: "",
                color2: "",
                tipopelo: "",
                fechanac: "",
                edad: "",
                pin: "./img/mascotafoto.jpg",
                dueno: $scope.id,
                status: "",
                observacion:""
            };
            
            
          $scope.$on('$stateChangeSuccess', function () {
               
               
           if ($stateParams.id) {
                $scope.mascotaindex = $stateParams.id;
                console.log( "Indice de la mascota"+     $scope.mascotaindex);
                $scope.mascota = Mascotas.getlistamascotas()[$scope.mascotaindex];
                 $scope.mascota.pin= $scope.mascota.pin.replace(/^data:image\/(png|jpg);base64,/, "");
                $scope.mascota.pin="data:image/png;base64,"+$scope.mascota.pin;
                $stateParams.id=null;
             
            }
               
    });
            
  

            $scope.mensajeadvertencia = '';

//    $scope.tomarfoto= function(){
//    console.log("tomar foto");
//
//    };                 
//     var options = {
//      quality: 50,
//      destinationType: Camera.DestinationType.DATA_URL,
//      sourceType: Camera.PictureSourceType.CAMERA,
//      allowEdit: true,
//      encodingType: Camera.EncodingType.JPEG,
//      targetWidth: 100,
//      targetHeight: 100,
//      popoverOptions: CameraPopoverOptions,
//      saveToPhotoAlbum: false,
//      correctOrientation:true
//    };



            $scope.tomarfoto = function () {

//    var options = {
//      destinationType: Camera.DestinationType.FILE_URI,
//      sourceType: Camera.PictureSourceType.CAMERA,
//    };


                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.PNG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation: true
                };

//    $cordovaCamera.getPicture(options).then(function(imageURI) {
//      var image = document.getElementById('myImage');
//      image.src = imageURI;
//    }, function(err) {
//      // error
//    });



                $cordovaCamera.getPicture(options).then(function (imageData) {
                    var image = document.getElementById('myImage');
                    image.src = "data:image/png;base64," + imageData;
                    $scope.mascota.pin = image.src;
                }, function (err) {
                    // error
                });


            };


            $scope.escojerfoto = function () {

                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.PNG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

//    $cordovaCamera.getPicture(options).then(function(imageURI) {
//      var image = document.getElementById('myImage');
//      image.src = imageURI;
//    }, function(err) {
//      // error
//    });



                $cordovaCamera.getPicture(options).then(function (imageData) {
                    var image = document.getElementById('myImage');
                    image.src = "data:image/png;base64," + imageData;
                    $scope.mascota.pin = image.src;
                }, function (err) {
                    // error
                });


            };





            if ($stateParams.id) {

                $scope.mascota = Mascotas.obtenermascota($stateParams.id);

            }


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


