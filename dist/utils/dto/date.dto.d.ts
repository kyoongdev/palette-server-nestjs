export interface DateDTOProps {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export declare class DateDTO {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    constructor(props?: DateDTOProps);
}
