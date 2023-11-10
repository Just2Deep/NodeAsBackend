import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((res) => setJokes(res.data))
      .catch((err) => console.log(err));
  });

  return (
    <>
      <h1>Full Stack Jokes App</h1>
      <h3>Here are the Jokes</h3>

      <h4>Jokes: {jokes.length}</h4>
      {jokes.map((joke) => (
        <div key={joke.id}>
          <p>Title: {joke.title}</p>
          <h4>{joke.content}</h4>
        </div>
      ))}
    </>
  );
}

export default App;
