import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <header
      className="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/LgTdtWJ/darshan-gavali-NYsxhg43-Rv-E-unsplash.jpg')",
        height: '450px',
      }}
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      >
        <div className="flex justify-center items-center h-full">
          <div className="text-white">
            <h2 className="text-6xl mb-4 font-black">PuranBoi</h2>
            <h4 className="text-lg mb-6">
              They say, a book is a good friend.
              <br />
              That makes an Old Book <br />a Good Old Friend.
            </h4>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Banner;
