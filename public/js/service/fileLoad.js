var pwApp = angular.module('pwApp');

pwApp.service('FileUpload', ['$q','DataService',function ($q,DataService) 
  {

    console.log("Io sono il file loader");

    this.fileReader = function (file) {

            console.log("FileReader");
            var reader = new FileReader();
            var result = null;

            reader.readAsDataURL(file);

            reader.onload = function(event) {
                DataService.set(event.target.result);
                alert("Caricamento completato");
            };
    }
  }])
  .run(function(FileUpload) {});