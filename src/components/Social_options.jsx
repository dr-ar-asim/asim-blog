'use client'

import React, { useEffect, useState } from 'react';

export default function SocialOptions({ selectedValues, setSelectedValues }) {

  useEffect(() => {
    // Load selected values from local storage on component mount
    const savedValues = localStorage.getItem('selectedValues');
    if (savedValues) {
      setSelectedValues(JSON.parse(savedValues));
    }
  }, [setSelectedValues]);

  useEffect(() => {
    // Save selected values to local storage whenever they change
    localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
  }, [selectedValues]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValues(prevValues =>
      prevValues.includes(value)
        ? prevValues.filter(val => val !== value)
        : [...prevValues, value]
    );
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Select Social Media Options</h2>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            value="facebook"
            checked={selectedValues.includes("facebook")}
            onChange={handleChange}
            className="mr-2"
          />
          Facebook
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="instagram"
            checked={selectedValues.includes("instagram")}
            onChange={handleChange}
            className="mr-2"
          />
          Instagram
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="tiktok"
            checked={selectedValues.includes("tiktok")}
            onChange={handleChange}
            className="mr-2"
          />
          TikTok
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            value="youtube"
            checked={selectedValues.includes("youtube")}
            onChange={handleChange}
            className="mr-2"
          />
          YouTube
        </label>
      </div>
    </div>
  );
}
