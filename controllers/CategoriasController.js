const { Categoria, Produto } = require("../models")
const categoria = require("../models/categoria")

class categoriaController {

    static async ListarCategoria(req, res) {
        try {
            const categorias = await Categoria.findAll({
                include: [{
                    model: Produto,
                    as: 'produtos',
                    attributes: ['descricao', 'id']
                }]
            })

            if (categorias.length > 0) {
                res.status(200).json({
                    data: categorias
                })
            }
            else {
                res.status(501).json({
                    message: "Não existe categorias cadastradas!"
                })
            }

        } catch (error) {
            res.status(400).json({
                error: true,
                message: error.message
            })
        }
    }

    static async CadastrarCategoria(req, res) {
        try {
            const categoria = await Categoria.findOne({
                where: {
                    descricao: req.body.descricao
                }
            })

            if (categoria) {
                res.status(401).json({
                    message: 'Esta categoria já existe! Tente novamente'
                })
            }
            else {
                await Categoria.create({
                    descricao: req.body.descricao
                })
                res.status(200).json({
                    message: 'Categoria cadastrada com sucesso!'
                })
            }

        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            })
        }
    }

    static async AtualizarCategoria(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id)
            const catIgual = await Categoria.findOne({
                where: {
                    descricao: req.body.descricao,
                }
            })

            if (categoria) {
                if (catIgual) {
                    res.status(401).json({
                        message: 'Este categoria já existe! Tente novamente'
                    })
                }
                else {
                    categoria.update({
                        descricao: req.body.descricao

                    })
                    res.status(200).json({
                        message: 'Categoria atualizada com sucesso!'
                    })
                }
            }
            else {
                res.status(401).json({
                    message: 'Este categoria não existe'
                })
            }

        } catch (error) {
            res.status(404).json({
                error: true,
                message: error.message
            })
        }
    }

    static async DeletarCategoria(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id)
            const produtoCat = await Produto.findAll({
                where:{
                    categoriaID: categoria.id
                }
            })

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

module.exports = categoriaController
