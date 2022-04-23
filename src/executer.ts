import { readdirSync } from "fs";
import { BusinessItems, Catalog } from "model";
import path from "path";

// const test: Catalog= {
//   sku: 'test',
//   description: 'test'
// }

// console.log(test.sku)


const inputFolder = path.resolve('input/')
const files = readdirSync(inputFolder)
for (const file of files) {
  console.log(file)
}