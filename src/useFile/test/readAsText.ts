export default async function readAsText(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', _evt => {
      if (reader.result) {
        resolve(reader.result as string);
      }
    });
    reader.readAsText(file);
  });
}
