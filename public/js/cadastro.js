document.getElementById('cadastrar').addEventListener('click', async function(event) {
    event.preventDefault(); 

    const nome = " "; 
    const email = document.querySelector(".email").value;
    const password = document.getElementById('senha').value; 
    const confirmacao_senha = document.getElementById('check_senha').value;

    if (!nome || !email || !password || !confirmacao_senha) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return; 
    }

    if (password !== confirmacao_senha) {
        alert('As senhas não coincidem!');
        return; 
    }

    try {
        const response = await fetch('http://localhost:3000/auth/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                password: password, 
            })
        });

        const data = await response.json(); 

        if (data.success) { 
            alert(data.message); 
            window.location.href = "/login"; 
        } else {
            alert('Erro no cadastro: ' + data.message); 
        }

    } catch (error) {
        console.error('Houve um erro na comunicação com o servidor:', error);
        alert('Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.');
    }
});