import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Accounts from './Accounts';
import JestMock from 'jest-mock';

configure({adapter: new Adapter()});

const callApi = () => new Promise(() => {});

describe('Accounts component', () => {
  it('renders without crashing', () => {
    shallow(<Accounts callApi={callApi} />);
  });
});

