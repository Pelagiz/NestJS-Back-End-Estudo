import { IntersectionType, PartialType } from "@nestjs/swagger";
import { UpdateEnderecoDTO } from "src/database/dto/endereco/updateEndereco.dto";
import { UpdatePedidoDTO } from "src/database/dto/pedido/updatePedido.dto";
import { CreateDadosOrdemDTO } from "./createDadosOrdem.dto";


export class UpdateDadosOrdemDTO extends PartialType(
    CreateDadosOrdemDTO
){}

export class UpdateParamsDTO extends IntersectionType(
    UpdateDadosOrdemDTO,
    UpdateEnderecoDTO,
){}

