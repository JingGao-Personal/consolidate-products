import { FileName } from "./model";

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
    let filteredTemp = temp.replace(/barcodes|catalog|suppliers|.csv/gi, '');
    if (resultMap.has(filteredTemp)) {
      let fileNameObject = resultMap.get(filteredTemp)
      resultMap.set(filteredTemp, passFileNameIntoObject(fileName, fileNameObject!));
    } else {
      resultMap.set(filteredTemp, passFileNameIntoObject(fileName, {barcodes: '', catalog: '', suppliers: ''}));
    }
  }

  return resultMap;
};
