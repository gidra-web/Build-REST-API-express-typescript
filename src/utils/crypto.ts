import { generateKeyPair } from 'crypto';

export default function generate(){
    generateKeyPair('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: 'top secret123'
        }
    }, (err, publicKey, privateKey) => {
        return {publicKey, privateKey}
    })    
}
