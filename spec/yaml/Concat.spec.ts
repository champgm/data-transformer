import 'jest';

import { concat, Concatenation } from '../../src/yaml/Concat';
import { CustomType } from '../../src/yaml/CustomTypes';
import { Reference } from '../../src/yaml/Reference';

describe('Concat', () => {
  let cat;
  beforeEach(() => {
    cat = [];
  });
  describe('concat', () => {
    it('should be of kind sequence', async () => {
      expect(concat.kind).toEqual('sequence');
    });
    it('should construct a Concat with given cat', async () => {
      const catConstruct = concat.construct(cat);
      expect(catConstruct.type).toEqual(CustomType.Concatenation);
    });
    it('should return representation unchanged', async () => {
      expect((concat.represent as (data: object) => any)(cat)).toBe(cat);
    });
    it('should contain an instance of Concatenation', async () => {
      expect(concat.instanceOf).toBe(Concatenation);
    });
    describe('resolve', () => {
      it('should return false if the given cat is not an array', async () => {
        expect(concat.resolve(undefined)).toBeFalsy();
      });
      it('should return false if any item in the array is not a string or Reference', async () => {
        expect(concat.resolve(['one', 2])).toBeFalsy();
      });
      it('should return true for strings', async () => {
        expect(concat.resolve(['one', 'two'])).toBeTruthy();
      });
      it('should return true for References', async () => {
        expect(concat.resolve([new Reference('one'), new Reference('two')])).toBeTruthy();
      });
      it('should return true for strings and References', async () => {
        expect(concat.resolve(['one', new Reference('two')])).toBeTruthy();
      });
    });
  });
  describe('Concatenation', () => {
    it('should properly concatenate a string array', async () => {
      const concatenation = new Concatenation(['one', 'two', 'three']);
      expect(concatenation.toString(undefined)).toEqual('onetwothree');
    });
    it('should properly concatenate a string and reference array', async () => {
      const concatenation = new Concatenation(['one', new Reference('two'), 'three']);
      const datum = { two: 2 };
      expect(concatenation.toString(datum)).toEqual('one2three');
    });
  });
});
