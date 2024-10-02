const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/produtos', (req, res)=> {
    res.json({msg: "Listando produtos!"})
})

app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;
  res.json({msg: "Buscando produto pelo id " + id});
})

app.post('/produtos', (req, res)=> {
    const produto = req.body;
    console.log(produto);
    res.status(201).json({msg:"Inserindo produto.."})
})

app.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const produto = req.body;
  console.log(produto);

  res.json({msg:"Atualizando produto com id "+id});
})

app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id;
  res.json({msg:"Deletando produto com id "+id});
})

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`)
})
