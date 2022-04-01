import { isValidService } from './servicesSection.js';

describe('Service yra objektas', () => {
    test('nera parametro', () => {
        expect(isValidService()).toBeFalsy();
    })
    test('duotas number', () => {
        expect(isValidService(451)).toBeFalsy();
    })
    test('duotas empty string', () => {
        expect(isValidService('')).toBeFalsy();
    })
    test('duotas non-empty string', () => {
        expect(isValidService('asd')).toBeFalsy();
    })
    test('duotas array', () => {
        expect(isValidService([])).toBeFalsy();
    })
    test('duotas null', () => {
        expect(isValidService(null)).toBeFalsy();
    })
})

describe('Service objekto dydis', () => {
    test('per mazas (0)', () => {
        expect(isValidService({})).toBeFalsy();
    })
    test('per mazas (1)', () => {
        expect(isValidService({ a: 1 })).toBeFalsy();
    })
    test('per mazas (2)', () => {
        expect(isValidService({ a: 1, b: 2 })).toBeFalsy();
    })
    test('per didelis (4)', () => {
        expect(isValidService({ a: 1, b: 2, c: 3, d: 4 })).toBeFalsy();
    })
    test('per didelis (5)', () => {
        expect(isValidService({ a: 1, b: 2, c: 3, d: 4, e: 5 })).toBeFalsy();
    })
    test('tinkamas dydis (3)', () => {
        expect(isValidService({ a: 1, b: 2, c: 3 })).toBeTruthy();
    })
})