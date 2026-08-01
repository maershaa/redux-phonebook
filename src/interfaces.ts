export interface Contact {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  gender: Gender;
  isFavorite: boolean;
}
export type Gender = 'male' | 'female';
