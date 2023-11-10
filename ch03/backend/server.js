import express from "express";

const app = express();

// we can serve static files or data by build-ing react app and placing the dist folder directly in backend, serving them as static in express
// app.use(express.static("dist")); One of doing things but not best practice

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "First Joke",
      content: "First joke goes here",
    },
    {
      id: 2,
      title: "second Joke",
      content: "second joke goes here",
    },
    {
      id: 3,
      title: "Third Joke",
      content: "Third joke goes here",
    },
    {
      id: 4,
      title: "Fourth Joke",
      content: "Fourth joke goes here",
    },
    {
      id: 5,
      title: "Fifth Joke",
      content: "Now it's getting repetitive",
    },
  ];

  res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
