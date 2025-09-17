import React, { useState, useEffect } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [stars, setStar] = useState("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(NoImageSelected);
    const [thumbnail, setThumbnail] = useState(null);
    const [existingBooks, setExistingBooks] = useState([]);

    // Fetch existing books on component mount
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/books");
                const books = await response.json();
                setExistingBooks(books);
            } catch (error) {
                console.error("Failed to fetch existing books:", error);
            }
        };

        fetchBooks();
    }, []);

    const createBook = async (e) => {
        e.preventDefault();

        // Check if a book with the same title already exists
        const isBookPresent = existingBooks.some(
            (book) => book.title.toLowerCase() === title.toLowerCase()
        );

        if (isBookPresent) {
            alert("A book with this title already exists!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("stars", stars);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("thumbnail", thumbnail);

        try {
            const response = await fetch("http://localhost:8000/api/books", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                setTitle("");
                setSlug("");
                setStar("");
                setDescription("");
                setCategory("");
                setThumbnail(null);
                setSubmitted(true);
                console.log("Book added successfully!");

                // Update the existing books state
                const newBook = await response.json();
                setExistingBooks([...existingBooks, newBook]);
            } else {
                console.log("Failed to submit data");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <div>
            <h1>Create Book</h1>
            {/* <p>This is where we use Node.js, Express & MongoDB to grab some data.</p> */}

            {submitted ? (
                <p>Data submitted successfully!</p>
            ) : (
                <form className="bookdetails" onSubmit={createBook}>
                    <div className="col-1">
                        <label>Upload Thumbnail</label>
                        <img src={image} alt="preview image" />
                        <input
                            type="file"
                            accept="image/gif, image/jpeg, image/png"
                            onChange={onImageChange}
                        />
                    </div>
                    <div className="col-2">
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Stars</label>
                            <input
                                type="text"
                                value={stars}
                                onChange={(e) => setStar(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                rows="4"
                                cols="50"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <select value={category} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
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
                        <input type="submit" value="Add Book" />
                    </div>
                </form>
            )}
        </div>
    );
}

export default CreateBook;
