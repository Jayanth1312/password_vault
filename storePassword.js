app.post('/storePassword', async (req, res) => {
    const { userId, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        await db.execute('INSERT INTO password_entries (user_id, name, password) VALUES (?, ?, ?)', [userId, name, hashedPassword]);
        res.send('Password stored successfully');
    } catch (error) {
        res.status(500).send('Error storing the password');
    }
});