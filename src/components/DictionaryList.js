// DictionaryList.tsx
import React, { useEffect, useState } from "react";
import { useDictionary } from "../hooks/useDictionary"; // Import your existing hook

const DictionaryList = () => {
  const dictionary = useDictionary();
  const [visibleWords, setVisibleWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Function to load more words
  const loadMoreWords = () => {
    setLoading(true);

    // Simulate fetching words (replace this with your actual fetching logic)
    setTimeout(() => {
      const startIndex = (currentPage - 1) * 100;
      const endIndex = startIndex + 100;
      const newWords = dictionary.slice(startIndex, endIndex);

      setVisibleWords((prevWords) => [...prevWords, ...newWords]);
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(false);
      // Check if there are more words to load
      if (endIndex >= dictionary.length) {
        setHasMore(false);
      }
    }, 1000); // Simulating delay for fetching data
  };

  // Load more words when the component mounts
  useEffect(() => {
    loadMoreWords();
  }, [dictionary]);

  // Load more words when the user scrolls to the bottom
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreWords();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore, dictionary]);

  return (
    <div>
      <ul>
        {visibleWords.map((word, index) => (
          <li
            style={{
              listStyle: "none",
              backgroundColor: "#666",
              margin: 5,
              padding: 10,
            }}
            key={index}
          >
            {word}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default DictionaryList;
