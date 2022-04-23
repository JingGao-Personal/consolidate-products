
export enum BusinessItems {
  catalog = 'catalog',
  supplier = 'supplier',
  barcodes = 'barcodes'
}

export type Catalog = {
  sku: string,
  description: string
}

export type Supplier = {
  id: number,
  name: string
}

export type Barcode = {
  supplierId: number,
  sku: string,
  barcode: string
}

