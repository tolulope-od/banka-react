import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from '../../../src/components/common/Card';

const shallowSetup = () => {
  const props = {
    cardContent: {}
  };

  const enzymeWrapper = shallow(<Card {...props} />);

  return { props, enzymeWrapper };
};

describe('<Card /> Component', () => {
  const { props } = shallowSetup();

  it('Renders the Card component', () => {
    const wrapper = shallow(<Card {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
