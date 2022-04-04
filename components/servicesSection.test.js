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
        expect(isValidService({ icon: 'a' })).toBeFalsy();
    })
    test('per mazas (2)', () => {
        expect(isValidService({ icon: 'a', title: 'b' })).toBeFalsy();
    })
    test('per didelis (4)', () => {
        expect(isValidService({ icon: 'a', title: 'b', description: 'c', d: 4 })).toBeFalsy();
    })
    test('per didelis (5)', () => {
        expect(isValidService({ icon: 'a', title: 'b', description: 'c', d: 4, e: 5 })).toBeFalsy();
    })
    test('tinkamas dydis (3)', () => {
        expect(isValidService({ icon: 'a', title: 'b', description: 'c' })).toBeTruthy();
    })
})

describe('Service icon', () => {
    test('ne string', () => {
        expect(isValidService({
            icon: 1,
            title: 'Title',
            description: 'Description',
        })).toBeFalsy();
    })
    test('ne tuscias string', () => {
        expect(isValidService({
            icon: '',
            title: 'Title',
            description: 'Description',
        })).toBeFalsy();
    })
    test('per ilgas string', () => {
        expect(isValidService({
            icon: 'a'.repeat(21),
            title: 'Title',
            description: 'Description',
        })).toBeFalsy();
    })
    test('maksimalaus ilgio string', () => {
        expect(isValidService({
            icon: 'a'.repeat(20),
            title: 'Title',
            description: 'Description',
        })).toBeTruthy();
    })
})

describe('Service title', () => {
    test('ne string', () => {
        expect(isValidService({
            icon: 'globe',
            title: 1,
            description: 'Description',
        })).toBeFalsy();
    })
    test('ne tuscias string', () => {
        expect(isValidService({
            icon: 'globe',
            title: '',
            description: 'Description',
        })).toBeFalsy();
    })
    test('per ilgas string', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'a'.repeat(31),
            description: 'Description',
        })).toBeFalsy();
    })
    test('maksimalaus ilgio string', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'a'.repeat(30),
            description: 'Description',
        })).toBeTruthy();
    })
})

describe('Service description', () => {
    test('ne string', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'Title',
            description: 1,
        })).toBeFalsy();
    })
    test('ne tuscias string', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'Title',
            description: '',
        })).toBeFalsy();
    })
    test('per ilgas string', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'Title',
            description: 'a'.repeat(101),
        })).toBeFalsy();
    })
    test('maksimalaus ilgio string', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'Title',
            description: 'a'.repeat(100),
        })).toBeTruthy();
    })
})

describe('Service objektas su pertekline informacija', () => {
    test('extra - per daug', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'Title',
            description: 'Description',
            extra: true,
        })).toBeFalsy();
    })
    test('extra - per mazai', () => {
        expect(isValidService({
            icon: 'globe',
            extra: true,
        })).toBeFalsy();
    })
    test('extra - tinkamas kiekis', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'Title',
            extra: true,
        })).toBeFalsy();
    })
    test('dubliuojasi key-value', () => {
        expect(isValidService({
            icon: 'globe',
            title: 'Title',
            description: 'Description',
            description: 'Description 2',
        })).toBeTruthy();
    })
})