const hostName = "localhost";
const port = 3000;
const app = require("./app");
const mongoose = require("mongoose");


// Connect to MongoDB
mongoose.connect('mongodb+srv://manoj123:29Rsgk0eK8ePm4th@cluster0.qdsyalo.mongodb.net/Tours', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'));

app.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});