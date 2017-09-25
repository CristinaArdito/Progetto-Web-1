// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var product_utilities = require('./product-utilities');
var fs = require('fs');
var adminRoutes = express.Router(); 
var productRoutes = express.Router();
module.exports = productRoutes;

productRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
productRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
productRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

productRoutes.post('/all', function(req, res){
  product_utilities.getAllProducts()
    .then(function(products)
      {

        //console.log("\n\nProdotti: "+products);

        res.status(200).json({ success: true , 
                               msg: "lista di tutti i prodotti", 
                               data: products});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});

productRoutes.post('/add', function(req,res){
  
  //console.log("Body: ");
  //console.log(req.body);
  
  var name = req.body.data[0];
  var code = parseInt(fs.readFileSync("././public/img/product_2 (TEST)/index.txt"));
  var categories = req.body.data[1].split(",");
  var weight = req.body.data[2];
  var price = req.body.data[3];
  var quantity =  req.body.data[4];
  var url = req.body.data[5];
  var desc  = req.body.data[6];

  //console.log(name);

  // controllo parametri
  if (!name || !desc || !categories)
      {
        console.log("Body error");
        return res.status(400).json({ success: false, 
                                      code:product_utilities.ERR_MISSING_DATA,
                                      message: 'Bad Request name desc or categories missing' });  
      } 
   // esecuzione funzione    
  //console.log("Dati (api_index): "+desc+" "+name+" "+price+" "+categories);
  product_utilities.addProduct(name, desc, price, categories, code, url, weight, quantity)
        .then(function(product)
          {
           Console.log("In teoria è salvato");
           res.status(201).json({ success: true , msg:"prodotto salvato", data:product});
          })
        .catch(function(err)
          {
             res.status(400).json({ success: false , 
                                    code:err.code,
                                    msg:err.msg, 
                                    data:""}); 
          });
})

productRoutes.post('/search', function(req, res){
   // console.log(req.body.q);
    product_utilities.searchProduct(req.body.q)
      .then(function(product){
        res.status(201).json({ success: true , 
        msg:"prodotti trovati", 
        data:product});
    });
});

productRoutes.post('/loadImg', function(req, res){
    console.log("Load Image");
    var names = [];
    var i=0;
    var url = req.body.url;

    console.log("URL: "+url);

    if(url == null){
      fs.readdirSync("././public/img/product_2 (TEST)").forEach(file => {
        names[i] = file;
        i++;
      });

      var imgData = req.body.data.replace(/^data:image\/\w+;base64,/, "");

      if(names[0] == undefined){
        res.status(200).json({ success: true ,
          msg: "url file", 
          urlName: "././public/img/product_2 (TEST)/0.jpg"});
        fs.writeFileSync("././public/img/product_2 (TEST)/0.jpg", new Buffer(imgData,"base64"));
      }else{

        var numero = fs.readFileSync("././public/img/product_2 (TEST)/index.txt");
        nome = "././public/img/product_2 (TEST)/"+(parseInt(numero)+1)+".jpg";

        res.status(200).json({ success: true , 
          msg: "url file",
          urlName: nome});
        
        fs.writeFileSync(nome, new Buffer(imgData,"base64"));
          var n = (parseInt(numero)+1);
          fs.writeFileSync("././public/img/product_2 (TEST)/index.txt", ""+n);
      }
    }else{
      var imgData = req.body.data.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync(url, new Buffer(imgData,"base64"));

      res.status(200).json({ success: true , 
        msg: "url file",
        urlName: url});
    }
});

productRoutes.post('/remove',function(req,res){
    //console.log(req.body.q);

    if(fs.existsSync(req.body.url)){
      fs.unlinkSync(req.body.url);
    }

    product_utilities.deleteProduct(req.body.q)
      .then(function(product){
        res.status(410).json({success: true,
        msg: "Rimosso",
        data:""})
      })
      .catch(function(err){
        res.status(400).json({
          success: false,
          msg: err,
          data:""
        })
      })
});

productRoutes.post('/quantity',function(req,res){
  product_utilities.changeQuant(req.body.c, req.body.q)
  .then(function(product){
    res.status(200).json({success: true,
    msg: "Aggiornato",
    data:""})
  })
  .catch(function(err){
    res.status(400).json({
      success: false,
      msg: err,
      data:""
    })
  })
});

productRoutes.post('/update',function(req,res){
  
  var name = req.body.data[0];
  var categories = req.body.data[1].split(",");
  var weight = req.body.data[2];
  var price = req.body.data[3];
  var url = req.body.data[4];
  var desc  = req.body.data[5];
  var c = req.body.c;

  product_utilities.update(name, categories, weight, price, url, desc, c)
  .then(function(product){
    res.status(200).json({success: true,
    msg: "Aggiornato",
    data:""})
  })
  .catch(function(err){
    res.status(400).json({
      success: false,
      msg: err,
      data:""
    })
  })
});


/*productRoutes.post('/stringToNum',function(req,res){
  product_utilities.stringToNum()
  .then(function(product){
    res.status(200).json({success: true,
    msg: "Aggiornato",
    data:""})
  })
  .catch(function(err){
    res.status(400).json({
      success: false,
      msg: err,
      data:""
    })
  })
});*/