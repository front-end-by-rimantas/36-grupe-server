import { IsValid } from "./IsValid.js";

describe('IsValid.username()', () => {
    test('no value', () => {
        const [err, status] = IsValid.username();
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('worng type (number)', () => {
        const [err, status] = IsValid.username(1);
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('worng value (empty string)', () => {
        const [err, status] = IsValid.username('');
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('correct value', () => {
        const [err, status] = IsValid.username('Petras');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('smallest possible', () => {
        const [err, status] = IsValid.username('Jonas');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('biggest possible', () => {
        const [err, status] = IsValid.username('JonasJonasJonas');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('one to small', () => {
        const [err, status] = IsValid.username('Jona');
        expect(err).toBe(true);
        expect(status).toBe('Negali buti maziau nei 5 ir daugiau nei 15 simboliu');
    })
    test('one to big', () => {
        const [err, status] = IsValid.username('JonasJonasJonas4');
        expect(err).toBe(true);
        expect(status).toBe('Negali buti maziau nei 5 ir daugiau nei 15 simboliu');
    })
});

describe('IsValid.email()', () => {
    /*
    For more details: https://en.wikipedia.org/wiki/Email_address
    */
    test('no value', () => {
        const [err, status] = IsValid.email();
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('worng type (number)', () => {
        const [err, status] = IsValid.email(1);
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('worng value (empty string)', () => {
        const [err, status] = IsValid.email('');
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('correct value', () => {
        const [err, status] = IsValid.email('vardenis@pastas.lt');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('smallest possible', () => {
        const [err, status] = IsValid.email('a@a.lt');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('biggest possible', () => {
        const [err, status] = IsValid.email('very-long-firstname-and-lastname@very-long-website-name-for-real-true-story-bro.com.xyz');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('one to small', () => {
        const [err, status] = IsValid.email('a@a.a');
        expect(err).toBe(true);
        expect(status).toBe('Negali buti maziau nei 6 ir daugiau nei 87 simboliu');
    })
    test('one to big (local part)', () => {
        const [err, status] = IsValid.email('very-long-firstname-and-lastname2@very-long-website-name-for-real-true-story-bro.com.xyz');
        expect(err).toBe(true);
        expect(status).toBe('Negali buti maziau nei 6 ir daugiau nei 87 simboliu');
    })
    test('one to big (domain part)', () => {
        const [err, status] = IsValid.email('very-long-firstname-and-lastname@very-long-website-name-for-real-true-story-bro2.com.xyz');
        expect(err).toBe(true);
        expect(status).toBe('Negali buti maziau nei 6 ir daugiau nei 87 simboliu');
    })
    // test('no @ symbol', () => {
    //     const [err, status] = IsValid.email('usernamemail.com');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Truksta @ simbolio');
    // })
    // test('no local part', () => {
    //     const [err, status] = IsValid.email('@mail.com');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Truksta dalies pries @ simboli');
    // })
    // test('no domain part', () => {
    //     const [err, status] = IsValid.email('username@');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Truksta dalies uz @ simbolio');
    // })
    // test('no space allowed', () => {
    //     const [err, status] = IsValid.email('user name@mail.com');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Tarpas yra negalimas');
    // })
    // test('domain part is not valid website url (1)', () => {
    //     const [err, status] = IsValid.email('username@mailcom');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Dalis uz @ simbolio nera validi tinklalapio nuoroda');
    // })
    // test('domain part is not valid website url (2)', () => {
    //     const [err, status] = IsValid.email('username@.com');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Dalis uz @ simbolio nera validi tinklalapio nuoroda');
    // })
    // test('domain part is not valid website url (3)', () => {
    //     const [err, status] = IsValid.email('username@mail.');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Dalis uz @ simbolio nera validi tinklalapio nuoroda');
    // })
    // test('domain part is not valid website url (4)', () => {
    //     const [err, status] = IsValid.email('username@mail.com.');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Dalis uz @ simbolio nera validi tinklalapio nuoroda');
    // })
    // test('domain part is not valid website url (5)', () => {
    //     const [err, status] = IsValid.email('username@mail.c');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Dalis uz @ simbolio nera validi tinklalapio nuoroda');
    // })
    // test('domain part is not valid website url (6)', () => {
    //     const [err, status] = IsValid.email('user@name@mail.com');
    //     expect(err).toBe(true);
    //     expect(status).toBe('Gali buti tik vienas @ simbolis');
    // })
});

describe('IsValid.password()', () => {
    test('no value', () => {
        const [err, status] = IsValid.password();
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('worng type (number)', () => {
        const [err, status] = IsValid.password(1);
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('worng value (empty string)', () => {
        const [err, status] = IsValid.password('');
        expect(err).toBe(true);
        expect(status).toBe('Turi buti ne tuscias tekstas');
    })
    test('correct value', () => {
        const [err, status] = IsValid.password('PetrasPetrainis123');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('smallest possible', () => {
        const [err, status] = IsValid.password('Jonas123');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('biggest possible', () => {
        const [err, status] = IsValid.password('PetrasPetrainis12345PetrasPetrainis12345PetrasPetrainis12345PetrasPetrainis12345PetrasPetrainis12345');
        expect(err).toBe(false);
        expect(status).toBe('OK');
    })
    test('one to small', () => {
        const [err, status] = IsValid.password('Jonas12');
        expect(err).toBe(true);
        expect(status).toBe('Negali buti maziau nei 8 ir daugiau nei 100 simboliu');
    })
    test('one to big', () => {
        const [err, status] = IsValid.password('PetrasPetrainis12345PetrasPetrainis12345PetrasPetrainis12345PetrasPetrainis12345PetrasPetrainis123456');
        expect(err).toBe(true);
        expect(status).toBe('Negali buti maziau nei 8 ir daugiau nei 100 simboliu');
    })
});