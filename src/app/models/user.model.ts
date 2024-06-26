import { Adoption } from "./adoption.model";

export interface User {
    id: number;
    name: string;
    phoneNumber: string;
    username: string;
    password: string;
    adoptions: Adoption[]; 
  }

  