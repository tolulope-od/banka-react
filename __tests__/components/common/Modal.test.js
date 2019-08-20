import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Modal from '../../../src/components/common/Modal';

const shallowSetup = () => {
  const props = {
    onClick: () => ({}),
    modalContent: {},
    className: 'modal'
  };

  const enzymeWrapper = shallow(<Modal {...props} />);

  return { props, enzymeWrapper };
};

describe('<Modal /> Component', () => {
  const { props } = shallowSetup();

  it('Renders the Modal component', () => {
    const wrapper = shallow(<Modal {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
