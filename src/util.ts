export const fileNameMapGenerator = (fileNames: string[]) => {

  const resultMap = new Map<string, string[]>()

  for (const fileName of fileNames) {
    let temp = fileName
    temp.replace(/barcodes|catalog|suppliers|.csv/gi, '')
    if (resultMap.has(temp)) {
      const arr = resultMap.get(temp)
      arr?.push(fileName)
    } else {
      resultMap.set(temp, [fileName])
    }
  }

  return resultMap
}
