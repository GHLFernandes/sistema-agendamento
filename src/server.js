const app = require('./app');

const PORT = process.env.PORT || 3333;

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server Error: ', err);
    }
    console.log('Server running on port: ', PORT);
})