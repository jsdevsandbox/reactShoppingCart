import React from "react";
import NavBar from "./navbar";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("unit tests for navbar component", () => {
  let component;
  beforeEach(() => {
    component = shallow(<NavBar />);
  });

  it("should render one <NavBar /> component", () => {
    expect(component).toHaveLength(1);
  });

  it("should have one <nav> element", () => {
    expect(component.find("nav")).toHaveLength(1);
  });

  it("<a> element should have correct text", () => {
    expect(component.find("a").text()).toBe("Navbar ");
  });

  it("nav element should have correct classes", () => {
    expect(component.find("nav").hasClass("navbar-light")).toEqual(true);
    expect(component.find("nav").hasClass("bg-light")).toEqual(true);
  });

  it("should have one <span> element", () => {
    expect(component.find("span")).toHaveLength(1);
  });

  it("span element should have correct classes", () => {
    expect(component.find("span").hasClass("badge-pill")).toEqual(true);
    expect(component.find("span").hasClass("badge-secondary")).toEqual(true);
  });

  it("span element should have the correct text", () => {
    component = shallow(<NavBar totalCounters={3} />);
    expect(component.find("span").text()).toBe("3");
    expect(component.find("a").text()).toBe("Navbar 3");

    component.setProps({ totalCounters: 5 });

    expect(component.find("span").text()).toBe("5");
    expect(component.find("a").text()).toBe("Navbar 5");
  });
});
