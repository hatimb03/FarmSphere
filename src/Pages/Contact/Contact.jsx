const Contact = () => {
  return (
    <>
      <div className='bg-green-100 text-green-800 pt-20 text-center pb-20 min-h-[87vh] flex flex-col items-center justify-center'>
        <h2 className='text-center text-3xl mb-8'>Contact Form</h2>
        <form className='mx-auto px-10 w-full sm:w-1/3 md:1/3 lg:1/4 flex flex-col gap-3'>
          <label className='input input-bordered border-green-800 outline-1  flex items-center gap-2 bg-green-100 focus:outline-green-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
              <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
            </svg>
            <input type='text' className='grow' placeholder='Email' />
          </label>

          <label className='input input-bordered border-green-800 flex items-center gap-2 bg-green-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
            </svg>
            <input type='text' className='grow' placeholder='Name' />
          </label>
          <textarea
            className='textarea textarea-bordered border-green-800 w-full bg-green-100 resize-none'
            placeholder='Message ... '
          ></textarea>
          <button className='btn btn-wide w-full bg-transparent border-green-800 outline-none  text-green-800 hover:text-white hover:bg-green-800'>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
