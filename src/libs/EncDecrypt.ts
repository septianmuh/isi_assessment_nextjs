import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY || 'wh3n1pieceIsGoingENDopknUyipmsF0';

async function encryptData(data: any): Promise<string> {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(SECRET_KEY), iv);

    const json_data = JSON.stringify(data);
    let encryptedData = cipher.update(json_data, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    const tag = cipher.getAuthTag(); 

    const result = `${encryptedData}:${iv.toString('hex')}:${tag.toString('hex')}`;
    return result;
}

async function decryptData(encryptedString: string): Promise<any> {
    const [encryptedData, ivHex, tagHex] = encryptedString.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    const decipher = createDecipheriv('aes-256-gcm', Buffer.from(SECRET_KEY), iv);
    decipher.setAuthTag(tag);

    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');

    return JSON.parse(decryptedData);
}

export { encryptData, decryptData };
