import React from "react";
import ReactDom from "react-dom";
import Counters from "./counters";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

let onIncrement = jest.fn();
let onDelete = jest.fn();
let onReset = jest.fn();
let counters = [{ id: 1, value: 0 }, { id: 2, value: 0 }];

describe("unit tests for the Counters component", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Counters
        onIncrement={onIncrement}
        onDelete={onDelete}
        onReset={onReset}
        counters={counters}
      />
    );
  });

  it("should render 1 <Counters /> component", () => {
    expect(component).toHaveLength(1);
  });

  it("should call onReset callback when onReset button is clicked", () => {
    let onResetButton = component.find("button");
    // console.log(onResetButton.text());
    onResetButton.simulate("click");
    expect(onReset).toHaveBeenCalled();
  });

  it("should contain the correct classes for onReset", () => {
    expect(component.find("button").hasClass("btn-primary")).toEqual(true);
  });
});
