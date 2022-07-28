import { PartialType } from "@nestjs/swagger";
import { CreateEnderecoDTO } from "./createEndereco.dto";


export class UpdateEnderecoDTO extends PartialType(CreateEnderecoDTO){
    
}