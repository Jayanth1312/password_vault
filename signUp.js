const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'password_vault',
    password: 'root'
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    try {
        const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
        res.send('User created');
    } catch (error) {
        res.status(500).send('Error creating the user');
    }
});