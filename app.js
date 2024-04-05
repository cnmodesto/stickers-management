// Importações diversas
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
dotenv.config();

// Importa rotas
const sessionRoutes = require('./routes/sessionRoutes');
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const albumRoutes = require('./routes/albumRoutes');
const collectionRoutes = require('./routes/collectionRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Requires relacionados ao Passport.js e express-session
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

// Inicializa o app
const app = express();

// Configuração da sessão
app.use(session({
    secret: 'secretpassphrase', // Chave secreta para assinar os cookies da sessão
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize // Conexão do Sequelize com o banco de dados
    })
}));

// Inicialização do flash
app.use(flash());

// Middleware para passar as mensagens flash para todas as views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Configurações de processamento do body-parser
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));

// Inicialização do Passport.js
app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Definindo a função helper equal para Handlebars
const hbs = require('hbs');
hbs.registerHelper('equal', function (val1, val2, options) {
    return val1 === val2 ? options.fn(this) : options.inverse(this);
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Routes
app.use(sessionRoutes);
app.use(indexRoutes);
app.use(userRoutes);
app.use(albumRoutes);
app.use(collectionRoutes);
app.use(reportRoutes);

// Conexão com banco de dados e inicialização do servidor
sequelize.sync().then(() => {
    console.log('Database connected.');
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Passport.js 
passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    failureFlash: true
},
async function(user, password, done) {
    try {
        const userLogin = await User.findOne({ where: { user } });
        if (!userLogin) {
            return done(null, false, { message: 'Usuário não encontrado/cadastrado.' });
        }
        if (!bcrypt.compareSync(password, userLogin.password)) {
            return done(null, false, { message: 'Senha incorreta. Tente novamente!' });
        }
        return done(null, userLogin);
    } catch(err) {
        return done(err);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = app;