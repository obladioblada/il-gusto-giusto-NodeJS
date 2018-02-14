let braintree = require("braintree");
let express = require('express');
let router = express.Router();


let gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "kxzjyxqw7p5wjk4j",
    publicKey: "hv7wthg8w7kbbbyq",
    privateKey: "1bd71b87d2d34f2859248adf9af92429"
});


router.get("/getclienttoken", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
        console.log("generate client token for brain tree");
        console.log(response.clientToken);
        res.json({token :response.clientToken});
    });
});


router.post("/createpurchase", function (req, res) {
    let nonceFromTheClient = req.body.payment_method_nonce;
    // Use payment method nonce here
});
module.exports = router;