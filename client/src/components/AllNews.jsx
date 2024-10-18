import { React, useState, useEffect } from 'react';
import EverythingCard from './EverythingCard';
import Loader from './Loader';

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 6; // Set page size to 6 for 6 news articles per page

  // Handle previous page button
  function handlePrev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  // Handle next page button
  function handleNext() {
    if (page < 2) { // Limit to 2 pages
      setPage(page + 1);
    }
  }

  useEffect(() => {
    // Fetch news data whenever page changes
    const fetchNews = async () => {
      setIsLoading(true);  // Show loader
      setError(null);      // Reset error state
      try {
        const response = await fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`);

        if (!response.ok) {
          const errorBody = await response.text(); // Capture the response body
          console.error('Error response body:', errorBody); // Log the error body for debugging
          throw new Error('Network response was not ok');
        }

        const myJson = await response.json();

        if (myJson.success) {
          setTotalResults(myJson.data.totalResults);
          setData(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred while fetching news.');
        }
      } catch (error) {
        setError('Failed to fetch news. Please try again later.');
        console.error('Fetch error:', error); // Log the error to help identify issues
      } finally {
        setIsLoading(false); // Hide loader
      }
    };

    fetchNews();
  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
                key={index}
              />
            ))
          ) : (
            <p>No articles found.</p> // Display message when no articles are found
          )
        ) : <Loader />}
      </div>

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button 
            disabled={page <= 1} 
            className='pagination-btn text-center' 
            onClick={handlePrev}
          >
            &larr; Prev
          </button>
          <p className='font-semibold opacity-80'>{page} of {2}</p> {/* Hardcoded to 2 pages */}
          <button 
            className='pagination-btn text-center' 
            disabled={page >= 2} // Limit to 2 pages
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;
