require("dotenv").config({ path: "./config.env" });
const mongoose = require('mongoose');
const User = require('./models/User');

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function insertAdminData() {
    try {
        await User.create({
            user_name: 'admin',
            email: 'admin@gmail.com',
            password: 'admin1234',
            role_id: 1,
            enabled: 1,
        });
        console.log("Admin created successfully!");
    } catch (error) {
        console.error("Error inserting Admin data:", error);
    } finally {
        mongoose.connection.close();
    }
}

insertAdminData();