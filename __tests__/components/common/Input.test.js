import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Input from '../../../src/components/common/Input';

describe('<Input />', () => {
  it('Renders the Input component', () => {
    const wrapper = shallow(
      <Input
        type="email"
        name="email"
        placeholder="Email"
        id="user-email"
        value="sample@email.com"
        onChange={jest.fn()}
        required={true}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
