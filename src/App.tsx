import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BikeSharingData() {
  const [bikesData, setBikesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikeData = async () => {
      try {
        const response = await axios.get('https://api.citybik.es/v2/networks/toronto');
        setBikesData(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bike data:', error);
      }
    };

    fetchBikeData();

    // Cleanup function to avoid memory leaks
    return () => {
      // Cleanup code if needed
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Bike Sharing Data for Toronto, Ontario</h2>
          <p>City: {bikesData?.network?.location?.city}</p>
          <p>Country: {bikesData?.network?.location?.country}</p>
          <p>Total Stations: {bikesData?.network?.stations?.length}</p>
          {/* Render more data as needed */}
        </div>
      )}
    </div>
  );
}

export default BikeSharingData;

