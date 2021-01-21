export function lYearDays(y: number): number;

export function leapMonth(y: number): number;

export function leapDays(y: number): 30 | 29 | 0;

export function monthDays(y: number, m: number): 30 | 29 | -1;

export function solarDays(y: number, m: number): number;

export function toGanZhiYear(lYear: number): string;

export function toAstro(cMonth: number, cDay: number): string;

export function toGanZhi(offset: number): string;

export function getTerm(y: number, n: number): number;

export function toChinaMonth(m: number): string | -1;

export function toChinaDay(d: number): string;

export function getAnimal(y: number): string;

export function solar2lunar(): Calendar;
export function solar2lunar(y: number, m: number, d: number): -1 | Calendar;

export function lunar2solar(): Calendar;
export function lunar2solar(y: number, m: number, d: number, isLeapMonth?: boolean): -1 | Calendar;

export interface Calendar {
    Animal: string;
    IDayCn: string;
    IMonthCn: string;
    Term: string;
    astro: string;
    cDay: number;
    cMonth: number;
    cYear: number;
    gzDay: string;
    gzMonth: string;
    gzYear: string;
    isLeap: boolean;
    isTerm: boolean;
    isToday: boolean;
    lDay: number;
    lMonth: number;
    lYear: number;
    nWeek: number;
    ncWeek: string;
    date: string;
    lunarDate: string;
    festival: string | null;
    lunarFestival: string | null;
}
