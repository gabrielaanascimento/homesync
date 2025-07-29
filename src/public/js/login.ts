const button = document.querySelector('#entrar');

button.addEventListener('click', async (event) => {
    event.preventDefault();
    localStorage.removeItem('authToken'); 

    const email: string = (document.querySelector('.email') as HTMLInputElement).value;
    const password: string = (document.querySelector('.password') as HTMLInputElement).value;

    if (!email || !password) {
        alert('Por favor, preencha o email e a senha.');
        return;
    }

    try {
        const response = await fetch('https://backendtcc.vercel.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

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


const verificar = async (status, nome, id) => {
    try {
        const response = await fetch('/verificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                status,
                nome,
                id
            })
        });

        const data = await response.json();

        if (data.session) {
            window.location.href = '/home';
        } else {
            alert('Sessão inválida ou expirada. Por favor, faça login novamente.');
            localStorage.removeItem('authToken'); 
        }

    } catch (err) {
        console.error('Erro ao verificar sessão:', err);
        alert('Erro ao verificar sessão. Tente novamente.');
    }
};

async function logout() {
   localStorage.removeItem('authToken');
   window.location.href = '/login';
};

export { logout };

