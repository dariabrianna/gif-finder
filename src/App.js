import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

function App() {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("candy");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let activeFetch = true;

    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=UbDxfSWi2SibP8C6GSV76SVCqefTCjIj&q=${query}&limit=24&rating=g`
      )
      .then((response) => {
        // handle success
        if (activeFetch) {
          setGifs(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
    return () => {
      activeFetch = false;
    };
  }, [query]);

  function handleQueryChange(searchText) {
    setQuery(searchText);
  }

  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm changeQuery={handleQueryChange} />
        </div>
      </div>
      <div className="main-content">
        {loading ? <p>Loading...</p> : <GifList data={gifs} />}
      </div>
    </div>
  );
}

export default App;
