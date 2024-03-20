import * as crypto from "crypto"

export const generateRandomAlphaNumericString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    while (result.length < length) {
        // 랜덤 바이트 생성
        const randomBytes = crypto.randomBytes(length);
        for (let i = 0; i < randomBytes.length && result.length < length; i++) {
            // characters 범위 내에서 랜덤 위치 선택
            const randomIndex = randomBytes[i] % charactersLength;
            result += characters.charAt(randomIndex);
        }
    }

    return result;
}

export const generateRandomAlphabeticString = (length: number) => {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;

    while (result.length < length) {
        // 랜덤 바이트 생성
        const randomBytes = crypto.randomBytes(length);
        for (let i = 0; i < randomBytes.length && result.length < length; i++) {
            // characters 범위 내에서 랜덤 위치 선택
            const randomIndex = randomBytes[i] % charactersLength;
            result += characters.charAt(randomIndex);
        }
    }

    return result;
}