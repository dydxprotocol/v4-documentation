import React from 'react';

const CustomError: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center', 
      marginTop: '10%', // top margin as a percentage of the viewport height
      marginBottom: '10%', // bottom margin as a percentage of the viewport height
      color: 'white', // sets text color to white
      fontFamily: 'Satoshi, sans-serif', // ensures the Satoshi font is applied
      width: '80%', // sets width to 80% of the viewport width
      marginLeft: 'auto', // centers the div horizontally
      marginRight: 'auto'
    }}>
      <h1 style={{
        fontWeight: 700,
        fontSize: '3rem' // larger font size for the heading
      }}>Page Not Found</h1>
      <p style={{
        fontSize: '1.5rem' // larger font size for the paragraph
      }}>The page you are looking for does not exist. Head back to the <a href="https://docs.dydx.exchange" style={{color: 'lightblue'}}>homepage here</a>.</p>
    </div>
  );
};

export default CustomError;
