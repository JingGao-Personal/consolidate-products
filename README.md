# consolidate-products

This is to merge products from different company and resolve conflicts

make sure node version

npm install -g ts-node typescript '@types/node'

assume the file format is correct

## How to run it

Make sure you have a node v14+ installed, if not please follow [this] (https://nodejs.dev/learn/how-to-install-nodejs) for the steps.

Then after download the project, go into the directory by any terminal to run:

### `yarn install`

Then:

### `yarn start`

When you see "...Done" in the terminal, which means it has finished, and go into the output folder to check the output csv.

Additionaly, run:

### `yarn test`

For testing

## For Input Files

This project can not only accept two companies, it can accept many companies, please always put our main company at the beginning in the folder, the acquired companies after that.

For each company, please follow the file name format, eg: barcodesX.CSV, catalogX.CSV, suppliersX.CSV.
