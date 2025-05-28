import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly key: Promise<Buffer>;

  constructor() {
    const secret = process.env.ENCRYPTION_SECRET || 'your-secret-key';
    this.key = (promisify(scrypt))(secret, 'salt', 32) as Promise<Buffer>;
  }

  async encrypt(text: string): Promise<string> {
    const iv = randomBytes(16);
    const key = await this.key;
    const cipher = createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  async decrypt(text: string): Promise<string> {
    const [ivHex, encryptedHex] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const key = await this.key;
    const decipher = createDecipheriv(this.algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString();
  }
}
