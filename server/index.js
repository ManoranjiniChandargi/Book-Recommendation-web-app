require("dotenv").config();

const cors = require("cors");
const multer = require("multer");

const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Books");
const app = express();

const PORT = process.env.PORT || 8000;

connectDB();

//middleware   //npm run dev to run index.js
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  




// //createing a route
app.get("/api/books", async (req, res) => {
    try {
        const category = req.query.category;
        const filter = {};

        if (category) {
            filter.category = category;
        }





        const data = await Book.find(filter);
        res.json(data);



    } catch (error) {
        res.status(500).json({ error: "An error occured while fetching books." })

    }
});


app.get("/api/books/:slug", async (req, res) => {
    try {
        const slugParam = req.params.slug;
        const data = await Book.find({ slug: slugParam });


        res.json(data);



    } catch (error) {
        res.status(500).json({ error: "An error occured while fetching books." })

    }
});

app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
    try {
        // const { title, slug } = req.body;

        // const thumbnail = req.file.filename;

        const newBook = new Book({
            title: req.body.title,
            slug: req.body.slug,
            stars: req.body.stars,
            description: req.body.description,
            category: req.body.category,
            thumbnail: req.file.filename,
        });

        await newBook.save();
        res.status(201).json({ message: "Book created successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the book" });
    }
});



app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
    try {
  
      const bookId = req.body.bookId;
  
      const updateBook = {
        title: req.body.title,
        slug: req.body.slug,
        stars: req.body.stars,
        description: req.body.description,
        category: req.body.category,
      };
  
      if (req.file) {
        updateBook.thumbnail = req.file.filename;
      }
  
  
      await Book.findByIdAndUpdate(bookId, updateBook);
      res.status(201).json({ message: "Book updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the book" });
    }
  });

  app.delete("/api/books/:id", async (req, res) => {
    const bookId = req.params.id;
  
    try {
      await Book.deleteOne({ _id: bookId });
      res.json("Book deleted!" + req.body.bookId);
    } catch (error) {
      res.json(error);
    }
  
  })
  
  








app.get("/", (req, res) => {
    res.json("Hello there")
});

app.get("*", (req, res) => {
    res.sendStatus(404);
});

app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);

});

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('error', (err) => {
    console.error('Error occurred:', err);
});

