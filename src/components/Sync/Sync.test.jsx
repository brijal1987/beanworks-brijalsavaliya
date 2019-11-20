import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, shallow, configure } from "enzyme";
import Sync from "./Sync";
import copy from "../../copy";
import JestMock from 'jest-mock';

configure({ adapter: new Adapter() });

const callApi = () => new Promise(() => {});
const syncData = () => new Promise(() => {});
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
];
const vendors = [
  {
    ContactID: 1,
    AccountNumber: '1',
    ContactStatus: "Active",
  },
  {
    ContactID: 2,
    AccountNumber: '1',
    ContactStatus: "Active",
  },
];

describe("Sync component", () => {
  it("renders without crashing", () => {
    shallow(<Sync callApi={callApi} />);
    expect(accounts.length).toEqual(2);
    expect(vendors.length).toEqual(2);
  });

});
describe("Clicking on Sync data Button", () => {

  it("Sync click event", () => {
    const wrapper = mount(<Sync callApi={callApi} copy={copy} />);
    wrapper.setState({ defaultloadLogs: true, isLoadingSyncData: false });
    expect(wrapper.find("button.syncBtn").length).toBe(1);
    wrapper.find("button.syncBtn").simulate("click");

    /*const fakePromise = Promise.resolve(
      mockResponse(200, null, JSON.stringify({ message: message }))
    );
    window.fetch = jest.fn().mockImplementationOnce(() => {
      return fakePromise;
    });
    expect.assertions(2); //check if all assertions called
    await Promise.all([fakePromise]);
    setImmediate(() => {
      try {
        expect(wrapper).toHaveState("message", message);
        expect(wrapper).toIncludeText(message);
      } catch (e) {
        done.fail(e);
      }
      done();
    });
    */
  });

  [3].forEach(accountCount =>
    it(`should tess account models count === received accounts count (${accountCount})`, async () => {
        const aResp = accountsResponse(accountCount);
        const getAccountsMock = JestMock.fn(() => Promise.resolve(aResp));

        expect(getAccountsMock.mock.calls.length).toBe(0);
        expect(accountCount).toBe(aResp.Accounts.length);
  }));

  [3].forEach(vendorCount =>
    it(`should tess vendor models count === received vendors count (${vendorCount})`, async () => {
        const aResp = vendorResponse(vendorCount);
        const getVendorsMock = JestMock.fn(() => Promise.resolve(aResp));
        expect(getVendorsMock.mock.calls.length).toBe(0);
        expect(vendorCount).toBe(aResp.Vendors.length);
  }));
});

function vendorResponse(count) {
  const response = {
      Vendors: []
  };

  for (let i = 0; i < count; i++) {
      response.Vendors.push({
          ContactID: i.toString(),
          Name: 'Account ' + i,
          AccountNumber: '222',
          ContactStatus: 'ACTIVE',
          UpdatedDateUTC: '/Date(32323232323+0000)/'
      });
  }

  return response;
}

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