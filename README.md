# Master Cart Record 

## Studenti:
* ARDITO CRISTINA       095052    cristina.ardito@studenti.unicam.it
* CONTIGIANI MATTIA     096141    mattia.contigiani@studenti.unicam.it
* RIBERA MARCO          ?         marco.ribera@studenti.unicam.it

## User Story:
1.  come admin voglio poter accedere ad un’area privata tramite username e password
2.  come admin voglio gestire le rimanenze e i re-ordini dei prodotti
3.  il server deve inviare una email all’admin quando sta per terminare un prodotto
4.  come admin voglio poter creare e inserire un nuovo prodotto (con proprietà come nome, descrizione, peso, codiceProdotto, categoria, prezzo, quantità, img)
5.  come admin voglio gestire i fornitori
6.  come admin voglio gestiore gli utenti
7.  come user voglio essere avvertito quando un prodotto terminato, risulta nuovamente disponibile
8.  come user voglio gestire carrello e prodotti
9.  come user voglio modificare le informazioni account
10. 
 
## Link
* Link all'app deployata su heroku:  https://progetto-web.herokuapp.com
* Link ai wireframe:  https://drive.google.com/drive/u/1/folders/0B3ZA60kWMWCeTmZ2MDFlazhVMkE

### Procedura per far partire in locale il progetto
* Da terminale digitare:  git clone https://github.com/mriberaUnicam/Progetto-Web.git
* Spostarsi all'interno della cartella Progetto-Web:  cd Progetto-Web
* Installare le dipendenze:  npm install
* Avviare l'appicazione:  npm start

## Procedura per deployare




## Descrizione dell’architettura del codice e delle cartelle
```
--+ libs                                //Librerie
  |--- angular-google-maps.min.js       //Libreria per Google Maps
  |--- angular-simple-logger.js         //Libreria per Google Maps
  |--- lodash.js                        //Libreria per Google Maps
  |--- TweenMax.min.js                  //Libreria per Google Maps
--+ models                              //schemi modelli Mongoose
  |--- order.js                         //Modelli per il db
  |--- product.js                       //Ordini
  |--- reminder.js                      //Prodotti
  |--- supplier.js                      //Fornitori
  |--- user.js                          //Utenti
--+ public
  |--+ css
     |--- style.css                      //Foglio di stile per il layout principale del front-end
     |--- style_dash.css                 //Foglio di stile per il layout principale della dashboard 
     |--- style_login.css                //Foglio di stile per il login ed il sign up
     |--- styleCart.css                  //Foglio di stile per il carrello
     |--- styleCategorie.css             //Foglio di stile per le categorie
     |--- styleDashome.css               //Foglio di stile per l'homepage della dashboard
     |--- stylehome.css                  //Foglio di stile per l'homepage del front-end
     |--- styleOffers.css                //Foglio di stile per le offerte
     |--- stylesingleproduct.css         //Foglio di stile per il singolo prodotto
     |--- styleUsers.css                 //Foglio di stile per l'account dell'utente
  |--+ img                               //Cartella contenente immagini dei prodotti, icone, banner e logo
     |---+ icon                          //Icone
     |---+ product                       //Prodotti
     |---- ...
  |--+ js
     |--+ core
        |--- ui.router.js               //Standard per il routing in AngularJS
     |--+ service                       //Servizi 
        |--- cartStorage.js             //
        |--- currentUser.js             //
        |--- dataStore.js               // 
        |--- fileLoad.js                //
        |--- productsHandling.js        //
        |--- supplierService.js         //
     |--- cart.js                        //Controller per il carrello
     |--- dashboard.js                   //Controller per la dashboard
--+ routes
  |--+ api
     |--+
--+ views                                //Template 
  |--+ admin
  |--+
--- .gitignore
--- package.json                         
--- package-lock.js                      
--- server.js                            
--- README.md
```
   



