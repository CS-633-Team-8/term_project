import Home from "../pages/HomePage"
import FourOhFour from "../pages/FourOhFour"
import FAQ from "../pages/FAQTable"

const home = [
  {
    exact: true,
    path: "/",
    component: Home
  }
]
const table = [
  {
    exact: true,
    path: "/faqs",
    component: FAQ
  }
]

export const pageRoutes = [
  ...home,
  ...table,
  // fallback url in case there are no matches
  {
    component: FourOhFour
  }
]
