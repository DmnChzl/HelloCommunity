import { generateUuid } from './index';

describe('utils', () => {
  it('generateUuid', () => {
    const uuid = generateUuid();
    expect(uuid).toHaveLength(36);
  });
});
