
import Header from "./components/common/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./components/blogs/BlogList";
import BlogDetails from "./components/blogs/BlogDetails";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import AuthProvider from "./contexts/authContext";
import {Home} from "./components/common/Home";
import PageNotFound from "./components/common/PageNotFound";
function App() {
    return(<>
        <Router>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/sign-up" Component={SignUp}/>
                    <Route path="/sign-in" Component={SignIn}/>
                    <Route path="/blogs"        Component={BlogList}/>
                    <Route path="/blogs/:id"    Component={BlogDetails}/>
                    <Route path="*"    Component={PageNotFound}/>
                </Routes>
            </AuthProvider>
        </Router>
    </>);
}
export default App;
