import { generateRandomFileName } from '@/misc'
import { createCanvas, loadImage } from 'canvas';
import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
// import * as sizeOf from 'image-size';
// const sizeOf = require('image-size');

// import sharp from 'sharp';


export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as File | null;

  if (!file) return NextResponse.json({ success: false });

  const savedFilePath = await saveFile(file);
  if (savedFilePath) {
    return NextResponse.json({ success: true, path: savedFilePath });
  } else {
    return NextResponse.json({ success: false, error: 'File processing failed' });
  }
}

// async function resizeImage(buffer: Buffer, width: number): Promise<Buffer> {
//   return sharp(buffer).resize({ width }).toBuffer();
// }

async function saveFile(file: File): Promise<string | null> {
  try {
    const bytes = await file.arrayBuffer();
    // const resizedBuffer = await resizeImage(Buffer.from(bytes), 200);
    const buffer = Buffer.from(bytes);

    // // Get the dimensions of the image
    // const dimensions = sizeOf(bytes);

    // const width = dimensions.width || 200; // Default width if not available
    // const height = dimensions.height || 200; // Default height if not available


    /** start */
    const width = 200;
    const height = 200;
    // Create a new canvas and context
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Load the image from the file buffer
    const image = await loadImage(Buffer.from(bytes));

    // Resize the image on the canvas
    ctx.drawImage(image, 0, 0, width, height);
    /** stop */

    const fileExtension = path.extname(file.name);
    const fileName = generateRandomFileName(fileExtension);
    const relativePath = path.join('public', 'uploads', fileName);
    const distinationPath = path.resolve(process.cwd(), relativePath);

    // Write the resized image to a file
    const out = fs.createWriteStream(distinationPath);
    const stream = canvas.createJPEGStream();

    stream.pipe(out);
    out.on('finish', () => {
      console.log('Resized image saved successfully:', distinationPath);
      // return NextResponse.json({ success: true });
    });

    // await writeFile(distinationPath, resizedBuffer);
    // await writeFile(distinationPath, buffer);
    return relativePath.replace('public', '');
  } catch (error) {
    console.error('Error saving file:', error);
    return null;
  }
}