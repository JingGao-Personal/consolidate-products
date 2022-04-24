import { FileName } from "./model";

const passFileNameIntoObject = (fileName: string) => {
  let fileNameObject: FileName = { barcodes: "", catalog: "", suppliers: "" };
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
    temp.replace(/barcodes|catalog|suppliers|.csv/gi, "");
    if (resultMap.has(temp)) {
      resultMap.set(temp, passFileNameIntoObject(fileName))
    } else {
      resultMap.set(temp, passFileNameIntoObject(fileName));
    }
  }

  return resultMap;
};
