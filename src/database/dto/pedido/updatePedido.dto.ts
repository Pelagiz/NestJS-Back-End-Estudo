import { PartialType } from "@nestjs/swagger";
import { CreatePedidoDTO } from "./createPedido.dto";


export class UpdatePedidoDTO extends PartialType(CreatePedidoDTO){}