import React from "react"
import { shallow } from "enzyme"
import Elephant from "./index"

test("renders without crashing", () => {
  shallow(<Elephant />)
})
