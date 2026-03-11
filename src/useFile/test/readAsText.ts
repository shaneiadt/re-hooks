export default async function readAsText(file: File): Promise<string> {
  return file.text();
}
