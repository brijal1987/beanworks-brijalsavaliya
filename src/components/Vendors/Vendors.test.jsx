import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Vendors from "./Vendors";
import JestMock from 'jest-mock';

configure({ adapter: new Adapter() });

const callApi = () => new Promise(() => {});
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
]

describe("Vendors component", () => {
  it("renders without crashing", () => {
    shallow(<Vendors callApi={callApi} />);
    expect(vendors.length).toEqual(2)

  });

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
