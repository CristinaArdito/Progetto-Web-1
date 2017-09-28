// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var order_utilities = require('./order-utilities');
var product_utilities = require('../product/product-utilities');
var user_utilities = require('../user/user-utilities');
var fs = require('fs');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var adminRoutes = express.Router(); 
var orderRoutes = express.Router();
module.exports = orderRoutes;

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'mailerdeamonpw@gmail.com',
        pass: 'progettoweb2k17'
    },
    tls: {
         rejectUnauthorized: false 
    } 
});

orderRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
orderRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
orderRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

orderRoutes.post('/userOrder', function(req,res){
    var codevect = req.body.codes;

    console.log(codevect);
    order_utilities.userOrder(req.body.date, codevect, req.body.quantity, req.body.e)
    .then(function(order){
        res.status(201).json({ 
            success: true ,
            msg:order,
            data:""});
    })
    .catch(function(err)
    {
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""});
    }) 
});

orderRoutes.post('/supplierOrder', function(req,res){

    var codevect = req.body.codes;

    console.log(codevect);
    order_utilities.supplierOrder(req.body.date, codevect, req.body.quantity, req.body.e)
    .then(function(order){
        codevect.forEach(function(element) {
            user_utilities.getRem(element)
            .then(function(reminder){
                var reminderl = Object.keys(reminder).length;
                if(reminderl!=0){
                    var emails = "";
                    var nomeprodotto;

                    for(var i = 0; i<reminderl; i++){
                        emails = emails + reminder[i].email;
                        if(i!=reminderl-1)
                            emails = emails +",";
                    }

                    console.log(emails);
                    product_utilities.searchProductById(element)
                    .then(function(product){
                        
                        nomeprodotto = product.name;
                
                        let mailOptions = {
                            from: 'Mailer Daemon', // sender address
                            to: emails, // list of receivers
                            subject: '[REMINDER] Un prodotto nella tua lista è tornato disponibile', // Subject line
                            html: 'Il prodotto: <b>' + nomeprodotto + '</b> è nuovamente disponibile. <a href="https://progetto-web.herokuapp.com/">Entra ora e compralo!</a>' // html body
                        };
        
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                            }else{
                                console.log("Inviata");
                                emails = "";
                            }
                        });
                    });
                    user_utilities.delRem(element);
                } 
            });  
        });
        
        res.status(201).json({ 
            success: true ,
            msg:order,
            data:""});
    })
    .catch(function(err)
    {
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""});
    }) 
});

orderRoutes.post('/uOrderStory', function(req,res){
    order_utilities.getUserOrderStory(req.body.e)
    .then(function(orders){
        res.status(200).json({ success: true , 
                               msg: "lista di tutti gli ordini del'utente", 
                               data: orders});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});

orderRoutes.post('/allOrder', function(req,res){
    console.log("All order");
    order_utilities.getAllOrder()
    .then(function(orders)
      {
        console.log(orders);
        res.status(200).json({ success: true , 
                               msg: "lista di tutti gli ordini", 
                               data: orders});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});