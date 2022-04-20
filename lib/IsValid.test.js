import { IsValid } from "./IsValid.js";

describe('IsValid.username()', () => {
    describe('Netinkamo tipo parametrai', () => {
        test('nera params', () => {
            const [err, msg] = IsValid.username();
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamo tipo "username" reiksme');
        });
        test('netinkamo tipo params', () => {
            const [err, msg] = IsValid.username(512);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamo tipo "username" reiksme');
        });
    })

    // describe('Tinkamo tipo parametrai', () => {
    //     test('tuscias tekstas', () => {
    //         expect(IsValid.username('')).toBe('Pamirsai irasyti slapyvardi');
    //     });
    //     test('per trumpas', () => {
    //         expect(IsValid.username('As')).toBe('Per trumpas slapyvardis');
    //     });
    //     test('per ilgas', () => {
    //         expect(IsValid.username('Asdrsthjhgfdearsgtrhr')).toBe('Per ilgas slapyvardis');
    //     });
    //     test('neleistinas simbolis (tarpas)', () => {
    //         expect(IsValid.username('John Doe')).toBe('Slapyvardyje yra neleistinas simbolis ( )');
    //     });
    //     test('geras username', () => {
    //         expect(IsValid.username('John')).toBe(true);
    //     });
    // })
})

describe('IsValid.email()', () => {
    describe('Netinkamo tipo parametrai', () => {
        test('nera params', () => {
            const [err, msg] = IsValid.email();
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamo tipo "email" reiksme');
        });
        test('netinkamo tipo params', () => {
            const [err, msg] = IsValid.email(512);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamo tipo "email" reiksme');
        });
    })

    //     describe('Tinkamo tipo parametrai', () => {
    //         test('validus email', () => {
    //             expect(IsValid.email('vardenis.pavardenis@pastas.com')).toBe(true);
    //         });
    //     })
})

describe('IsValid.password()', () => {
    describe('Netinkamo tipo parametrai', () => {
        test('nera params', () => {
            const [err, msg] = IsValid.password();
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamo tipo "password" reiksme');
        });
        test('netinkamo tipo params', () => {
            const [err, msg] = IsValid.password(512);
            expect(err).toBe(true);
            expect(msg).toBe('Netinkamo tipo "password" reiksme');
        });
    })

    // describe('Tinkamo tipo parametrai', () => {
    //     test('tuscias tekstas', () => {
    //         expect(IsValid.password('')).toBe('Pamirsai irasyti slaptazodi');
    //     });
    //     test('per trumpas', () => {
    //         expect(IsValid.password('ertrhy')).toBe('Per trumpas slaptazodis');
    //     });
    //     test('validus password', () => {
    //         expect(IsValid.password('frsgtrdyukgu')).toBe(true);
    //     });
    // })
})