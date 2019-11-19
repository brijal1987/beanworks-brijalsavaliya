import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Accounts from './Accounts';
import JestMock from 'jest-mock';

configure({adapter: new Adapter()});

const callApi = () => new Promise(() => {});
const accounts = [
  {
    AccountID: 1,
    Code: '1',
    Status: "Active",
  },
  {
    AccountID: 2,
    Code: '1',
    Status: "Active",
  },
]
describe('Accounts component', () => {
  it('renders without crashing', () => {
    shallow(<Accounts callApi={callApi} />);
    expect(accounts.length).toEqual(2)

  });
  [3].forEach(accountCount =>
    it(`should tess account models count === received accounts count (${accountCount})`, async () => {
        const aResp = accountsResponse(accountCount);
        const getAccountsMock = JestMock.fn(() => Promise.resolve(aResp));

        expect(getAccountsMock.mock.calls.length).toBe(0);
        expect(accountCount).toBe(aResp.Accounts.length);
  }));
});

function accountsResponse(count) {
  const response = {
      Accounts: []
  };

  for (let i = 0; i < count; i++) {
      response.Accounts.push({
          AccountID: i.toString(),
          Name: 'Account ' + i,
          Code: '222',
          Status: 'ACTIVE',
          UpdatedDateUTC: '/Date(32323232323+0000)/'
      });
  }

  return response;
}

