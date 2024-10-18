import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import EverythingCard from './EverythingCard';
import Loader from "./Loader";

function TopHeadlines() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 6; // Page size set to 6

  useEffect(() => {
    const fetchHeadlines = async () => {
      setIsLoading(true);
      setError(null);
      const categoryParam = params.category ? `&category=${params.category}` : "";
      
      try {
        const response = await fetch(`http://localhost:3000/top-headlines?language=en${categoryParam}&pageSize=${pageSize}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const json = await response.json();
        console.log("Fetched data:", json.data.articles); // Log the fetched articles

        if (json.success) {
          // Only take the first 6 articles
          const articles = json.data.articles.slice(0, pageSize);
          setData(articles);
        } else {
          setError(json.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeadlines();
  }, [params.category]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage} // Ensure this is valid
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p>No articles found for this category or criteria.</p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {/* No pagination since we only fetch 6 articles per category */}
    </>
  );
}

export default TopHeadlines;
