app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length > 0) {
            const user = users[0];
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                res.send('Success');
            } else {
                res.send('Not allowed');
            }
        } else {
            res.send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});