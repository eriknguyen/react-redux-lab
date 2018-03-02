import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
  let component;

  beforeEach(() => {
    const props = {
      comments: ['test comment', 'new comment']
    };
    // the `props` here serves as the initial values for the component and be used as the application state
    // so it is passed in the param `state` in `renderComponent(ComponentClass, props, state)` function
    component = renderComponent(CommentList, null, props);
  });

  it('shows an li for each comment', () => {
    expect(component.find('li').length).to.equal(2);
  });

  it('shows each comment that was provided', () => {
    expect(component).to.contain('test comment');
    expect(component).to.contain('new comment');
  });
});