import { FileName } from "./model";
import { fileNameMapGenerator } from "./util";

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
