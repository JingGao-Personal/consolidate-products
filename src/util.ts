import { Barcode, Catalog, FileName, ResultFile } from "./model";

const passFileNameIntoObject = (fileName: string, fileNameObject: FileName) => {
  if (fileName.includes("barcodes")) {
    fileNameObject = { ...fileNameObject, barcodes: fileName };
  } else if (fileName.includes("catalog")) {
    fileNameObject = { ...fileNameObject, catalog: fileName };
  } else if (fileName.includes("suppliers")) {
    fileNameObject = { ...fileNameObject, suppliers: fileName };
  }

  return fileNameObject;
};

export function fileNameMapGenerator(fileNames: string[]) {
  const resultMap = new Map<string, FileName>();

  for (const fileName of fileNames) {
    let temp = fileName;
    let filteredTemp = temp.replace(/barcodes|catalog|suppliers|.csv/gi, "");
    if (resultMap.has(filteredTemp)) {
      let fileNameObject = resultMap.get(filteredTemp);
      resultMap.set(
        filteredTemp,
        passFileNameIntoObject(fileName, fileNameObject!)
      );
    } else {
      resultMap.set(
        filteredTemp,
        passFileNameIntoObject(fileName, {
          barcodes: "",
          catalog: "",
          suppliers: "",
        })
      );
    }
  }

  return resultMap;
}

export function mergeBarcodeAndCatalog(
  barcodesResult: Barcode[],
  catalogResult: Catalog[],
  source: string
) {
  let results: ResultFile[] = [];

  for (const barcode of barcodesResult) {
    catalogResult.find((item) => {
      if (item.SKU === barcode.SKU) {
        let result: ResultFile = {
          SKU: item.SKU,
          Description: item.Description,
          Source: source,
          Barcode: barcode.Barcode,
        };
        results.push(result);
      }
    });
  }

  results.shift();
  return results;
}

export function filterOutput(data: ResultFile[]) {
  let reverse = data.reverse();

  let filterByBarcodes = [
    ...new Map(reverse.map((item) => [item.Barcode, item])).values(),
  ];

  let filteredBySKU = [
    ...new Map(filterByBarcodes.map((item) => [item.SKU, item])).values(),
  ];

  return filteredBySKU;
}
