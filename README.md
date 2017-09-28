# Master Cart Record 

### Studenti
* ARDITO CRISTINA       095052    cristina.ardito@studenti.unicam.it
* CONTIGIANI MATTIA     096141    mattia.contigiani@studenti.unicam.it
* RIBERA MARCO          095802    marco.ribera@studenti.unicam.it

### User Story
1.  come admin voglio poter accedere ad un’area privata tramite username e password
2.  come admin voglio gestire le rimanenze e i re-ordini dei prodotti
3.  il server deve inviare una email all’admin quando sta per terminare un prodotto
4.  come admin voglio poter creare e inserire un nuovo prodotto (con proprietà come nome, descrizione, peso, codiceProdotto, categoria, prezzo, quantità, img)
5.  come admin voglio gestire i fornitori
6.  come admin voglio gestiore gli utenti
7.  come admin voglio visualizzare gli ordini effettuati dagli utenti
8.  come user voglio essere avvertito quando un prodotto terminato, risulta nuovamente disponibile
9.  come user voglio gestire carrello e prodotti
10. come user voglio modificare le informazioni account
 
### Link
* Link all'app deployata su heroku:  https://progetto-web.herokuapp.com
* Link ai wireframe:  https://drive.google.com/drive/u/1/folders/0B3ZA60kWMWCeTmZ2MDFlazhVMkE

### Procedura per far partire in locale il progetto
* Da terminale digitare:  git clone https://github.com/mriberaUnicam/Progetto-Web.git
* Spostarsi all'interno della cartella Progetto-Web:  cd Progetto-Web
* Installare le dipendenze:  npm install
* Avviare l'appicazione:  npm start

### Procedura per deployare
* Spostarsi all'interno della cartella Progetto-Web:  cd Progetto-Web
* Eseguire il login:  heroku login
* Creare l'applicazione:  heroku create
* Deployare l'applicazione:  git push heroku master
* Aprire l'applicazione:  heroku open

### Descrizione dell’architettura del codice e delle cartelle
```
--+ libs                                 //Librerie
  |--- angular-google-maps.min.js        //Libreria per Google Maps
  |--- angular-simple-logger.js          //Libreria per Google Maps
  |--- lodash.js                         //Libreria per Google Maps
  |--- TweenMax.min.js                   //Libreria per Google Maps
--+ models                               //schemi modelli Mongoose
  |--- order.js                          //Modelli per il db
  |--- product.js                        //Ordini
  |--- reminder.js                       //Prodotti
  |--- supplier.js                       //Fornitori
  |--- user.js                           //Utenti
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
        |--- ui.router.js                //Standard per il routing in AngularJS
     |--+ service                        //Servizi 
        |--- cartStorage.js              //Carrello
        |--- currentUser.js              //Utente
        |--- dataStore.js                //Caricamento dati
        |--- fileLoad.js                 //Caricamento dei file
        |--- productsHandling.js         //Gestione dei prodotti
        |--- supplierService.js          //Gestione dei fornitori
     |--- cart.js                        //Controller per il carrello
     |--- dashboard.js                   //Controller per la dashboard
     |--- editProduct.js                 //Controller per la modifica dei prodotti
     |--- editProfile.js                 //Controller per la modifica del profilo dell'utente
     |--- editSupplier.js                //Controller per la modifica dei fornitori
     |--- login.js                       //Controller per il login
     |--- main.js                        //Controller per la homepage 
     |--- ngFader.js                     //Controller per la slideshow
     |--- products.js                    //Controller per i prodotti
     |--- route.js                       //Controller per le route
     |--- searchProductHome.js           //Controller per la ricerca del prodotto nella homepage
     |--- signup.js                      //Controller per la registrazione
     |--- supplier.js                    //Controller per i fornitori
     |--- supplierForm.js                //Controller per la gestione dei fornitori dashboard
     |--- toOrder.js                     //Controller per gli ordini
     |--- userForm.js                    //Controller per la gestione degli utenti dashboard
     |--- where.js                       //Controller per la mappa
--+ routes
  |--+ api
     |--+ order
        |--- db-utilities-order.js       //Interfaccia delle api con il db per gli ordini
        |--- order-index.js              //Route api 
        |--- order-utilities.js          //Funzioni dell'api per gli ordini
     |--+ product
        |--- db-utilities-product.js     //Interfaccia delle api con il db per i prodotti
        |--- product-index.js            //Route api  
        |--- product-utilities.js        //Funzioni dell'api per i prodotti
     |--+ supplier
        |--- db-utilities-supplier       //Interfaccia delle api con il db per i fornitori
        |--- supplier-index.js           //Route api  
        |--- supplier-utilities          //Funzioni dell'api per i fornitori
     |--+ user
        |--- db-utilities-user           //Interfaccia delle api con il db per gli utenti
        |--- user-index                  //Route api
        |--- user-utilities              //Funzioni dell'api per gli utenti
     |--- pdfgenerator.js                //Generazione dei pdf
--+ views                                //Template 
  |--+ admin
      |--- dashboard.ejs                  //Layout dashboard
      |--- addProduct.ejs                    //Template per aggiungere un prodotto
      |--- addSupplier.ejs                   //Template per aggiungere un fornitore
      |--- categ.ejs                         //Template per le categorie   
      |--- dashome.ejs                       //Template per la homepage della dashboard
      |--- editProduct.ejs                   //Template per la modifica del prodotto
      |--- editSupplier.ejs                  //Template per la modifica del fornitore
      |--- order.ejs                         //Template per gli ordini
      |--- orderS.ejs                        //Template per gli ordini
      |--- products.ejs                      //Template per i prodotti	
      |--- showSupplier.ejs                  //Template per la visualizzazione dei fornitori
      |--- showUser.ejs                      //Template per la visualizzazione degli utenti  
  |--+ front-end   
      |--- cart.ejs                          //Template del carrello
      |--- home.ejs                          //Template per la homepage del front-end 
      |--- login.ejs                         //Template per il login
      |--- offers.ejs                        //Template per le offerte
      |--- searchForm.ejs                    //Template per la ricerca
      |--- signup.ejs                        //Template per la registrazione
      |--- singleproduct.ejs                 //Template per i singoli prodotti
      |--- user.ejs                          //Template per gli utenti
      |--- where.ejs                         //Template per la pagina dove siamo
      |--- who.ejs                           //Template per la pagina chi siamo
  |--- index.ejs                         //Layout generale
  |--- indexLogin.ejs                    //Layout utente loggato
  |--- indexLogout.ejs                   //Layout utente non loggato
--- .gitignore
--- package.json                         
--- package-lock.js                      
--- server.js                            //File principale da eseguire                          
--- README.md
```
   



