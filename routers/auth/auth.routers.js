const express = require('express');
const passport = require('../../middlewares/passport');
const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

/* router.post('/login', (req, res) => {
    const { name, password } = req.body;
    let user = formatUser(name)
    req.session.user = user;
    req.session.save((err) => {
        if (err) {
            console.log("Session error => ", err);
            return res.redirect('/error');
        }
        res.redirect('/home');
    })
}); */

router.post('/login', passport.authenticate('login', { failureRedirect: '/error', successRedirect: '/home' }));
router.post('/register', passport.authenticate('signup', { failureRedirect: '/error', successRedirect: '/home' }));

router.post('/logout', async (req, res) => {
    const user = req.session?.user
    console.log('Log de prueba', user)
    if (user.name) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), 'Public/views/pages/logout.ejs'), { name: user.name })

            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
});

router.get('/logout', async (req, res) => {
    res.redirect('/')
});


module.exports = router;