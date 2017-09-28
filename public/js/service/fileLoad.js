var pwApp = angular.module('pwApp');

pwApp.service('FileUpload', ['$q','DataService',function ($q,DataService) 
  {

    this.fileReader = function (file) {

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