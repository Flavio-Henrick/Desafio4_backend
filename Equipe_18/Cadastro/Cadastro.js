// Seleciona o formulário de cadastro pelo ID
const formularioRegistro = document.querySelector('#cadastroForm');

// Expressões regulares para validação dos campos
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida formato de e-mail
const cepRegex = /^\d{5}-\d{3}$/; // Valida formato de CEP (00000-000)
const enderecoRegex = /^[a-zA-Z\u00C0-\u00FF ]+, [a-zA-Z\u00C0-\u00FF ]+, \d+$/; // Valida formato de endereço (Rua, Bairro, N°)

// Adiciona listener para o evento de submit do formulário
formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submit
    
    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const idade = document.getElementById('idade').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const senha = document.getElementById('senha').value;

    // Validação do e-mail
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido no formato: email@exemplo.com");
        return; // Interrompe a execução se a validação falhar
    }

    // Validação do CEP
    if (!cepRegex.test(cep)) {
        alert("Por favor, insira um CEP válido no formato: 00000-000");
        return;
    }

    // Validação do endereço
    if (!enderecoRegex.test(endereco)) {
        alert("Por favor, insira o endereço no formato: Rua, Bairro, N°");
        return;
    }

    // Validação da senha (tamanho mínimo)
    if (senha.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres");
        return;
    }

    // Envio dos dados para o servidor via Fetch API
    fetch('http://localhost:8080/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ // Converte os dados para JSON
            nome,
            email,
            idade,
            cep,
            endereco,
            cidade,
            estado,
            senha
        })
    })
    .then(response => response.text()) // Converte a resposta para texto
    .then(data => alert(data)) // Mostra a resposta do servidor
    .catch(error => console.error('Erro:', error)); // Captura erros de rede
});

// Validação em tempo real para campos do formulário
document.querySelectorAll('#cadastroForm input').forEach(input => {
    input.addEventListener('input', function() {
        const mensagem = this.nextElementSibling;
        // Verifica se o próximo elemento é uma mensagem de validação
        if (mensagem && mensagem.classList.contains('mensagem1')) {
            let isValid = false;
            
            // Aplica a validação específica para cada campo
            switch(this.id) {
                case 'email':
                    isValid = emailRegex.test(this.value);
                    break;
                case 'cep':
                    isValid = cepRegex.test(this.value);
                    break;
                case 'endereco':
                    isValid = enderecoRegex.test(this.value);
                    break;
                case 'senha':
                    isValid = this.value.length >= 8;
                    break;
            }
            
            // Exibe/oculta mensagem de validação
            if (this.value === '') {
                mensagem.style.display = 'none';
            } else {
                mensagem.style.display = 'block';
                mensagem.style.color = isValid ? 'green' : 'red'; // Muda cor conforme validação
                this.style.borderColor = isValid ? 'green' : 'red'; // Muda borda do campo
            }
        }
    });
});

// Formatação automática do campo CEP
document.getElementById('cep').addEventListener('input', function(e) {
    // Remove todos os caracteres não numéricos
    let value = e.target.value.replace(/\D/g, '');
    // Adiciona hífen após os primeiros 5 dígitos
    if (value.length > 5) {
        value = value.substring(0,5) + '-' + value.substring(5,8);
    }
    e.target.value = value; // Atualiza o valor do campo
});