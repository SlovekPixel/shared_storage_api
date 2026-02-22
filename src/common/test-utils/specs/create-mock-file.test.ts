import { createMockFile } from '~/common/test-utils/create-mock-file';
import { describe, expect, it } from 'vitest';

describe('createMockFile', () => {
  it('Должен создавать базовый mock файл с обязательным originalname', () => {
    const newOriginalName = 'test.txt';

    const standardFile = createMockFile();
    const file = createMockFile({ originalname: newOriginalName });

    expect(file.originalname).toBe(newOriginalName);
    expect(file.fieldname).toBe(standardFile.fieldname);
    expect(file.mimetype).toBe(standardFile.mimetype);
    expect(file.size).toBe(standardFile.size);
    expect(file.filename).toBe(`test-${newOriginalName}`);
    expect(Buffer.isBuffer(file.buffer)).toBe(true);
  });

  it('Должен переопределять переданные свойства', () => {
    const customBuffer = Buffer.from('кастомный контент');

    const newFile = {
      originalname: 'image.jpg',
      mimetype: 'image/jpeg',
      size: 2048,
      buffer: customBuffer,
      fieldname: 'avatar',
      encoding: 'utf8',
      destination: '/uploads',
      filename: 'custom-name.csv',
      path: '/uploads/custom-name.csv',
    };

    const file = createMockFile(newFile);

    expect(file.originalname).toBe(newFile.originalname);
    expect(file.mimetype).toBe(newFile.mimetype);
    expect(file.size).toBe(newFile.size);
    expect(file.buffer).toBe(customBuffer);
    expect(file.fieldname).toBe(newFile.fieldname);
    expect(file.encoding).toBe(newFile.encoding);
    expect(file.destination).toBe(newFile.destination);
    expect(file.filename).toBe(newFile.filename);
    expect(file.path).toBe(newFile.path);
  });

  it('Должен иметь работоспособный stream', () => {
    const file = createMockFile({ originalname: 'stream.txt' });

    expect(file.stream).toBeDefined();
    expect(typeof file.stream.read).toBe('function');
  });

  it('Должен генерировать правильный filename и path на основе originalname', () => {
    const file = createMockFile({ originalname: 'document.pdf' });

    expect(file.filename).toBe('test-document.pdf');
    expect(file.path).toBe('/tmp/test-document.pdf');
  });
});
