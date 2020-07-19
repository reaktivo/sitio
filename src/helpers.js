import * as os from 'os';
import * as std from 'std';

export async function getCwd() {
  const [str, err] = os.getcwd();
  if (err) {
    throw err;
  }
  return str;
}

export async function readDir(dirPath) {
  const [arr, err] = os.readdir(dirPath);
  if (err) {
    throw err;
  }
  return arr;
}

export async function mkdir(dirPath) {
  os.mkdir(dirPath);
  // TODO: Emulate mkdir -p
}

export async function writeFile(filePath, str) {
  const file = std.open(filePath, "w");
  file.puts(str);
  file.close();
}