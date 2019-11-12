import { BaseModel } from '@/models/base'

export class Pagination<T extends BaseModel> {
  content?: T[];
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  size?: number;
  sort?: string;
  totalElements?: number;
  totalPages?: number;
}
