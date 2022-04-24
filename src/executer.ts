import { createReadStream, readdirSync, readFileSync } from "fs";
import { Barcode, Catalog } from "./model";
import path from "path";
import process from "process";
import { fileNameMapGenerator } from "./util";
import { parse } from "csv-parse";
// const test: Catalog= {
//   sku: 'test',
//   description: 'test'
// }

// console.log(test.sku)

const inputFolderPath = process.cwd() + "/src/input";

const execute = async () => {
  const files = await readdirSync(inputFolderPath);
  const fileNameMap = fileNameMapGenerator(files);
  for (const entry of fileNameMap) {
    const barcodesPath = path.resolve("./src/input/" + entry[1].barcodes);
    const barcodesHeader = ["SupplierID", "SKU", "Barcode"];
    const barcodesFileContent = readFileSync(barcodesPath, {
      encoding: "utf-8",
    });

    const catalogPath = path.resolve("./src/input/" + entry[1].catalog);
    const catalogHeader = ["SKU", "Description"];
    const catalogFileContent = readFileSync(catalogPath, {
      encoding: "utf-8",
    });

    const barcodesPath = path.resolve("./src/input/" + entry[1].barcodes);
    const barcodesHeader = ["SupplierID", "SKU", "Barcode"];
    const barcodesFileContent = readFileSync(barcodesPath, {
      encoding: "utf-8",
    });

    parse(
      barcodesFileContent,
      { delimiter: ",", columns: barcodesHeader},
      (error, result: Barcode[]) => {
        console.log(result);
      }
    );

    parse(
      catalogFileContent,
      { delimiter: ",", columns: catalogHeader },
      (error, result: Catalog[]) => {
        console.log(result);
      }
    );
  }
};

execute();
