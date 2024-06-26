import { Species } from './species.model';
import { Status } from './status.model';

export interface Animal {
  id: number;
  name: string;
  age: number;
  species: Species;
  dateOfRegistration: string;
  status: Status;
}
