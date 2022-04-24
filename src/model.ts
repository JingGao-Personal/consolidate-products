export type Catalog = {
  sku: string;
  description: string;
};

export type Supplier = {
  id: number;
  name: string;
};

export type Barcode = {
  supplierId: number;
  sku: string;
  barcode: string;
};

export type FileName = {
  barcodes: string;
  catalog: string;
  suppliers: string;
};