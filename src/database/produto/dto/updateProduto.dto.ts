import { PartialType } from "@nestjs/swagger";
import { CreateProdutoDTO } from "./createProduto.dto";


export class UpdateProdutoDTO extends PartialType(CreateProdutoDTO){}