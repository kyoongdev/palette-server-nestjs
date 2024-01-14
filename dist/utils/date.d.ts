export declare const getDateDiff: (dateOne: Date, dateTwo: Date) => number;
export declare const getTimeDiff: (dateOne: Date, dateTwo: Date) => number;
export declare const getWeek: (date: Date) => number;
export declare const getDayAfter: (date: Date, day: number) => Date;
export declare const getDayBefore: (date: Date, day: number) => Date;
export declare const checkIsSameDate: (firstDate: Date, secondDate: Date) => boolean;
export declare const checkIsAfterDate: (firstDate: Date, secondDate: Date, isOnlyMonth?: boolean) => boolean;
export declare const getDayWithWeek: (year: number, month: number, week: number) => {
    startDate: Date;
    endDate: Date;
};
