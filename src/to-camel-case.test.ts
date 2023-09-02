import toCamelCase from './to-camel-case'
import { it, expect, describe } from '@jest/globals'

describe('camelCases a string', () => {
    const tests = [
        { in: 'whatever', out: 'whatever' },
        { in: 'a', out: 'a' },
        { in: 'ace-of-base', out: 'aceOfBase' },
        { in: 'one-two-three', out: 'oneTwoThree' },
        { in: 'foo--bar', out: 'fooBar' }
    ]

    for (const test of tests) {
        it(`${test.in} => ${test.out}`, () => {
            expect(toCamelCase(test.in)).toBe(test.out)
        })
    }
})

describe('limiter argument', () => {
    describe("changes default limiter (from '-' to ' ' in this case)", () => {
        const tests = [
            { in: 'what  you  lookin  at', out: 'whatYouLookinAt' },
            { in: 'chick and beans baby', out: 'chickAndBeansBaby' },
            { in: 'i am NOT a crook', out: 'iAmNOTACrook' },
            { in: '1234w0p a', out: '1234w0pA' },
            { in: 'muscle-mania', out: 'muscle-mania' }
        ]

        for (const test of tests) {
            it(`${test.in} => ${test.out}`, () => {
                expect(toCamelCase(test.in, ' ')).toBe(test.out)
            })
        }
    })

    describe('can also take a RegExp: /@|-|\\./', () => {
        const tests = [
            { in: 'some-body@gmail.com', out: 'someBodyGmailCom' },
            { in: 'see- @.saw', out: 'see Saw' }
        ]

        for (const test of tests) {
            it(`${test.in} => ${test.out}`, () => {
                expect(toCamelCase(test.in, /@|-|\./)).toBe(test.out)
            })
        }
    })
})

describe('type safety', () => {
    it('returns strongly typed string representation inputs', () => {
        toCamelCase('super man was here') satisfies 'superManWasHere'
    })

    it('string delimiters work', () => {
        toCamelCase('how@are@you', '@') satisfies 'howAreYou'
    })

    it('regexp delimiters do not', () => {
        toCamelCase('what$cash', /$/) satisfies string
    })
})
