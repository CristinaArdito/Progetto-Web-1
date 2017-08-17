angular.module('myApp.controllers')
.controller('productsController', function($scope, $sce) {
    
    
    
    var prodotti = "";

    for (i = 0; i < 5; i++) {
            prodotti = prodotti + "<div class='product'><h2>Nome: Prodotto "+i+"</h2>"+
                                    "<ul><li>Img : "+i+"</li>"+
                                    "<li>Prezzo : "+i+"</li>"+
                                    "<li>Quantità rimanente: "+i+"</li>"+
                                    "<li><a class='btn' href='#!/orders'>Riordina</a></li>"+
                                    "</ul></div>";                                          

        }
        //console.log(prodotti);

        $scope.showProdotti = $sce.trustAsHtml(prodotti);

});