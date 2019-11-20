import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Vendors from "./Vendors";

configure({ adapter: new Adapter() });

const callApi = () => new Promise(() => {});

describe("Vendors component", () => {
  it("renders without crashing", () => {
    shallow(<Vendors callApi={callApi} />);
  });
});