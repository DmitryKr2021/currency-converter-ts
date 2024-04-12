export type Currency = {
  c: string;
  count: number;
  i2: string;
  i3: string;
  idNumber: number;
  n: string;
};

export type Data = {
  code: string;
  decimal_mark: '.' | ',';
  id: number;
  name: string;
  precision: number;
  short_code: string;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  thousands_separator: ',' | '.';
};
