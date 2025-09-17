import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Book = ({ userAge }) => {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const moodToCategory = {
    happy: "Comic",
    emotional: "emotional",
    adventure: "adventure",
    foodie: "food",
    suspense: "thriller",
    "family loving": "family",
    motivational: "biopics",
    knowledge: "science,fiction",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;

        if (userAge < 14) {
          url += `?category=Comic`;
        } else if (selectedMood && moodToCategory[selectedMood]) {
          url += `?category=${moodToCategory[selectedMood]}`;
        } else if (selectedCategory) {
          url += `?category=${selectedCategory}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error fetching data, try later");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, selectedMood, userAge]);

  return (
    <div>
      <style>
        {`
          .book-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
          }

          .add-book-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 15px;
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .add-book-link:hover {
            background-color: #0056b3;
          }

          .filter-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
          }

          .filter-box {
            flex: 1;
            background-color: #f9f9f9;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }

          .filter-label {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
            display: block;
          }

          .select-dropdown {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
          }

          .books {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 200px; /* Added margin to create space */
          }

          .book-item {
            list-style: none;
            text-align: center;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease;
          }

          .book-item:hover {
            transform: translateY(-5px);
          }

          .book-link {
            text-decoration: none;
            color: #333;
          }

          .book-thumbnail {
            max-width: 100%;
            border-radius: 4px;
          }

          .book-title {
            margin-top: 10px;
            font-size: 18px;
            color: #007BFF;
          }
        `}
      </style>
      <div className="book-container">
        <p
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#2C3E50",
            textAlign: "center",
            margin: "40px auto",
            maxWidth: "850px",
            fontFamily: "'Roboto', sans-serif",
            letterSpacing: "0.5px",
            lineHeight: "1.6",
            borderBottom: "3px solid #007BFF",
            paddingBottom: "10px",
          }}
        >
          Connecting Readers with the Stories They Love.
        </p>

        <Link to="/createbook" className="add-book-link">
          + Add New Book
        </Link>

        {userAge >= 14 && (
          <div className="filter-container">
            {/* Category Filter Box (Left) */}
            <div className="filter-box">
              <label htmlFor="categories" className="filter-label">
                Categories
              </label>
              <select
                id="categories"
                className="select-dropdown"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All</option>
                <option value="romance">Romance</option>
                <option value="science">Science</option>
                <option value="crime">Crime</option>
                <option value="food">Food</option>
                <option value="adventure">Adventure</option>
                <option value="thriller">Thriller</option>
                <option value="fiction">Fiction</option>
                <option value="Comic">Comic</option>
                <option value="emotional">Emotional</option>
                <option value="family">Family</option>
                <option value="biopics">Biopics</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Mood Filter Box (Right) */}
            <div className="filter-box">
              <label htmlFor="moods" className="filter-label">
                Moods
              </label>
              <select
                id="moods"
                className="select-dropdown"
                onChange={(e) => setSelectedMood(e.target.value)}
              >
                <option value="">All</option>
                <option value="happy">Happy</option>
                <option value="emotional">Emotional</option>
                <option value="adventure">Adventure</option>
                <option value="foodie">Foodie</option>
                <option value="suspense">Suspense</option>
                <option value="family loving">Family Loving</option>
                <option value="motivational">Motivational</option>
                <option value="knowledge">Knowledge</option>
              </select>
            </div>
          </div>
        )}

        {isLoading ? (
          <p>Loading....</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul className="books">
            {data.map((item) => (
              <li key={item._id} className="book-item">
                <Link to={`/books/${item.slug}`} className="book-link">
                  <img
                    src={`http://localhost:8000/uploads/${item.thumbnail}`}
                    alt={item.title}
                    className="book-thumbnail"
                  />
                  <h3 className="book-title">{item.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Book;
