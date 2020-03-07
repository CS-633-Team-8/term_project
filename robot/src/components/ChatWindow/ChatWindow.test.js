import React from "react"
import { shallow } from "enzyme"
import ChatWindow from "./index"

test("renders without crashing", () => {
  shallow(<ChatWindow />)
})
