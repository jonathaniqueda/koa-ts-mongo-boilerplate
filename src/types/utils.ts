interface IDBBaseId {
    _id: string;
}

interface IDBBaseDates {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface IDBBaseAttributes extends IDBBaseId, IDBBaseDates {}
