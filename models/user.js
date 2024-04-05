const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const User = sequelize.define('User', {
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    }
});

User.afterSync(async () => {
    const adminUser = process.env.ADMIN_USERNAME;
    const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminRole = process.env.ADMIN_ROLE;
    await User.findOrCreate({
        where: { user: adminUser, email: adminEmail},
        defaults: { user: adminUser, email: adminEmail, password: hashedAdminPassword, role: adminRole}
    }).then(([user, created]) => {
        if(created) {
            console.log(`Usuário '${adminUser}' adicionado com sucesso!`);
        } else {
            console.log(`Usuário '${adminUser}' já existe.`);
        }
    }).catch(err => {
        console.log(`Erro ao adicionar o usuário '${adminUser}':`, err);
    });
});

module.exports = User;