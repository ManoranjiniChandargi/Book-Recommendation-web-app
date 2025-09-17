import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Book from "./routes/Book/book";
import SingleBook from "./routes/Book/singleBook";
import CreateBook from "./routes/Book/createBook";
import EditBook from "./routes/Book/editBook";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./routes/Login/LoginPage";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAge, setUserAge] = useState(null); // Track user's age

  const handleLogin = (age) => {
    setIsLoggedIn(true);
    setUserAge(age);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserAge(null);
  };

  return (
    <>
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/books"
            element={<Book userAge={userAge} />} // Pass userAge to Book
          />
          <Route path="/books/:slug" element={<SingleBook />} />
          <Route path="/createbook/" element={<CreateBook />} />
          <Route path="/editbook/:slug" element={<EditBook />} />
          <Route path="/Login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
