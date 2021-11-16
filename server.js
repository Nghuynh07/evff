const port = 4000;
const app = require('./app');
//Start Server
app.listen(port, () => console.log(`Port ${port} connected`));
