import { Readable } from 'node:stream';

import { type ExpressFileType } from '~/core/core/domain/types/express-file-type';

export const createMockFile = (
  overrides: Partial<ExpressFileType> = {},
): ExpressFileType => {
  const originalname = overrides.originalname ?? 'default.txt';

  const baseFile: Express.Multer.File = {
    fieldname: 'file',
    originalname,
    encoding: '7bit',
    mimetype: 'text/plain',
    size: 1024,
    buffer: Buffer.from('test content'),
    destination: '/tmp',
    filename: `test-${originalname}`,
    path: `/tmp/test-${originalname}`,
    stream: new Readable({
      read() {
        this.push(Buffer.from('test content'));
        this.push(null);
      },
    }),
  };

  return {
    ...baseFile,
    ...overrides,
  };
};
