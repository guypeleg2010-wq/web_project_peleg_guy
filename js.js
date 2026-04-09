function verifyAndSend() {

    var username  = document.getElementById('username').value;
    var email     = document.getElementById('email').value;
    var telephone = document.getElementById('telephone').value;
    var age       = Number(document.getElementById('age').value);
    var id        = document.getElementById('id').value;

    // בדיקות תקינות
    if (username.length < 5) {
        alert('שם משתמש חייב להכיל לפחות 5 תווים!');
        return;
    }
    if (age < 18 || age > 120) {
        alert('גיל חייב להיות בין 18 ל-120!');
        return;
    }
    if (id.length !== 9) {
        alert('תעודת זהות חייבת להכיל 9 ספרות!');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('כתובת אימייל לא חוקית!');
        return;
    }
    if (telephone.length !== 10) {
        alert('מספר טלפון חייב להכיל 10 ספרות!');
        return;
    }

    // כל הנתונים תקינים - הדפסה לקונסול
    console.log("נתוני המשתמש:");
    console.log("שם משתמש: " + username);
    console.log("אימייל: " + email);
    console.log("טלפון: " + telephone);
    console.log("גיל: " + age);
    console.log("תעודת זהות: " + id);

    // שליחת POST לשרת
    fetch("http://localhost:3000/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, email: email, telephone: telephone, age: age, id: id })
    })
    .then(function(res) { return res.text(); })
    .then(function(data) { alert(data); })
    .catch(function(err) { console.log("שגיאה: " + err); });
}
