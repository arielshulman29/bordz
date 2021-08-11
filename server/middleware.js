const { boardSchema } = require('./Schemas');
const User = require('./models/User');

module.exports.validateBoard = (req, res, next) => {
    const { error } = boardSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        res.status(409).json({ message: msg });
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const board = await board.findById(id);
    if (!board.author.equals(req.user.id)) {
        res.status(409).json({ message: error });
    }
    next();
}


module.exports.isLogedIn = async (req, res, next) => {
    if (!req.body.seller) {
        res.status(409).json({ message: "must log in to make changes" });
    }
    else {
        const user = await User.findById(req.body.seller);
        if (!user) {
            res.status(409).json({ message: "user unauthorized" });
        }
    }
    next();
}

