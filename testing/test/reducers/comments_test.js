import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import { SAVE_COMMENT } from '../../src/actions/types';

describe('Comments Reducer', () => {
  it('handles action with unknown type', () => {
    // expecting what the reducer returns is an Array
    // expect(commentReducer()).to.be.instanceof(Array);

    // `eql()` compares 2 arrays by comparing all the elements
    expect(commentReducer(undefined, {})).to.eql([]);
  });

  it('handles action of type SAVE_COMMENT', () => {
    const action = {
      type: SAVE_COMMENT,
      payload: 'new comment'
    };
    expect(commentReducer([], action)).to.eql(['new comment']);
  });
})
