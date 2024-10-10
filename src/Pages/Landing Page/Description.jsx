import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Description = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userCords, setUserCords] = useState({
    lat: null,
    long: null,
  });

  const navigate = useNavigate();

  const getUserLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (success) => {
        setUserCords({
          lat: success.coords.latitude,
          long: success.coords.longitude,
        });
        console.log(success);
        setLoading(false);
        navigate("/map", {
          state: {
            lat: success.coords.latitude,
            long: success.coords.longitude,
          },
        });
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <div className='bg-green-100 lg:px-60 px-16 lg:py-32 py-16 flex flex-col gap-10 justify-center items-center w-full'>
        <h4 className='lg:text-4xl text-2xl font-bold text-green-800 text-center  w-full'>
          Smart Farming Starts Here!
        </h4>
        <div className=''>
          <div className=''>
            <p className='text-gray-600 text-sm md:text-base text-center'>
              Our web application harnesses satellite data to provide farmers
              with valuable insights for their agricultural practices. By
              entering your location, you can access a customized map displaying
              relevant environmental information for your area. The integrated
              chatbot offers quick answers to your farming questions, helping
              you make informed decisions about your crops and land management.
              Simple, practical, and designed to support farmers in their
              day-to-day operations.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            getUserLocation();
          }}
          className='btn btn-wide bg-transparent text-green-800 hover:bg-green-800 hover:text-white outline-0 hover:border-none'
        >
          {loading ? (
            <span className='loading loading-spinner loading-md'></span>
          ) : (
            "Get Started"
          )}
        </button>
        {error && (
          <p className='text-red-600 -mb-4'>
            *{error}, We need to access your location to give accurate
            information{" "}
          </p>
        )}
        <p></p>
      </div>
    </>
  );
};

export default Description;
