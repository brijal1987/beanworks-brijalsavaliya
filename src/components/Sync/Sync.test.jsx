import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import Sync from './Sync';
import copy from '../../copy';

configure({adapter: new Adapter()});

const callApi = () => new Promise(() => {});

describe('Sync component', () => {
  it('renders without crashing', () => {
    shallow(<Sync callApi={callApi} />);
  });
});
describe('Test Sync Button component', () => {
  it('Test click event', () => {
    const wrapper = mount(<Sync callApi={callApi} copy={copy} />);
    wrapper.setState({ defaultloadLogs: true, isLoadingSyncData:false });
    expect(wrapper.find('button.syncBtn').length).toBe(1);
    wrapper.find('button.syncBtn').simulate('click');
  });
});
