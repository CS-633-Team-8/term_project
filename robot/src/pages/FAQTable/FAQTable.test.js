import React from "react"
import { shallow } from "enzyme"
import AddFAQForm from "./AddFAQForm"
import AddFAQMessage from "./AddFAQMessage"

test("FAQ Form renders without crashing", () => {
  shallow(<AddFAQForm />)
})

test("FAQ Message renders without crashing", () => {
  shallow(<AddFAQMessage />)
})
