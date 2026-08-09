export interface Contact {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  gender: Gender;
  isFavorite: boolean;
}

export type Gender = 'male' | 'female';

export interface Theme {
  colors: {
    background: {
      [key: string]: string;
    };
    text: {
      [key: string]: string;
    };
    accent: {
      [key: string]: string;
    };
    decorations: {
      [key: string]: string;
    };
    border: {
      [key: string]: string;
    };
  };
  shadows: {
    [key: string]: string;
  };
  radii: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: string;
  };
  fonts: {
    [key: string]: string;
  };
}
