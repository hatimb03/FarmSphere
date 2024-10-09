import FeatureContainer from "./FeatureContainer";
import features from "../../data/features";

const Features = () => {
  return (
    <>
      <div className='bg-green-800 text-black py-10 px-12 font-bold'>
        <h4 className='text-center text-3xl mb-10 text-white'>Features</h4>
        <div className=' flex justify-center items-center gap-10 flex-col md:flex-row'>
          {features.map((item, index) => {
            return (
              <FeatureContainer
                key={index}
                image={item.image}
                heading={item.heading}
                description={item.description}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Features;
