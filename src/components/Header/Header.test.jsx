import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Header from './Header';

configure({adapter: new Adapter()});

describe('Header component', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });
});
