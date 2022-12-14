import { reducer, initialState } from './shared.reducer';

describe('Shared Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous store', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
