import fs from 'fs/promises';

export default class FileManager {
  static directory = "tasks/";

  async writeFile(data) {
    const path = FileManager.directory + 'tasks.json';
    try {
      await fs.access(path);
    } catch (error) {
      if (error.code === 'ENOENT') {
          await fs.mkdir(FileManager.directory, { recursive: true });
      } else {
          console.error(error);
          throw new Error("Unexpected error occurred while writing file");
      }
  }
    await fs.writeFile(path, JSON.stringify(data, null, 2));
  }

  async readFile() {
    const path = FileManager.directory + 'tasks.json';
    try {
      await fs.access(path);
      const jsonString = await fs.readFile(path, 'utf8');
      const data = JSON.parse(jsonString);
      return data;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return "File not found"
      }
      console.error("Error reading the file:", error);
      throw new Error("Unexpected error occurred while reading file");
    }
  }
}
