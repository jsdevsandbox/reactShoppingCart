import React from "react";
import ReactDOM from "react-dom";
import Counter from "./counter";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const state = {
  counter: {
    id: 1,
    value: 0
  }
};

describe("--- Counter component unit tests ---", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Counter {...state} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders 1 <Counter /> component", () => {
    const component = shallow(<Counter {...state} />);
    expect(component).toHaveLength(1);
  });

  it("renders props correctly", () => {
    const component = shallow(<Counter {...state} />);
    expect(component.instance().props.counter.value).toBe(0);
  });
});
