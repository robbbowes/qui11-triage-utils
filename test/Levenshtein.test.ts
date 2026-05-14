import { describe, it, expect } from "vitest";
import Levenshtein from "../src/util/Levenshtein";

describe('Levenshtein.distance', () => {

    it('returns 0 for identical strings', () => {
        expect(Levenshtein.distance('hello', 'hello')).toBe(0);
    });
    
    it('returns the length of the other string when one is empty', () => {
        expect(Levenshtein.distance('', 'cat')).toBe(3);
        expect(Levenshtein.distance('Stockholm', '')).toBe(9);
    });

    it('counts single substitution as 1', () => {
        expect(Levenshtein.distance('cat', 'cot')).toBe(1);
    })

});