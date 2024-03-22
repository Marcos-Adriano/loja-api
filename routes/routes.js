const express = require('express')
const categoriaController = require('../controllers/categoriasController')
const ProdutosControllers = require('../controllers/ProdutosControllers')

const routes = express.Router()


routes.post('/cadastrarcategoria',categoriaController.CadastrarCategoria)
routes.get('/buscarCategorias',categoriaController.ListarCategoria)
routes.put('/atualizarCategoria/:id',categoriaController.AtualizarCategoria)
routes.delete('/deletarCategoria/:id',categoriaController.DeletarCategoria)


routes.post('/cadastrarProduto',ProdutosControllers.CadastrarProduto)
routes.get('/listarProduto',ProdutosControllers.ListarProduto)
routes.put('/atualizarProduto/:id',ProdutosControllers.AtualizarProduto)
routes.delete('/deletarProduto/:id',ProdutosControllers.DeletarProduto)



module.exports = routes



