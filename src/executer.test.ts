import { fileNameMapGenerator } from "util";


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

    expect(fileNameMapGenerator(mockData)).toEqual(0)
  });
});
