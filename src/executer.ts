import { readdirSync } from "fs";
import { Catalog } from "model";
import path from "path";
import process from "process";

// const test: Catalog= {
//   sku: 'test',
//   description: 'test'
// }

// console.log(test.sku)

const inputFolderPath = process.cwd() + "/src/input";

const execute = async () => {
  const files = await readdirSync(inputFolderPath);
  for (const file of files) {
    console.log(file);
  }
};

execute()
