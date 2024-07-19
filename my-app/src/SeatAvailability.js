import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeatAvailability.css'; // Import your CSS file for styling

const SeatAvailability = () => {
  const [colleges, setColleges] = useState([]);
  const [currentCollegeIndex, setCurrentCollegeIndex] = useState(0);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/seat-availability/');
      setColleges(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set interval to fetch data every 10 seconds
    const fetchDataInterval = setInterval(fetchData, 10000);

    return () => clearInterval(fetchDataInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (colleges.length === 0) return;

      if (currentBranchIndex >= colleges[currentCollegeIndex].branches.length) {
        setCurrentCollegeIndex((currentCollegeIndex + 1) % colleges.length);
        setCurrentBranchIndex(0);
      } else {
        setCurrentBranchIndex(currentBranchIndex + 1);
      }
    }, 3000); // Display each department for 3 seconds

    return () => clearInterval(interval);
  }, [currentCollegeIndex, currentBranchIndex, colleges]);

  const currentCollege = colleges[currentCollegeIndex];
  const currentBranch = currentCollege?.branches[currentBranchIndex];

  // Function to split categories into chunks of 8 for display
  const chunkCategories = (categories) => {
    const chunkedArray = [];
    for (let i = 0; i < categories.length; i += 8) {
      chunkedArray.push(categories.slice(i, i + 8));
    }
    return chunkedArray;
  };

  return (
    <div className="seat-availability-container">
      {currentCollege && (
        <div className="college-section">
          <h2 className="college-name">{currentCollege.college}</h2>
          <div className="branch-section">
            {currentBranch && (
              <>
                <h3>{currentBranch.name}</h3>
                {currentBranch.categories.length === 0 ? (
                  <div className="no-seats-available">
                    <p>No seats available</p>
                  </div>
                ) : (
                  <div className="category-tables">
                    {chunkCategories(currentBranch.categories).map((categoryChunk, chunkIndex) => (
                      <div key={chunkIndex} className="category-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Category</th>
                              <th>Vacancy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryChunk.map((category, index) => (
                              <tr  key={index}>
                                <td className="category-name">{category.name}</td>
                                <td className={`availability ${getColorClass(category.availability)}`}>
                                  {category.availability === '.' ? 'No seats available' : category.availability}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <div className="disclaimer">
        Please note: Seat availability may change. Final vacancy status will be confirmed at the admission desk.
      </div>
    </div>
  );
};

// Function to determine color based on availability
const getColorClass = (availability) => {
  const value = parseInt(availability);
  if (isNaN(value)) return ''; // Handle cases where availability is not a number

  if (value === 0) {
    return 'red';
  } else if (value === 1) {
    return 'orange';
  } else if (value === 2) {
    return 'yellow';
  } else {
    return 'green';
  }
};

export default SeatAvailability;
