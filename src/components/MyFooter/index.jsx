import React from 'react';
import { Footer } from 'react-daisyui';

const MyFooter = () => {
  return (
    <Footer className="p-10 bg-neutral text-neutral-content mt-4" center>
      <div>
        <img src="/favicon.png" width={60} />
        <p className="text-2xl my-3">PuranBoi Inc. Ltd.</p>
        <p>In Your Service since 1994</p>
      </div>

      <div>
        <Footer.Title>Products</Footer.Title>
        <p className="link link-hover">Academic Textbooks</p>
        <p className="link link-hover">Academic Guide Books</p>
        <p className="link link-hover">STEM Books</p>
        <p className="link link-hover">Literature Books</p>
      </div>
      <div>
        <Footer.Title>Company</Footer.Title>
        <p className="link link-hover">About Us</p>
        <p className="link link-hover">Contact</p>
        <p className="link link-hover">Career</p>
        <p className="link link-hover">Press</p>
      </div>
      <div>
        <Footer.Title>Legal</Footer.Title>
        <p className="link link-hover">Terms of Use</p>
        <p className="link link-hover">Privacy Policy</p>
        <p className="link link-hover">Cookie Policy</p>
      </div>
    </Footer>
  );
};

export default MyFooter;
