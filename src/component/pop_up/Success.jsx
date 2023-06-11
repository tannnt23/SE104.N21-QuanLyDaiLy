import React, { useState, useEffect} from 'react';

const Success = (prop) => {
  const [showError, setShowError] = useState(false);

  useEffect(()=>{
    setShowError(prop.show)
  },[prop])

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      {showError && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg">
            <p>Success</p>
            <button
              className="mt-4 bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
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

export default Success;
