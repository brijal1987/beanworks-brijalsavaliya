import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Top from './Top';

configure({adapter: new Adapter()});

describe('Top component', () => {
  it('renders without crashing', () => {
    shallow(<Top />);
  });
});
