const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login/loginForm', { messages: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}))

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err) {
            console.error(err);
            return next(err);
        }
        res.redirect('/login');
    });
});

module.exports = router;