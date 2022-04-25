import { readdirSync, readFileSync } from "fs";
import { Barcode, Catalog, FileType, ResultFile, Supplier } from "./model";
import path from "path";
import process from "process";
import {
  fileNameMapGenerator,
  filterOutput,
  mergeBarcodeAndCatalog,
} from "./util";
import { parse } from "csv-parse";
import { createObjectCsvWriter } from "csv-writer";

const inputFolderPath = process.cwd() + "/src/input";
const ouputFolderPath = process.cwd() + "/src/output/result_output.csv";

/* 
  convert CSV file based on it's type,
  wrap the return with promise, so that we can get parse csv call back
  return value
*/
const readOneCSVIntoObject = (
  partialPath: string,
  headers: string[],
  fileType: FileType
) => {
  const fullPath = path.resolve("./src/input/" + partialPath);
  const fileContent = readFileSync(fullPath, {
    encoding: "utf-8",
  });

  switch (fileType) {
    case FileType.BARCODE: {
      return new Promise<Barcode[]>((resolve) => {
        parse(
          fileContent,
          { delimiter: ",", columns: headers },
          (error, content: Barcode[]) => {
            resolve(content);
          }
        );
      });
    }

    case FileType.CATALOG: {
      return new Promise<Catalog[]>((resolve) => {
        parse(
          fileContent,
          { delimiter: ",", columns: headers },
          (error, content: Catalog[]) => {
            resolve(content);
          }
        );
      });
    }

    case FileType.SUPPLIER: {
      return new Promise<Supplier[]>((resolve) => {
        parse(
          fileContent,
          { delimiter: ",", columns: headers },
          (error, content: Supplier[]) => {
            resolve(content);
          }
        );
      });
    }
  }
};

const execute = async () => {
  const files = readdirSync(inputFolderPath);
  const fileNameMap = fileNameMapGenerator(files);
  const csvWriter = createObjectCsvWriter({
    path: ouputFolderPath,
    header: [
      { id: "SKU", title: "SKU" },
      { id: "Description", title: "Description" },
      { id: "Source", title: "Source" },
    ],
  });
  let data: ResultFile[] = [];

  // Loop the file map, for each entry, pass value as file type
  for (const entry of fileNameMap) {
    const barcodesHeader = ["SupplierID", "SKU", "Barcode"];
    const catalogHeader = ["SKU", "Description"];
    const [barcodesResult, catalogResult] = await Promise.all([
      readOneCSVIntoObject(entry[1].barcodes, barcodesHeader, FileType.BARCODE),
      readOneCSVIntoObject(entry[1].catalog, catalogHeader, FileType.CATALOG),
    ]);

    data = data.concat(
      mergeBarcodeAndCatalog(
        barcodesResult as Barcode[],
        catalogResult as Catalog[],
        entry[0]
      )
    );
  }

  await csvWriter.writeRecords(filterOutput(data)).then(() => {
    console.log("...Done");
  });
};

execute();
