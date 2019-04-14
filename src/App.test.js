import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./components/navbar";
import App from "./App";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

let state = {
  counters: [
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 }
  ]
};

describe("<App /> component unit tests", () => {
  let component;

  beforeEach(() => {
    component = shallow(<App Counters={state.counters} />);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should render 1 <App /> component", () => {
    expect(component).toHaveLength(1);
  });

  it("should have the correct number of Counters", () => {
    expect(component.instance().props.Counters).toHaveLength(4);
  });

  it("should render the Navbar component", () => {
    expect(component.find(NavBar)).toHaveLength(1);
  });

  it("should render the Counters component", () => {
    //console.log(component.instance().props);
    expect(component.instance().props.Counters.length).toBe(4);
  });

  it("should increment counters", () => {
    expect(component.state().counters[0].id).toEqual(1);
    expect(component.state().counters[0].value).toEqual(0);
    const counter = component.state().counters[0];

    component.instance().handleIncrement(counter);

    expect(component.state().counters[0].id).toEqual(1);
    expect(component.state().counters[0].value).toEqual(1);
  });

  it("should delete counters", () => {
    const counterId = component.state().counters[0].id;
    component.instance().handleDelete(counterId); // counter Id = 1

    // counter1 should have been removed from the state
    expect(component.state().counters.length).toBe(3);
    expect(component.state().counters[0].id).toEqual(2);
    expect(component.state().counters[0].value).toEqual(0);
  });

  it("should delete counters", () => {
    const counter = component.state().counters[3];

    component.instance().handleIncrement(counter);
    expect(component.state().counters[3].value).toEqual(1);

    component.instance().handleReset();
    expect(component.state().counters[3].value).toEqual(0);
  });
});
