import React from "react";
import ReactDOM from "react-dom";
import Counter from "./counter";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const props = {
  counter: {
    id: 1,
    value: 0
  }
};

describe("--- Counter component unit tests ---", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Counter {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders 1 <Counter /> component", () => {
    const component = shallow(<Counter {...props} />);
    expect(component).toHaveLength(1);
  });

  it("renders props correctly", () => {
    const component = shallow(<Counter {...props} />);
    expect(component.instance().props.counter.value).toBe(0);
    expect(component.instance().props.counter.id).toBe(1);
  });

  it("span count should change based on zero and nonezero values", () => {
    const component = shallow(<Counter {...props} />);

    expect(component.find("span").text()).toEqual("Zero");
    component.setProps({
      counter: {
        value: 1
      }
    });
    expect(component.find("span").text()).toEqual("1");
  });

  it("handleIncrement should be called when increment button is clicked", () => {
    const mockFn = jest.fn();
    const component = shallow(<Counter onIncrement={mockFn} {...props} />);
    const incrementBtn = component.find("button").first();
    incrementBtn.simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("handleDelete should be called when delete button is clicked", () => {
    const mockFn = jest.fn();
    const component = shallow(<Counter onDelete={mockFn} {...props} />);
    const deleteBtn = component.find("button").last();
    deleteBtn.simulate("click");
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("each <Counter /> component contains two buttons and a span", () => {
    const component = shallow(<Counter {...props} />);
    expect(component.find("span")).toHaveLength(1);
    expect(component.find("button")).toHaveLength(2);
  });

  it("verify correct classes applied based on value", () => {
    const component = shallow(<Counter {...props} />);
    expect(component.find("span").hasClass("badge-warning")).toBe(true);
    expect(component.find("span").hasClass("badge-primary")).toBe(false);

    component.setProps({
      counter: {
        value: 1
      }
    });

    expect(component.find("span").hasClass("badge-primary")).toBe(true);
    expect(component.find("span").hasClass("badge-warning")).toBe(false);
  });
});
