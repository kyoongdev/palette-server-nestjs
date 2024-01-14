"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayWithWeek = exports.checkIsAfterDate = exports.checkIsSameDate = exports.getDayBefore = exports.getDayAfter = exports.getWeek = exports.getTimeDiff = exports.getDateDiff = void 0;
const getDateDiff = (dateOne, dateTwo) => {
    const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    return diffDays;
};
exports.getDateDiff = getDateDiff;
const getTimeDiff = (dateOne, dateTwo) => {
    const diff = Math.abs(dateOne.getTime() - dateTwo.getTime());
    const diffDays = Math.floor(diff / (1000 * 3600));
    return diffDays;
};
exports.getTimeDiff = getTimeDiff;
const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
};
exports.getWeek = getWeek;
const getDayAfter = (date, day) => {
    const targetDate = new Date(date.getTime());
    targetDate.setDate(targetDate.getDate() + day);
    return targetDate;
};
exports.getDayAfter = getDayAfter;
const getDayBefore = (date, day) => {
    const targetDate = new Date(date.getTime());
    targetDate.setDate(targetDate.getDate() - day);
    return targetDate;
};
exports.getDayBefore = getDayBefore;
const checkIsSameDate = (firstDate, secondDate) => {
    return (firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate());
};
exports.checkIsSameDate = checkIsSameDate;
const checkIsAfterDate = (firstDate, secondDate, isOnlyMonth = false) => {
    return (firstDate.getFullYear() < secondDate.getFullYear() ||
        (firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() < secondDate.getMonth()) ||
        (!isOnlyMonth &&
            firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getDate() < secondDate.getDate()));
};
exports.checkIsAfterDate = checkIsAfterDate;
const getDayWithWeek = (year, month, week) => {
    if (!year || !month || !week)
        return null;
    const today = new Date(year, month - 1, 1);
    const day = today.getDate() + (week - 1) * 7;
    const target = new Date(today.setDate(day));
    const startDate = new Date(target.setDate(target.getDate() - target.getDay() + 1));
    const endDate = new Date(today.setDate(target.getDate() + 7 - target.getDay()));
    return {
        startDate,
        endDate,
    };
};
exports.getDayWithWeek = getDayWithWeek;
//# sourceMappingURL=date.js.map