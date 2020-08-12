const router = require('express').Router();
const Item = require('../models/item.model');
const auth = require('../middleware/auth.middleware');

router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

router.delete('/:id', auth, (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;