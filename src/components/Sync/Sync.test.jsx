import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Sync from './Sync';

configure({adapter: new Adapter()});

const callApi = () => new Promise(() => {});

describe('Sync component', () => {
  it('renders without crashing', () => {
    shallow(<Sync callApi={callApi} />);
  });
});
