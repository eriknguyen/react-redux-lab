import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox', () => {

  let component;

  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('has a correct className', () => {
    expect(component).to.have.class('comment-box');
  });
  
  it('has a textarea', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  // a nested `describe` block for testing about text input
  describe('Entering some texts', () => {

    // use this to simulate the situation before ruuning the test cases
    beforeEach(() => {
      component.find('textarea').simulate('change', 'new comment');
    });
    it('shows text that is entered', () => {
      expect(component.find('textarea')).to.have.value('new comment');
    });
    it('clears the input when submitted', () => {
      component.simulate('submit');
      expect(component.find('textarea')).to.have.value('');
    });
  })

});