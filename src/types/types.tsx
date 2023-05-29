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
  languages: Language;
}

export interface Language {
  [key: string]: string;
}

export interface Currencies {
  [key: string]: Currency;
}

export interface Currency {
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
  [key: string]: natName;
}

export interface natName {
  official: string;
  common: string;
}
