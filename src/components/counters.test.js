import React from "react";
import ReactDom from "react-dom";
import Counters from "./counters";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Counter from "./counter";
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
    onResetButton.simulate("click");
    expect(onReset).toHaveBeenCalled();
  });

  it("should contain the correct classes for onReset", () => {
    expect(component.find("button").hasClass("btn-primary")).toEqual(true);
  });

  it("should have the correct number of counters in props", () => {
    expect(component.instance().props.counters).toHaveLength(2);
  });

  it("should have one reset button", () => {
    expect(component.find("button")).toHaveLength(1);
  });

  it("should have the correct number of Counter components in Counters component", () => {
    expect(component.find(Counter)).toHaveLength(2);
  });

  it("should pass functions through to its Counter children", () => {
    let counter = component.find(Counter).first();
    expect(counter.props().onIncrement).toEqual(onIncrement);
    expect(counter.props().onDelete).toEqual(onDelete);
  });
});
