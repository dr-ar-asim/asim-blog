// components/TestimonialCard.js

import Image from 'next/image';
import profilePic from '../../public/hero_section_img.png'; // Ensure you have the image in the public folder
import Link from 'next/link';

const TestimonialCard = () => {
  return (
    <div className="bg-purple-200 p-8 rounded-lg shadow-lg max-w-lg mx-auto relative">
      <div className="absolute top-0 left-0 bg-purple-900 text-white px-4 py-2 rounded-tr-lg">
        <h3 className="text-sm font-bold">MIKE WIGGER</h3>
        <p className="text-xs">review</p>
        <div className="flex mt-1">
          <span className="text-yellow-500">★★★★★</span>
        </div>
      </div>
      <div className="flex items-center mt-16">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image src={profilePic} alt="Profile Picture" width={80} height={80} />
        </div>
        <div className="ml-4">
          <h3 className="text-purple-900 font-bold text-lg">JOHNNA HANCOCK-BLAKE</h3>
          <p className="text-purple-700">REALTOR</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          Being a high-strung person, I have to admit Johnna immediately picked up on my personality type and provided me a Client Experience tailored to me and my expectations. She is very good at what she does.
        </p>
      </div>
      <div className="mt-4 flex items-center">
        <Link href="/posts" legacyBehavior>
          <a className="bg-purple-900 text-white px-4 py-2 rounded-lg">
            Read More
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TestimonialCard;
