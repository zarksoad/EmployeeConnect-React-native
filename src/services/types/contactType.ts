export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  imageUri?: string | null;
}

export interface ICreateContact {
  id?: number;
  name: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  imageUri?: string | null;
}

export interface ILoginContact {
  email: string;
  password: string;
}
