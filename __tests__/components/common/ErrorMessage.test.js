import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorMessage from '../../../src/components/common/ErrorMessage';

const shallowSetup = () => {
  const props = {
    errors: { error: 'Something happend, request not processed' }
  };

  const enzymeWrapper = shallow(<ErrorMessage {...props} />);

  return { props, enzymeWrapper };
};

describe('<ErrorMessage /> Component', () => {
  const { props } = shallowSetup();

  it('Renders the Error Message component', () => {
    const wrapper = shallow(<ErrorMessage {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should return an active id on the dashboard icon it is active', () => {
    const wrapper = shallow(<ErrorMessage {...props} />);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('h3').length).toEqual(1);
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('h3').text()).toEqual('Something happend, request not processed');
  });

  it('renders the default error message when no error message is supplied', () => {
    const wrapper = shallow(<ErrorMessage {...props} />);
    wrapper.setProps({
      errors: {}
    });
    expect(wrapper.find('h3').text()).toEqual('Something Unusual happened');
  });
});
