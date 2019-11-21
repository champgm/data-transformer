import 'jest';

import { CUSTOM_SCHEMA } from '../../src/yaml';
const explicitDefinitions = (CUSTOM_SCHEMA as any).explicit as { tag: string, kind: string }[];

describe('index', () => {
  it('should provide valid CUSTOM_SCHEMA containing Concat', async () => {
    expect(explicitDefinitions).toEqual(expect.arrayContaining([expect.objectContaining({
      tag: '!Concat',
      kind: 'sequence',
    })]));
  });
  it('should provide valid CUSTOM_SCHEMA containing Reference', async () => {
    expect(explicitDefinitions).toEqual(expect.arrayContaining([expect.objectContaining({
      tag: '!Ref',
      kind: 'scalar',
    })]));
  });
});
