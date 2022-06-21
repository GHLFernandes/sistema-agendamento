import app from './app';

const PORT = process.env.PORT || 3332;

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server Error: ', err);
    }
    console.log(`Server running on: http://localhost:${PORT}`);
})