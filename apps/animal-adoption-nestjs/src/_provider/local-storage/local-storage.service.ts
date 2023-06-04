import { appRootPath, fs, path, uuid } from '@/_helper';
import { Injectable } from '@nestjs/common';
import internal from 'stream';

@Injectable()
export class LocalStorageService {
  async getFile(filepath: string): Promise<{
    path: string;
    extension: string;
    size: number;
    buffer: Buffer;
  }> {
    try {
      return {
        path: filepath,
        extension: path.extname(filepath),
        size: 0, // TODO: get file size (not implemented due to how api consumed)
        buffer: await fs.promises.readFile(filepath),
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadFile(
    filePath: string,
    buffer:
      | string
      | NodeJS.ArrayBufferView
      | Iterable<string | NodeJS.ArrayBufferView>
      | AsyncIterable<string | NodeJS.ArrayBufferView>
      | internal.Stream,
  ): Promise<{ path: string; extension: string; size: number }> {
    try {
      const fileExtension = path.extname(filePath);
      const dirPath = path.dirname(filePath);
      const resultPath = path.join(
        appRootPath.path,
        'storage',
        dirPath,
        `${uuid.v4()}${fileExtension}`,
      );

      if (!fs.existsSync(path.join(appRootPath.path, 'storage', dirPath))) {
        fs.mkdirSync(path.join(appRootPath.path, 'storage', dirPath), {
          recursive: true,
        });
      }

      await fs.promises.writeFile(resultPath, buffer);

      return {
        path: path
          .join('storage', dirPath, `${uuid.v4()}${fileExtension}`)
          .replace('\\', '/'),
        extension: fileExtension,
        size: 0, // TODO: get file size (not implemented due to how api consumed)
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteFile(filepath: string): Promise<{
    path: string;
    extension: string;
    size: number;
  }> {
    try {
      await fs.promises.rm(filepath);
      return {
        path: filepath,
        extension: path.extname(filepath),
        size: 0, // TODO: get file size (not implemented due to how api consumed)
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
