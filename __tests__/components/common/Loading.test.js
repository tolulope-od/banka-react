import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from '../../../src/components/common/Loading';

describe('<Loading />', () => {
  it('Renders the Loading component', () => {
    const wrapper = shallow(<Loading />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
