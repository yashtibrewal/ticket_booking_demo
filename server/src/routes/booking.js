const { Router } = require("express");
const { BookMovie } = require("../schema");

const router = Router();


router.post('/api/booking', async (req, res, next) => {

    try {

        await BookMovie.validate(req.body);

        const result = await BookMovie.create(req.body);
        res.status(201).json(result);

    } catch (err) {
        next(err);
    }

})

router.get('/api/booking', async (req, res, next) => {

    try {

        const result = await BookMovie.findOne().sort({ _id: -1 });

        if (!result) {
            res.status(200).json({
                message: 'no previous booking found',
            });
        } else {
            res.status(200).json(result);
        }

    } catch (err) {
        next(err);
    }

});

module.exports = { bookingRoutes: router };
