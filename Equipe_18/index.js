const express = require('express');
const app = express();
const porta = 8080;
const mysql = require('mysql2');
const cors = require('cors');

// Middleware para aceitar JSON no body
app.use(express.json());
app.use(cors());
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "banco",
});

// Rota POST para registrar usuário
app.post('/registro', (req, res) => {
    const { nome, email, idade, cep, endereco, cidade, estado, senha } = req.body;

    // Primeiro verifica se o email já existe
    db.query(
        "SELECT email FROM usuario WHERE email = ?",
        [email],
        (err, results) => {
            if (err) {
                console.error("Erro no MySQL:", err);
                return res.status(500).send("Erro ao verificar e-mail");
            }
            
            // Se encontrou algum resultado, o email já está cadastrado
            if (results.length > 0) {
                return res.status(400).send("Este e-mail já está cadastrado");
            }
            
            // Se não encontrou, prossegue com o cadastro
            db.query(
                "INSERT INTO usuario (nome, email, idade, cep, endereco, cidade, estado, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [nome, email, idade, cep, endereco, cidade, estado, senha],
                (err, results) => {
                    if (err) {
                        console.error("Erro no MySQL:", err);
                        return res.status(500).send("Erro ao inserir dados no banco");
                    }
                    res.send("Usuário registrado com sucesso!");
                }
            );
        }
    );
});
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.query(
        "SELECT * FROM usuario WHERE email = ? AND senha = ?",
        [email, senha],
        (err, results) => {
            if (err) {
                console.error("Erro no MySQL:", err);
                return res.status(500).send("Erro no servidor");
            }

            if (results.length > 0) {
                res.send("Login bem-sucedido!");
            } else {
                res.status(401).send("E-mail ou senha incorretos");
            }
        }
    );
});
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
