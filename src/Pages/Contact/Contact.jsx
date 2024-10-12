import { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:hatim.ba53@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(
      message
    )}%0D%0A%0D%0AFrom: ${email}`;
    window.location.href = mailtoLink;
    setEmail("");
    setName("");
    setMessage("");
  };

  return (
    <div className='bg-green-100 text-green-800 pt-20 text-center pb-20 min-h-[87vh] flex flex-col items-center justify-center'>
      <h2 className='text-center text-3xl mb-8'>Contact Form</h2>
      <form
        className='mx-auto px-10 w-full sm:w-1/3 md:1/3 lg:1/4 flex flex-col gap-3'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          className='input input-bordered border-green-800 flex items-center gap-2 bg-green-100'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          className='input input-bordered border-green-800 flex items-center gap-2 bg-green-100'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className='textarea textarea-bordered border-green-800 w-full bg-green-100 resize-none'
          placeholder='Message ... '
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className='btn btn-wide w-full bg-transparent border-green-800 outline-none text-green-800 hover:text-white hover:bg-green-800'>
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
