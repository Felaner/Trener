const { user: User } = require('../models/user');

module.exports = async function (req, res, next) {
    if (req.session.isAuthenticated) {
        await User.findByPk(req.user.id)
            .then(result => {
                if (!result.isAdmin) {
                    return res.status(404).render('404', {
                        title: 'Страница не найдена'
                    })
                }
            })
    } else {
        return res.status(404).render('404', {
            title: 'Страница не найдена'
        })
    }
    next()
}