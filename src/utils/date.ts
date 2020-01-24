import * as moment from 'moment-timezone';

const BRAZIL_TIMEZONE = 'America/Sao_Paulo';

export const startDayInBrazil = (date: Date | string): Date => {
    return moment.tz(date, BRAZIL_TIMEZONE).startOf('d').toDate();
};

export const formatInBrazil = (date: Date | string, format?: string | 'YYYY-MM'): string => {
    return moment.tz(date, BRAZIL_TIMEZONE).format(format);
};

export const formatYearAndMonth = (date: Date | string): string => {
    return moment.tz(date, BRAZIL_TIMEZONE).format('YYYY-MM');
};

export const formatYearAndMonthInPortuguese = (date: Date | string): string => {
    const momentDate = moment.tz(date, BRAZIL_TIMEZONE);
    const year = momentDate.year();
    const month = mapMonthToPortuguese(momentDate.month());
    return `${month} de ${year}`;
};

const mapMonthToPortuguese = (month: number) => {
    switch (month) {
        case 0:
            return 'Janeiro';
        case 1:
            return 'Fevereiro';
        case 2:
            return 'Março';
        case 3:
            return 'Abril';
        case 4:
            return 'Maio';
        case 5:
            return 'Junho';
        case 6:
            return 'Julho';
        case 7:
            return 'Agosto';
        case 8:
            return 'Setembro';
        case 9:
            return 'Outubro';
        case 10:
            return 'Novembro';
        case 11:
        default:
            return 'Dezembro';
    }
};
