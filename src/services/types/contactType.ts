export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  imageUri?: string | null;
}

export interface ICreateContact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  longitude?: number;
  latitude?: number;
  imageUri?: string | null;
}
