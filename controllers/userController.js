const User = require('../models/user');
const bcrypt = require('bcrypt');

// Lista todos os usuários (/users -- método GET)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('users/users', { users });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });
    }
};

// Renderiza o formulário de criação de novos usuários (/users/add -- método GET)
exports.renderAddUserForm = (req, res) => {
    const createForm = true;
    res.render('users/userForm', { createForm });
}

// Cria o novo usuário (/users/add -- método POST)
exports.createUser = async (req, res) => {
    try {
        const { user, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { user } });
        console.log(user);
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).send('Este usuário já existe');
        }
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).send('Este email já existe');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ user, email, password: hashedPassword, role });
        res.redirect('/users');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });       
    }    
}

// Renderiza o formulário de atualização de usuário (/users/edit/:id -- método GET)
exports.renderUpdateUserForm = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateForm = true;
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.render('users/userForm', { user, updateForm });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });     
    }
}

// Processar a atualização do usuário (/users/:id -- método PUT)
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { user, email, password, role } = req.body;
        const userInUpdate = await User.findByPk(userId);
        if(!userInUpdate) {
            return res.status(404).send('Usuário não encontrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await userInUpdate.update({ user, email, password: hashedPassword, role });
        res.redirect('/users');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });      
    }
}

// Renderiza o formulário de exclusão de usuários (/users/delete/:id -- método GET)
exports.renderDeleteUserForm = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteForm = true;
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.render('users/userForm', { user, deleteForm });
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });    
    }
}

// Processar a atualização do usuário (/users/:id -- método PUT)
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if(!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        await user.destroy();
        res.redirect('/users');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });  
    }
}

// Registro de usuário
exports.renderRegisterUserForm = (req, res) => {
    const registerForm = true;
    res.render('register/registerForm', { registerForm });
}

exports.registerUser = async (req, res) => {
    try {
        const { user, email, password } = req.body;
        
        const existingUser = await User.findOne({ where: { user } });
        if (existingUser) {
            req.flash('error_msg', `Usuário ${user} já está cadastrado.`);
            res.redirect('register');
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            req.flash('error_msg', `E-mail ${email} já está cadastrado.`);
            res.redirect('register');            
        }

        if (password.length < 8) {
            req.flash('error_msg', 'A senha deve ter no mínimo 8 caracteres');
            res.redirect('register');            
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'usuario'
        const newUser = await User.create({ user, email, password: hashedPassword, role });
        req.flash('success_msg', 'Conta criada com sucesso. Faça login agora.');
        res.redirect('/login');
    } catch (err) {
        const status = {
            code: '500',
            info: 'Internal Server Error',
            text: 'O servidor encontrou uma condição inesperada que o impediu de atender à solicitação.'
        };
        res.status(500).render('errors/error', { status });    
    }
}