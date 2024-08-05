'use client'
import React from 'react'
import thumbnail from '../../public/heroImage.jpg'
import Image from 'next/image'
import { useState } from 'react';
import Test2 from './Test2'
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Company",
    content: "This is an amazing product! It has improved our workflow significantly.",
    image: thumbnail,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO, Another Company",
    content: "We have seen a remarkable increase in productivity thanks to this service.",
    image: thumbnail,
  },
  {
    id: 3,
    name: "Sam Wilson",
    role: "Manager, Some Company",
    content: "Great value for money and excellent customer support.",
    image: thumbnail,
  },
  {
    id: 4,
    name: "Sam Wilson",
    role: "Manager, Some Company",
    content: "Great value for money and excellent customer support.",
    image: thumbnail,
  },
  {
    id: 5,
    name: "Sam Wilson",
    role: "Manager, Some Company",
    content: "Great value for money and excellent customer support.",
    image: thumbnail,
  },
  {
    id: 6,
    name: "Sam Wilson",
    role: "Manager, Some Company",
    content: "Great value for money and excellent customer support.",
    image: thumbnail,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className='h-20 flex items-center justify-center'>
        <h1 className='text-white text-3xl font-bold'>What <span className='text-custom-orange'>People</span> Say <span className='text-custom-orange'>?</span></h1>
      </div>
      <div className="relative w-full max-w-2xl overflow-hidden">
        <div
          className="whitespace-nowrap transition-transform duration-700"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="inline-block w-full p-10"
            >
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Image
                  src={testimonial.image}
                  width={100}
                  height={100}
                  alt={testimonial.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4  border-4 border-custom-orange"
                />
                <p className="text-lg font-semibold text-center text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600 text-center mb-4">{testimonial.role}</p>
                <p className="text-base text-gray-800 text-center">{testimonial.content}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-custom-orange text-white rounded-full hover:bg-slate-600 transition ease-in-out delay-100"
        >
          &lt;
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-custom-orange text-white rounded-full hover:bg-slate-600 transition"
        >
          &gt;
        </button>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full ${index === current ? 'bg-custom-orange' : 'bg-gray-400'
                }`}
            />
          ))}
        </div>
      </div>
    </div>

  );
};

export default Testimonials;
