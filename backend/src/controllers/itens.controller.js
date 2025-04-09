import { sendErrorResponse } from "../middlewares/sendErrorResponse.js";


export class ItemController {
    constructor(itensService) {
        this.itensService = itensService; 
    }

    async createItens(req, res) {
        try {
            const itemData = this.#extractItemData(req);
            
            const usuarioId = req.user.id;

            const novoItem = await this.itensService.createItem(itemData, usuarioId );

            return res.status(201).json(novoItem);
        } catch (error) {
            console.error("Erro ao criar item:", error);
            return sendErrorResponse(res, 500, "Erro interno do servidor");
        }
    }

    
    #extractItemData(req) {
        const {
            nome,
            descricao,
            data,
            localizacao,
            contato,
            foto,
            status,
            categoriaId
        } = req.body;

        return {
            nome,
            descricao,
            data,
            localizacao,
            contato,
            foto,
            status,
            categoriaId
        };
    }

   

   
}
