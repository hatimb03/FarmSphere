const AiAssistant = () => {
  return (
    <>
      {/* <div className=' text-black bg-white w-full p-2'>
        <h1>AI Assistant</h1>
        <div className='chatbox'></div>
        <div className='form'></div>
      </div> */}
      <div
        tabIndex={0}
        className='collapse collapse-arrow border-base-300 bg-green-100  text-green-800 '
      >
        <div className='collapse-title sm:text-xl text-base font-medium'>
          AI Assistant
        </div>
        <div className='collapse-content'>
          <p>Ai answer here</p>
          <div className='w-full'>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered bg-transparent w-full max-w-xs'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AiAssistant;
