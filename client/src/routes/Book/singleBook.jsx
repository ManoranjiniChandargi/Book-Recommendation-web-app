import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function SingleBook() {
  const [data, setData] = useState([]);
  const { slug } = useParams();

  const baseUrl = `http://localhost:8000/api/books/${slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  function StarRating({ numberOfStars }) {
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return <div>Rating: {stars}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link
        to="/books"
        style={{
          fontSize: "18px", // Consistent font size for neatness
          fontWeight: "600", // Slightly bold for emphasis
          color: "#000080", // Navy blue for text
          textDecoration: "none", // Remove underline for a clean look
          padding: "12px 30px", // Padding for a rectangular shape
          borderRadius: "5px", // Slightly rounded corners for modern appeal
          backgroundColor: "#E6F4FF", // Light blue background to match the theme
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          display: "inline-block", // Keep the link inline
          marginBottom: "20px", // Space below for alignment
          textAlign: "center", // Center the text inside the button
          letterSpacing: "0.5px", // Refined letter spacing
          transition: "all 0.3s ease", // Smooth transition for interactivity
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#B3E0FF"; // Slightly darker blue on hover
          e.target.style.transform = "scale(1.05)"; // Slight zoom effect on hover
          e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)"; // Enhance shadow on hover
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#E6F4FF"; // Return to light blue on mouse leave
          e.target.style.transform = "scale(1)"; // Reset the zoom effect
          e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)"; // Reset shadow
        }}
        onMouseDown={(e) => e.target.style.transform = "scale(0.98)"} // Subtle click effect
        onMouseUp={(e) => e.target.style.transform = "scale(1)"} // Reset after click
      >
        Books
      </Link>



      {data.map((element) => (
        <div className="bookdetails" key={element._id} style={{ marginBottom: "40px" }}>
          <div className="col-1" style={{ textAlign: "center" }}>
            <img
              src={`http://localhost:8000/uploads/${element.thumbnail}`}
              alt={element.title}
              style={{
                width: "100%", // Adjust size of the image as needed
                maxWidth: "400px", // Optional max width
                marginBottom: "20px", // Added space below the image
              }}
            />
            <br />
            <Link
              to={`/editbook/${element.slug}`}
              style={{
                fontSize: "18px", // Consistent font size
                fontWeight: "600", // Slightly bold for prominence
                color: "#000080", // Navy blue for text
                textDecoration: "none",
                padding: "12px 30px", // More padding for a rectangular button-like appearance
                borderRadius: "5px", // Slightly rounded corners for a modern, sleek feel
                backgroundColor: "#E3F2FD", // Light sky-blue background
                display: "inline-block",
                marginTop: "20px", // Space above the "Edit" link
                transition: "all 0.3s ease", // Smooth transition for hover effects
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                letterSpacing: "0.5px", // Refined letter spacing
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#81D4FA"; // Darker blue on hover
                e.target.style.transform = "scale(1.05)"; // Slight zoom effect on hover
                e.target.style.boxShadow = "0px 6px 10px rgba(0, 0, 0, 0.15)"; // Enhance shadow on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#E3F2FD"; // Return to original light blue
                e.target.style.transform = "scale(1)"; // Reset zoom effect
                e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)"; // Reset shadow
              }}
              onMouseDown={(e) => e.target.style.transform = "scale(0.98)"} // Click effect
              onMouseUp={(e) => e.target.style.transform = "scale(1)"}
            >
              Edit
            </Link>



          </div>

          <div className="col-2">
            <h1>{element.title}</h1>
            <p>{element.description}</p>
            <StarRating numberOfStars={element.stars} />
            <p>Category</p>
            <ul>
              {element.category.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SingleBook;
