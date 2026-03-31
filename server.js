const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// CORS - מאפשר לדפדפן לתקשר עם השרת
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
});

// POST - מקבל נתוני משתמש מהטופס
app.post("/post", (req, res) => {
    console.log("נתונים שהתקבלו:", req.body);
    res.send("ההרשמה בוצעה בהצלחה! שלום " + req.body.username);
});

app.listen(port, () => {
    console.log("השרת רץ על פורט " + port);
});
