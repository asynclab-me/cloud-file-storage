const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");


/*
 * REGISTER
 */

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        const message =
            document.getElementById("registerMessage");


        message.textContent = "Membuat akun...";


        const { data, error } =
            await supabaseClient.auth.signUp({
                email: email,
                password: password
            });


        if (error) {

            console.error(error);

            message.textContent =
                "Gagal membuat akun: " + error.message;

            return;
        }


        message.textContent =
            "Akun berhasil dibuat. Silakan cek email jika verifikasi diperlukan.";

    });

}


/*
 * LOGIN
 */

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });


        if (error) {

            alert(
                "Login gagal: " + error.message
            );

            return;
        }


        window.location.href =
            "dashboard.html";

    });

}