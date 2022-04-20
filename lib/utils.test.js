import { utils } from "./utils.js";

describe('utils.parseCookies()', () => {
    test('undefined', () => {
        const rez = utils.parseCookies();
        expect(rez).toStrictEqual({});
    });

    test('undefined', () => {
        const rez = utils.parseCookies(undefined);
        expect(rez).toStrictEqual({});
    });

    test('null', () => {
        const rez = utils.parseCookies(null);
        expect(rez).toStrictEqual({});
    });

    test('empty string', () => {
        const rez = utils.parseCookies('');
        expect(rez).toStrictEqual({});
    });

    test('vienas cookie', () => {
        const rez = utils.parseCookies('a=aaa');
        expect(rez).toStrictEqual({
            a: 'aaa'
        });
    });

    test('vienas cookie, bet su tuscia value', () => {
        const rez = utils.parseCookies('a=');
        expect(rez).toStrictEqual({
            a: ''
        });
    });

    test('keletas cookie', () => {
        const rez = utils.parseCookies('a=aaa; b=bbb; c=ccc');
        expect(rez).toStrictEqual({
            a: 'aaa',
            b: 'bbb',
            c: 'ccc'
        });
    });

    test('keletas cookie, bet formatavimas blogas (nera tarpo su kabletaskio)', () => {
        const rez = utils.parseCookies('a=aaa; b=bbb;c=ccc');
        expect(rez).toStrictEqual({
            a: 'aaa',
            b: 'bbb',
            c: 'ccc'
        });
    });
})