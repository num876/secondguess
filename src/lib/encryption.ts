import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

// Fallback key for development - In production, this MUST be in .env.local
const ENCRYPTION_SECRET = process.env.INTEGRATION_ENCRYPTION_KEY || 'development-only-fallback-secret-key-32chars';

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);
  
  // Use a secure key derivation function
  const key = crypto.pbkdf2Sync(ENCRYPTION_SECRET, salt, 100000, 32, 'sha256');
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  
  // Return combined buffer as hex string: salt:iv:tag:encrypted
  return `${salt.toString('hex')}:${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(cipherText: string): string {
  const [saltHex, ivHex, tagHex, encryptedHex] = cipherText.split(':');
  
  if (!saltHex || !ivHex || !tagHex || !encryptedHex) {
    throw new Error('Invalid encryption format');
  }
  
  const salt = Buffer.from(saltHex, 'hex');
  const iv = Buffer.from(ivHex, 'hex');
  const tag = Buffer.from(tagHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');
  
  const key = crypto.pbkdf2Sync(ENCRYPTION_SECRET, salt, 100000, 32, 'sha256');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString('utf8');
}
