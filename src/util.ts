import { Barcode, Catalog, FileName, ResultFile } from "./model";

// constract FileName object based on each file name
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

// map structure key: company name, value: FileName
export function fileNameMapGenerator(fileNames: string[]) {
  const resultMap = new Map<string, FileName>();

  for (const fileName of fileNames) {
    let temp = fileName;

    // use regex to get company name
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

  // Remove the first item
  results.shift();
  return results;
}

export function filterOutput(data: ResultFile[]) {
  /* 
    Because the main company will come last for 
    filtering so the array needs to be reversed
  */
  let reverse = data.reverse();

  // Remove duplicate products first
  let filterByBarcodes = [
    ...new Map(reverse.map((item) => [item.Barcode, item])).values(),
  ];

  // Remove duplicated SKUs
  let filteredBySKU = [
    ...new Map(filterByBarcodes.map((item) => [item.SKU, item])).values(),
  ];

  return filteredBySKU;
}
