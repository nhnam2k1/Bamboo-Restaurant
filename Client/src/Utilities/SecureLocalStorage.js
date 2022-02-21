import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';

/**
 * This part using crypting library which thinking
 * how to optimizing the speed by using multi-thread
 */

ls.config.encrypt = false;
ls.config.secret = "Bamboo-restaurant";

ls.config.encrypter = (data, secret) => {
    let json = JSON.stringify(data);
    return AES.encrypt(json, secret).toString();
}
 
ls.config.decrypter = (data, secret) => {
    try {
        let decryptObj = AES.decrypt(data, secret);
        return JSON.parse(decryptObj.toString(encUTF8));
    } 
    catch (e) {
        return data;
    }
};

export default ls;
// https://digitalfortress.tech/js/encrypt-localstorage-data/