document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('username').value; // assume que 'username' é o email
  const senha = document.getElementById('password').value;
  const mensagemSenha = document.querySelector('.mensagem1');

  fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      mensagemSenha.style.display = 'block';
      throw new Error('Login falhou');
    }
  })
  .then(data => {
    alert(data);
  })
  .catch(error => {
    alert(error.message);
  });
});

function registrar() {
  alert("Você será redirecionado para a página de cadastro.");
  // Redirecionar para página de cadastro
  // window.location.href = 'cadastro.html';
}
