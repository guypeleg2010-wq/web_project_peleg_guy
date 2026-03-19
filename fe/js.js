document.addEventListener("DOMContentLoaded", () => {

    // ─── קריאת ערכי הטופס ────────────────────────────────────────────────────
    function getValues() {
        return {
            username:  document.getElementById('username').value.trim(),
            email:     document.getElementById('email').value.trim(),
            telephone: document.getElementById('telephone').value.trim(),
            id:        document.getElementById('id').value.trim(),
            age:       Number(document.getElementById('age').value),
        };
    }

    // ─── חוקי אימות לכל שדה ──────────────────────────────────────────────────
    const rules = {
        username:  v => v.length >= 5                                   || "שם משתמש חייב להכיל לפחות 5 תווים",
        email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)           || "כתובת אימייל אינה חוקית",
        telephone: v => v.length === 10 && !isNaN(v.replace(/-/g, '')) || "מספר טלפון חייב להכיל 10 ספרות",
        id:        v => (v.length === 9 && !isNaN(v))                   || "תעודת זהות חייבת להכיל 9 ספרות",
        age:       v => (v >= 18 && v <= 120)                           || "גיל חייב להיות בין 18 ל-120",
    };

    // ─── אימות שדה בודד + עדכון UI ───────────────────────────────────────────
    function validateField(name) {
        const value  = name === 'age'
            ? Number(document.getElementById(name).value)
            : document.getElementById(name).value.trim();

        const result = rules[name](value);
        const input  = document.getElementById(name);
        const errEl  = document.getElementById('err-' + name);

        if (result === true) {
            input.classList.remove('error');
            input.classList.add('valid');
            errEl.textContent = '';
            errEl.classList.remove('visible');
            return true;
        } else {
            input.classList.add('error');
            input.classList.remove('valid');
            errEl.textContent = result;
            errEl.classList.add('visible');
            return false;
        }
    }

    // ─── אימות בזמן אמת (blur + תיקון תוך כדי הקלדה) ────────────────────────
    ['username', 'email', 'telephone', 'id', 'age'].forEach(name => {
        document.getElementById(name).addEventListener('blur', () => validateField(name));
        document.getElementById(name).addEventListener('input', () => {
            if (document.getElementById(name).classList.contains('error')) {
                validateField(name);
            }
        });
    });

    // ─── הצגת הודעת תגובה אינלינית ───────────────────────────────────────────
    function showMsg(text, type) {
        const el = document.getElementById('responseMsg');
        el.textContent = text;
        el.className   = `response-msg ${type} show`;
        setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => {
                el.textContent = '';
                el.className   = 'response-msg';
            }, 600);
        }, 6000);
    }

    // ─── שליחת POST לשרת ─────────────────────────────────────────────────────
    async function sendPost(values) {
        const btn = document.getElementById('signUpBtn');
        btn.disabled  = true;
        btn.textContent = 'שולח…';

        try {
            const res  = await fetch("http://localhost:3000/post", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(values),
            });
            const data = await res.text();
            showMsg("✓ " + data + " — ברוך הבא לאחווה הפילוסופית.", 'success');
        } catch (err) {
            console.error("POST Error:", err);
            showMsg("שגיאה בחיבור לשרת — ודא שהשרת פועל ונסה שנית.", 'error-msg');
        } finally {
            btn.disabled  = false;
            btn.innerHTML = 'חתימה על הברית &nbsp;·&nbsp; JOIN THE COVENANT';
        }
    }

    // ─── כפתור החתימה: אמת ← אם הכל תקין שלח POST ───────────────────────────
    document.getElementById('signUpBtn').addEventListener('click', () => {
        const allValid = ['username', 'email', 'telephone', 'id', 'age']
            .map(validateField)
            .every(Boolean);

        if (!allValid) {
            showMsg("אנא תקן את השדות המסומנים ונסה שנית.", 'error-msg');
            return;
        }

        sendPost(getValues());
    });

});
