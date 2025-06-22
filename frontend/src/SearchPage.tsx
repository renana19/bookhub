import { useState } from "react";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error during search:", err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>חיפוש</h2>
      <input
        type="text"
        placeholder="מה תרצה לחפש?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "300px", marginRight: "1rem" }}
      />
      <button onClick={handleSearch}>חפש</button>

      {isLoading && <p>טוען תוצאות...</p>}

      {results.length > 0 && (
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <strong>{item.title || item.name}</strong> - {item.type}
            </li>
          ))}
        </ul>
      )}

      {!isLoading && results.length === 0 && query && <p>לא נמצאו תוצאות.</p>}
    </div>
  );
}

export default SearchPage;
