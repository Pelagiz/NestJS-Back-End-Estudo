import { PartialType } from "@nestjs/swagger";
import { CreateFormaPagamentoDTO } from "./createFormaPagamento.dto";


export class UpdateFormaPagamentoDTO extends PartialType(CreateFormaPagamentoDTO){}