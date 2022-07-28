import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateContaDTO } from './createConta.dto';

export class UpdateContaDto extends PartialType(CreateContaDTO){

}