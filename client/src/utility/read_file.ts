/**
 * Converts a file to an ArrayBuffer
 * @param _file - The file to convert
 * @returns The file as an ArrayBuffer
 */
async function readFile(_file: File): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((_resolve, _reject) => {
    const reader = new FileReader()
    reader.onload = (_event) => _resolve(_event.target?.result as ArrayBuffer)
    reader.onerror = (_error) => _reject(_error)
    reader.readAsArrayBuffer(_file)
  })
}

export default readFile
