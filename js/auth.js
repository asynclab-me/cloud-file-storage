const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");

async function requireAuth() {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error || !data.user) {
        window.location.href = "login.html";
        return null;
    }
    return data.user;
}

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("registerMessage");
        message.textContent = "Membuat akun...";

        const { error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error(error);
            message.textContent = "Gagal membuat akun: " + error.message;
            return;
        }

        message.textContent = "Akun berhasil dibuat. Silakan cek email jika verifikasi diperlukan.";
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const { error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert("Login gagal: " + error.message);
            return;
        }

        window.location.href = "dashboard.html";
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", async function () {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            alert("Gagal logout: " + error.message);
            return;
        }
        window.location.href = "login.html";
    });
}
