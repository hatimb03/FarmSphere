/* eslint-disable react/prop-types */
const FeatureContainer = ({ heading, image, description }) => {
  return (
    <div className=''>
      <div className='container w-full shadow-lg bg-green-200 rounded-xl overflow-hidden'>
        <img src={image} className=' w-full h-52 object-cover mb-1'></img>
        <h4 className='p-2 text-xl  mb-6'>{heading}</h4>
        <p className='p-2 pb-4 text-sm text-gray-600'>{description}</p>
      </div>
    </div>
  );
};

export default FeatureContainer;
