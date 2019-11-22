import 'jest';

import { reference, Reference } from '../../src/yaml/Reference';
import { CustomYamlType } from '../../src/yaml/CustomYamlType';

describe('Reference', () => {
  let ref;
  beforeEach(() => {
    ref = 'ref';
  });
  describe('reference', () => {
    it('should be of kind scalar', async () => {
      expect(reference.kind).toEqual('scalar');
    });
    it('should construct a Reference with given ref', async () => {
      const refConstruct = reference.construct(ref);
      expect(refConstruct.type).toEqual(CustomYamlType.Reference);
    });
    it('should return representation unchanged', async () => {
      expect((reference.represent as (data: object) => any)(ref)).toBe(ref);
    });
    it('should contain an instance of Reference', async () => {
      expect(reference.instanceOf).toBe(Reference);
    });
    describe('resolve', () => {
      it('should return false for non-strings', async () => {
        expect(reference.resolve(['one'])).toBeFalsy();
      });
      it('should return true for strings', async () => {
        expect(reference.resolve('one')).toBeTruthy();
      });
    });
  });
  describe('Reference', () => {
    it('should extract references from given ref', async () => {
      const datum = { one: 'two' };
      const ref = 'one';
      const reference = new Reference(ref);
      expect(reference.toString(datum)).toEqual('two');
    });
  });
});
