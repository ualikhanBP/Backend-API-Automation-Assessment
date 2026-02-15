import axios from 'axios';
import fs from 'fs';
import sharp from 'sharp';

export async function compareImages(
  expectedImagePath: string,
  imageUrl: string
): Promise<boolean> {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

  const actualBuffer = Buffer.from(response.data);
  const expectedBuffer = fs.readFileSync(expectedImagePath);

  const actual = await sharp(actualBuffer)
    .resize(200, 300)
    .raw()
    .toBuffer();

  const expected = await sharp(expectedBuffer)
    .resize(200, 300)
    .raw()
    .toBuffer();

  return actual.equals(expected);
}
