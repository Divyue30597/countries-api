export interface Countries {
  flags: Flags;
  name: Name;
  tld: string[];
  currencies: Currencies;
  capital: string[];
  region: string;
  subregion: string;
  borders: any[];
  population: number;
}

export interface Currencies {
  USD: Usd;
}

export interface Usd {
  name: string;
  symbol: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  eng: Eng;
}

export interface Eng {
  official: string;
  common: string;
}
