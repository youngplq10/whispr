"use client"

import React, {useEffect, useState} from 'react'

const Loading = () => {
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prevCount => (prevCount + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='center-div' style={{ fontSize: '24px', fontWeight: 'bold' }}>
      <p className='display-1'>Loading{".".repeat(dotCount)}</p>
    </div>
  );
}

export default Loading