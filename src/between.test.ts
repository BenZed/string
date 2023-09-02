import between from './between'
import { it, expect } from '@jest/globals'

//// Tests ////

const str = '{one}, (two), [three], |four|, <!--five-->, <SIX/>'

it('returns the content between and open and closing delimiter', () => {
    expect(between(str, '[', ']')).toBe('three')
})

it('close delimiter is same as open delimiter if not provided', () => {
    expect(between(str, '|')).toBe('four')
})

it('handles long delimiters', () => {
    expect(between(str, '<!--', '-->')).toBe('five')
})

it('returns " if open delimiter can\'t be found', () => {
    expect(between(str, '#')).toBe('')
})

it('returns "" if close delimiter can\'t be found', () => {
    expect(between(str, '<', '!>')).toBe('')
})

it('throws if delimiters are empty strings', () => {
    expect(() => between(str, '')).toThrow('delimiters must not be empty')
    expect(() => between(str, '<', '')).toThrow('delimiters must not be empty')
})
