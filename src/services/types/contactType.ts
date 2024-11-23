export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  imageUri?: string | null;
  userId: string;
}

export interface ICreateContact {
  name: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  imageUri?: string | null;
}
