const {Produto} = require('../models')

class ProdutosControllers{

    static async CadastrarProduto(req,res){
        try {
            const produto = await Produto.findOne({
                where:{
                    descricao: req.body.descricao,
                }
            })

            if(produto){
                res.status(401).json({
                    message:'Este produto já existe! Tente novamente'
                })
            }
                else{
                    await Produto.create({
                        descricao: req.body.descricao,
                        qtd: req.body.qtd,
                        categoriaID: req.body.categoriaID
                    })
                    res.status(200).json({
                        message:'Produto cadastrado com sucesso!'
                    })

            }

        } catch (error) {
            res.status(404).json({
                error:true,
                message:error.message
            })
        }
    } 

    static async ListarProduto(req, res) {
        try {
            const produtos = await Produto.findAll()

            if (produtos.length > 0) {
                res.status(200).json({
                    data: produtos
                    //trocar categoriaID para o nome da categoria
                })
            }
            else {
                res.status(501).json({
                    message: "Não existe produtos cadastradas!"
                })
            }

        } catch (error) {
            res.status(400).json({
                error: true,
                message: error.message
            })
        }
    }

    static async AtualizarProduto(req, res) {
        try {
            const produto = await Produto.findByPk(req.params.id);
    
            if (!produto) {
                return res.status(401).json({
                    message: 'Este produto não existe'
                });
            }
    
            if (req.body.descricao !== produto.descricao) {
                const produtoIgual = await Produto.findOne({
                    where: {
                        descricao: req.body.descricao,
                    }
                });
    
                if (produtoIgual && produtoIgual.id !== req.params.id) {
                    return res.status(400).json({
                        message: "Já existe um produto com o mesmo nome!"
                    });
                }
            }
    
            if (req.body.quantidade !== undefined && req.body.quantidade !== produto.quantidade) {
                await produto.update({
                    quantidade: req.body.quantidade
                });
    
                return res.status(200).json({
                    message: 'Quantidade do produto atualizada com sucesso!'
                });
            }
    
            return res.status(401).json({
                message: 'Este produto já existe'
            });
    
        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            });
        }
    }
    
    

    static async DeletarProduto(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id)

            if (categoria) {
                await categoria.destroy()
                res.status(200).json({
                    message: 'Categoria deletada com sucesso!'
                })
            } else {
                return res.status(404).json({
                    message: 'Categoria não encontrada! Verifique o ID fornecido.'
                })
            }
        } catch (error) {
            
            res.status(404).json({
                error: true,
                message: error.message
            });
        }
    }
}

module.exports=ProdutosControllers