const Description = () => {
  return (
    <>
      <div className='bg-green-100 lg:px-60 px-16 lg:py-32 py-16 flex flex-col gap-10 justify-center items-center'>
        <h4 className='lg:text-4xl text-2xl font-bold text-green-800 text-center  w-full'>
          Smart Farming Starts Here!
        </h4>
        <div className=''>
          <div className=''>
            <p className='text-gray-600 text-sm md:text-base'>
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
        <button className='btn btn-wide bg-transparent text-green-800 hover:bg-green-800 hover:text-white outline-0 hover:border-none'>
          Get Started
        </button>
      </div>
    </>
  );
};

export default Description;
