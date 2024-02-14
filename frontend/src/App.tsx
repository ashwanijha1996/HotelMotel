import { Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAppContext } from "./contexts/AppContext"
import AddHotel from "./pages/AddHotel"

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <Routes>
      {isLoggedIn && <Route path="/" element={<Layout>
        <p>Home Page</p>
      </Layout>}></Route>}
      <Route path="/register" element={<Layout>
        <Register />
      </Layout>}></Route>
      <Route path="/login" element={<Layout>
        <Login />
      </Layout>}></Route>
      <Route path="*" element={<Layout>
        <Login />
      </Layout>}></Route>
      <Route>
        {isLoggedIn && <Route path="/add-hotel" element={<Layout>
          {<AddHotel />}
        </Layout>}>
        </Route>}
      </Route>
    </Routes>

  )
}

export default App
