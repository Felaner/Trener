const { user: User } = require('../models/user');

module.exports = async function (req, res, next) {
    if (req.session.isAuthenticated) {
        await User.findByPk(req.user.id)
            .then(result => {
                console.log('Если НЕ админ: ' + !result.isAdmin)
                console.log('Если админ: ' + result.isAdmin)
                console.log('Если НЕ авторизован: ' + !req.session.isAuthenticated)
                console.log('Если авторизован: ' + req.session.isAuthenticated)
                if (!result.isAdmin) {
                    return res.status(404);
                }
            })
    } else {
        return res.redirect('/');
    }
    next()
}