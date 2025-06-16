const button = document.querySelector('#entrar');

button.addEventListener('click', async (event) => { // Use async event handler
    event.preventDefault(); // Prevent default form submission if the button is inside a form

    localStorage.removeItem('authToken'); // Clear any existing token on new login attempt

    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    // Basic client-side validation
    if (!email || !password) {
        alert('Por favor, preencha o email e a senha.');
        return; // Stop execution if fields are empty
    }

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json(); // Await the JSON parsing

        // The backend now returns { success: true/false, message: "...", user: {...}, token: "..." }
        if (data.success) {
            // Login successful
            console.log('Login bem-sucedido:', data);

            // Store the authentication token
            localStorage.setItem('authToken', data.token);

            // Call the 'verificar' function with relevant data
            // Ensure data.user.nome and data.user.id are available from the login response
            verificar(data.success, " ", data.id); 

        } else {
            // Login failed, display the message from the backend
            alert('Erro no login: ' + data.message);
            console.log('Falha no login:', data.message);
        }
    } catch (error) {
        // Handle network errors or other unexpected issues
        console.error('Erro na requisição de login:', error);
        alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
});

// This function seems to verify the session with your backend
// It might be used for additional session management or to set cookies/session state on the backend
const verificar = async (status, nome, id) => { // Use async
    try {
        const response = await fetch('/verificar', { // Ensure '/verificar' is a valid backend route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // It's crucial to send the token for server-side verification if this route is protected
            },
            body: JSON.stringify({
                status, // 'status' might not be needed if 'token' is sufficient for verification
                nome,
                id
            })
        });

        const data = await response.json();

        if (data.session) { // Assuming 'data.session' indicates successful session verification
            window.location.href = '/home'; // Redirect to home page
        } else {
            alert('Sessão inválida ou expirada. Por favor, faça login novamente.');
            // Optional: clear token if session verification fails
            localStorage.removeItem('authToken'); 
        }
    } catch (err) {
        console.error('Erro ao verificar sessão:', err);
        alert('Erro ao verificar sessão. Tente novamente.');
    }
};
