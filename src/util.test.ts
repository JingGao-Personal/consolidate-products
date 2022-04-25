import { Barcode, Catalog, FileName, ResultFile } from "./model";
import { fileNameMapGenerator, mergeBarcodeAndCatalog } from "./util";

describe("file names => map", () => {
  it("should use company name as key and file names as value to construct a map", () => {
    const mockData = [
      "barcodesA.csv",
      "barcodesB.csv",
      "catalogA.csv",
      "catalogB.csv",
      "suppliersA.csv",
      "suppliersB.csv",
    ];

    const expectData = new Map<string, FileName>([
      [
        "A",
        {
          barcodes: "barcodesA.csv",
          catalog: "catalogA.csv",
          suppliers: "suppliersA.csv",
        },
      ],
      [
        "B",
        {
          barcodes: "barcodesB.csv",
          catalog: "catalogB.csv",
          suppliers: "suppliersB.csv",
        },
      ],
    ]);

    expect(fileNameMapGenerator(mockData)).toEqual(expectData);
  });
});

describe("merge barcode and catalog", () => {
  it("it should return a list of result file objects", () => {
    const mockBarcode: Barcode[] = [
      { SKU: "aaa", Barcode: "", SupplierID: 0 },
      { SKU: "bbb", Barcode: "", SupplierID: 0 },
    ];
    const mockCatalog: Catalog[] = [
      { SKU: "aaa", Description: "this is test" },
      { SKU: "bbb", Description: "this is test" },
      { SKU: "ccc", Description: "this is test" },
    ];
    const source = "A";

    const expectData: ResultFile[] = [
      { Source: "A", SKU: "bbb", Description: "this is test", Barcode: "" },
    ];

    expect(mergeBarcodeAndCatalog(mockBarcode, mockCatalog, source)).toEqual(
      expectData
    );
  });
});
