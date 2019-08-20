import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PrivateRoute } from '../../../src/components/auth/PrivateRoute';
import Card from '../../../src/components/common/Card';

const shallowSetup = () => {
  const props = {
    component: <Card cardContent={{}} />,
    auth: {
      isAuthenticated: true
    },
    render: () => ({})
  };

  const enzymeWrapper = shallow(<PrivateRoute {...props} />);

  return { props, enzymeWrapper };
};

describe('<PrivateRoute /> Component', () => {
  const { props } = shallowSetup();

  it('renders the private route component', () => {
    const wrapper = shallow(<PrivateRoute {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders a component that requires authentication', () => {
    const wrapper = shallow(<PrivateRoute {...props} />);
    expect(wrapper.find('Route').length).toEqual(1);
  });
});
