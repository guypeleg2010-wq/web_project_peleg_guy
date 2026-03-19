

function verifyuser() {

        let flag = true
    let username = document.querySelector('#username').value
    let email = document.querySelector('#email').value
    let telephone = document.querySelector('#telephone').value
    let id = document.querySelector('#id').value
    let age = Number(document.querySelector('#age').value)


    if (age < 18 || age > 120)
    {
        alert('גילך לא מתאים!')
        flag = false
        return
    }

    if (id.length != 9)
    {
        alert('תעודת זהות שגויה!')
        flag = false
        return

    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email))
    {
        alert("כתובת אימייל לא חוקית");
        flag = false
        return
    }

    if (telephone.length != 10)
    {
        alert('מספר טלפון לא מזוהה!')
        flag = false
        return
    }

    if (username.length < 5)
    {
        alert('אורך שם משתמש חייב להיות גדול מ-5!')
        flag = false
        return
    }

    if (flag)
    {
        alert('ההרשמה בוצעה בהצלחה!')
        console.log({
            username: username,
            email: email,
            telephone: telephone,
            id: id,
            age: age
        });
};
}
    
