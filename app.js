const connect = require('connect');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = connect();

app.use(cors());

// Delay aleatório (até 3s) para simular ambiente de produção
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    const delay = Math.floor(Math.random() * 3000);
    return setTimeout(next, delay);
  }
  next();
});

// Rota para retornar o conteúdo de data.json
app.use('/api/data', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Erro ao ler data.json' }));
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(data);
  });
});

// Iniciar o servidor
app.listen(8888, () => {
  console.log('Servidor rodando em: http://localhost:8888');
  console.log('Endpoint da API: http://localhost:8888/api/data');
});