import { PartialType } from "@nestjs/swagger";
import { CreateRolesDTO } from "./createRoles.dto";

export class UpdateRolesDTO extends PartialType(CreateRolesDTO){}