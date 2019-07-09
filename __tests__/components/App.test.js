import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

describe('Main App Component', () => {
  it('Renders without craching', () => {
    shallow(<App />);
  });
});
