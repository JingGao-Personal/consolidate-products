export enum FileType {
  BARCODE,
  CATALOG,
  SUPPLIER,
}

export type Catalog = {
  SKU: string;
  Description: string;
};

export type Supplier = {
  ID: number;
  Name: string;
};

export type Barcode = {
  SupplierID: number;
  SKU: string;
  Barcode: string;
};

export type FileName = {
  barcodes: string;
  catalog: string;
  suppliers: string;
};

export type ResultFile = {
  SKU: string;
  Description: string;
  Source: string;
  Barcode: string;
};
