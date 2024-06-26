import { Animal } from './animal.model';
import { User } from './user.model';

export interface Adoption {
  id?: number;
  adoptionDate: string;
  user: User;
  animal: Animal;
}
