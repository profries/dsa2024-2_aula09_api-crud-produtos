const express = require('express')
const produtoService = require('./service/produto_service')

const app = express()
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//API para testar se a URL está no ar (http://localhost:3000)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Listar Produtos
app.get('/produtos', (req, res)=> {
    res.json(produtoService.listar())
})

//Buscar por id
app.get('/produtos/:id', (req, res) => {
  // O + antes converte o valor para number (na URL vem como string)
  const id = +req.params.id;
  try {
    res.json(produtoService.buscarPorId(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
})

//Inserir
app.post('/produtos', (req, res)=> {
    const produto = req.body;
    try{
      const produtoInserido = produtoService.inserir(produto);
      res.status(201).json(produtoInserido)
    }
    catch(err){
      res.status(err.id).json(err)
    }
})

//Atualizar
app.put('/produtos/:id', (req, res) => {
  const id = +req.params.id;
  const produto = req.body;
  try{
    const produtoAtualizado = produtoService.atualizar(id, produto);
    res.json(produtoAtualizado)
  }
  catch(err){
    res.status(err.id).json(err)
  }
})

//Deletar
app.delete('/produtos/:id', (req, res) => {
  const id = +req.params.id;
  try {
    res.json(produtoService.deletar(id));
  } catch(err) {
    res.status(err.id).json(err)
  }
})

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`)
})
