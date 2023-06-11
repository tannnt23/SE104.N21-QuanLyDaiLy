import React, { useState, useEffect } from 'react';

const Error = (prop) => {
  const [showError, setShowError] = useState(false);

  useEffect(()=>{
    setShowError(Boolean(prop.error));
    console.log(Boolean(prop.error))
  },[prop])

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg">
            <p>{prop.error?.message}</p>
            <button
              className="mt-4 bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
              onClick={handleCloseError}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Error;
