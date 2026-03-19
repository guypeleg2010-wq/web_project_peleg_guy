const express = require("express");
const app = express();
const port = 3000;

// ✅ תיקון 1: express.json() מובנה ב-Express — אין צורך בחבילת body-parser נפרדת
app.use(express.json());

// ✅ תיקון 2: טיפול מלא ב-CORS כולל preflight (OPTIONS)
// הדפדפן שולח בקשת OPTIONS לפני כל POST עם Content-Type: application/json
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // עונים מיד ל-preflight ולא ממשיכים לנתיב
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// GET — מקבל נתונים מה-URL
app.get("/get", (req, res) => {
    console.log("GET request data:", req.query);
    res.send(`GET התקבל! שלום ${req.query.username}`);
});

// POST — מקבל נתונים מגוף הבקשה
app.post("/post", (req, res) => {
    console.log("POST request data:", req.body);
    res.send(`POST התקבל! שלום ${req.body.username}`);
});

app.listen(port, () => {
    console.log(`השרת רץ: http://localhost:${port}`);
});
