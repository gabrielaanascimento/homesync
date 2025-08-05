document.getElementById('cadastrar').addEventListener('click', async function(event) {
    event.preventDefault(); 

    const nome: string = " "; 
    const email: string = (document.getElementById('email') as HTMLInputElement).value;
    const password: string = (document.getElementById('senha') as HTMLInputElement).value; 
    const confirmacao_senha: string = (document.getElementById('check_senha') as HTMLInputElement).value;

    async function validarEmail(email: string): Promise<boolean> {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    if (!nome || !email || !password || !confirmacao_senha) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return; 
    }

    if (!await validarEmail(email)) {
        alert('Por favor, insira um email válido!');
        return; 
    }

    if (password !== confirmacao_senha) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        const response = await fetch('https://backendtcc.vercel.app/auth/cadastrar', {
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
