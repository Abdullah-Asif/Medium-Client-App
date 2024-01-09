
import Header from "./components/common/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./components/blogs/BlogList";
import BlogDetails from "./components/blogs/BlogDetails";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import AuthProvider from "./contexts/authContext";
function App() {
    return(<>
        <Router>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path="/auth/sign-up" Component={SignUp}/>
                    <Route path="/auth/sign-in" Component={SignIn}/>
                    <Route path="/blogs"        Component={BlogList}/>
                    <Route path="/blogs/:id"    Component={BlogDetails}/>
                </Routes>
            </AuthProvider>
        </Router>
    </>);
}
export default App;
