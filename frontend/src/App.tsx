import { Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>
        <p>Home Page</p>
      </Layout>}></Route>
      {/* <Route path="/" element={<Layout />}></Route> */}
    </Routes>
  )
}

export default App
