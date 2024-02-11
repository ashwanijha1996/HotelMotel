import { Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>
        <p>Home Page</p>
      </Layout>}></Route>
      <Route path="/register" element={<Layout>
        <Register/>
      </Layout>}></Route>
      <Route path="/login" element={<Layout>
        <Login/>
      </Layout>}></Route>
    </Routes>
  )
}

export default App
