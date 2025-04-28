import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/layout/Navbar";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthProvider from "../context/AuthProvider";
import PrivateRoute from "../components/routing/PrivateRoute";
import AboutPage from "../pages/AboutPage";
import PostsPage from "../pages/PostsPage";
import PostPage from "../pages/PostPage";
import CreatePostPage from "../pages/CreatePostPage";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="/create-post" element={<CreatePostPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}
