import { BrowserRouter,Routes,Route } from "react-router-dom"
import Test from "./pages/Test"
import TopUsers from "./pages/Topusers"
import Feed from "./pages/Feed"
import TrendingPosts from "./pages/TrendingPosts"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/topusers"  element={<TopUsers />}/>
        <Route path="/feed"  element={<Feed />}/>
        <Route path="/trendingposts"  element={<TrendingPosts />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
