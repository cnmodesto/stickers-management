document.getElementById('registrationForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messagesDiv = document.getElementById('messages');

    if (password.length < 8) {
        messagesDiv.innerHTML =  `
            <div class="alert alert-danger text-center" role="alert">
                <span>A senha deve ter no mínimo 8 caracteres.</span>
            </div>`;
        e.preventDefault();
    }

    if (password !== confirmPassword) {
        messagesDiv.innerHTML =  `
            <div class="alert alert-danger text-center" role="alert">
                <span>As senhas não correspondem.</span>
            </div>`;
        e.preventDefault();
    }
})