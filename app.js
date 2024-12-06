// server.js импорт модулей 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); /// загрузка переменных из .env

// Создаем приложение
const app = express();

// Подключение к базе данных MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB подключен'))
    .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Определяем модель пользователя
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User ', UserSchema);

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Маршрут для регистрации пользователя
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Проверяем, что все поля заполнены
    if (!username || !password) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все поля' });
    }

    try {
        // Создаем нового пользователя
        const newUser  = new User({ username, password });
        await newUser .save();
        res.status(201).json({ message: 'Пользователь зарегистрирован ' });
    } catch (error) {
        if (error.code === 11000) {
            // Обработка ошибки уникальности (duplicate key)
            return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
        }
        res.status(500).json({ message: 'Ошибка при регистрации пользователя' });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
