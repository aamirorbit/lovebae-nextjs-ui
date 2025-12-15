'use client';

import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I love to use this app with my partner! We save our memories there and I like to view them on the map. The questions are also interesting, we find more subjects to talk about. Overall, great app, I recommend it!",
      name: "Sarah & Mike",
      location: "New York, USA",
      avatar: "👩‍❤️‍👨"
    },
    {
      quote: "One of the best couples apps I have ever used! The daily questions are fun and engaging and let me discover unknown things about my partner every day. The app is a must-have, me and my partner are loving it!",
      name: "Alex & Jordan",
      location: "London, UK",
      avatar: "💑"
    },
    {
      quote: "The little widget on the lockscreen is amazing. It lets us know how long we have been together. I've been using this app for a year, it memorizes every place we've lived together and every precious moment of our life as a couple.",
      name: "Léa & Thomas",
      location: "Paris, France",
      avatar: "👫"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What our users are saying
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy couples who are strengthening their relationships with Lovebae
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-2xl p-8 relative"
            >
              {/* Quote mark */}
              <div className="text-red-200 text-6xl font-serif absolute top-4 left-6">"</div>
              
              <div className="pt-8">
                <p className="text-gray-700 mb-6 relative z-10">
                  {testimonial.quote}
                </p>
              
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                </div>
                <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 
