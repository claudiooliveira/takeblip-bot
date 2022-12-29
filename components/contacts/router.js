var express = require('express');
var router = express.Router();
const { Contacts  } = require('./contacts');

/* POST create contact */
router.post('/', async (req, res, next) => {
    
    try {

        var response = await Contacts.create(req.body);
        res.status(201).send(response);

    }catch(err) {
        res.status(err.code || 400).send({
            message : err.body ? (err.body.message) : err.message || err
        });
    }
    
});


/* GET search contacts */
router.get('/', async (req, res, next) => {
    
    try {

        var response = await Contacts.getByEmail(req.query.email);
        res.status(200).send(response);

    }catch(err) {
        res.status(err.code || 400).send({
            message : err.body ? (err.body.message) : err.message || err
        });
    }
    
});

module.exports = router;
