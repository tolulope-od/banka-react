import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { SideNav } from '../../../src/components/common/SideNav';

const shallowSetup = () => {
  const props = {
    auth: {
      isAuthenticated: true,
      user: {
        firstName: 'Obiwan',
        lastName: 'Kenobi',
        type: 'client'
      }
    },
    history: { location: { pathname: '' } }
  };

  const enzymeWrapper = shallow(<SideNav {...props} />);

  return { props, enzymeWrapper };
};

describe('<SideNav', () => {
  const { props } = shallowSetup();
  it('Renders the Header component', () => {
    const wrapper = shallow(<SideNav {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should return an active id on the dashboard icon it is active', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.setProps({
      history: { location: { pathname: 'dashboard' } }
    });
    expect(wrapper.find('#sidelink-active').length).toEqual(1);
  });

  it('Should return an active id on the account icon it is active', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.setProps({
      history: { location: { pathname: 'viewaccounts' } }
    });
    expect(wrapper.find('#sidelink-active').length).toEqual(1);
  });

  it('Should return an active id on the profile icon it is active', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.setProps({
      history: { location: { pathname: 'profile' } }
    });
    expect(wrapper.find('#sidelink-active').length).toEqual(1);
  });

  it('Should render a different element className for an admin user', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.setProps({
      auth: { isAuthenticated: true, user: { type: 'staff' } }
    });
    expect(wrapper.find('.side-nav-greet-admin').length).toEqual(1);
  });

  it('Should return an active id on the user icon it is active', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.setProps({
      auth: { isAuthenticated: true, user: { type: 'staff' } },
      history: { location: { pathname: 'users' } }
    });
    expect(wrapper.find('#sidelink-active').length).toEqual(1);
  });

  it('Should not render a menu when the user is not authenticated', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.setProps({
      auth: { isAuthenticated: false, user: {} },
      history: { location: { pathname: '' } }
    });
    expect(wrapper.find('#sidelink-active').length).toEqual(0);
  });
});
