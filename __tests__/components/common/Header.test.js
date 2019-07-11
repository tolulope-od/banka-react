import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../../../src/components/common/Header';

describe('<Header />', () => {
  it('Renders the Header component', () => {
    const wrapper = shallow(<Header />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
