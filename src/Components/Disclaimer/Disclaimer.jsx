import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const Disclaimer = () => {
  const [close, setClose] = useState(false);
  return (
    !close && (
      <div className='disclaimer bg-gray-800 p-4 border border-gray-300 text-sm sm:text-base rounded relative'>
        <IoMdClose
          className='absolute top-2 right-2 hover:text-black cursor-pointer'
          onClick={() => setClose(true)}
        />
        <p>
          <strong>Note:</strong> The map boundaries are based on publicly
          available data and may not reflect the current political realities. We
          strive for accuracy, but please understand that geopolitical
          boundaries can vary based on different sources.
        </p>
      </div>
    )
  );
};

export default Disclaimer;
