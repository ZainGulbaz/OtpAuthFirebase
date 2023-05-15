const express = require("express");
const admin = require("./firebase.js");
const cors = require("cors");
require("dotenv/config.js");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const app = express();
app.use(cors());
app.use(express.json());

app.get("/usersList", async (req, res) => {
    try {

        let { users } = await admin.auth().listUsers(1000);
        res.status(200);
        res.json({
            messages: ["The user list was successfully fetched"],
            data: users
        })
    }
    catch (err) {
        res.status(400);
        res.json({
            messages: ["The user list was not successfully fetched", err.message],
            data: []
        })

    }
});


app.post("/sendbulk", async (req, res) => {
    try {
        const body = req.body;
        let { users } = await admin.auth().listUsers(body.noOfUsers);
        users = users.slice(body.noOfUsers - body.offSet, body.noOfUsers);
        if (users.length == 0) {
            res.status(204);
            res.json({
                messages: ["The messages has been send to all of the users"],
                body: []
            });
            return;
        }
        console.log(users.length,body.noOfUsers,body.offSet);

        for(let i=0; i<users.length;i++)
        {
            let user=users[i];
            let resp=await client.messages.create({ body: body.message, from: process.env.TWILIO_PHONE_NUMBER, to: user.phoneNumber });    
        }
        res.status(200);
        res.json({ messages: ["The messages are send to the defined number of users successfully"] });
        return;
    }
    catch (err) {
        console.log("Heree");
        console.log(err);
        res.status(400);
        res.json({
            messages: ["The bulk messages were not sent due to an error", err.message],
            body: []
        });
    }
});

app.listen(process.env.PORT || 3000, () => "Server is running....");