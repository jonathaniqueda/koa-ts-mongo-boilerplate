import { ObjectId } from 'mongodb';

export const createPlainToDbMapper = (keysToMap: string[]) => (obj: { [key: string]: any }): any => {
    if (!obj) {
        return obj;
    }

    const result = keysToMap.reduce((acc, key) => {
        if (obj[key] !== undefined && obj[key] !== null) {
            acc[key] = new ObjectId(obj[key]);
        }
        return acc;
    }, { ...obj });

    return result;
};

export const createDbToPlainMapper = (keysToMap: string[]) => (obj: { [key: string]: any }): any => {
    if (!obj) {
        return obj;
    }

    const result = keysToMap.reduce((acc, key) => {
        if (obj[key] !== undefined && obj[key] !== null) {
            acc[key] = obj[key].toString();
        }
        return acc;
    }, { ...obj });

    return result;
};
