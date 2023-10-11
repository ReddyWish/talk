import React from 'react';

function AboutPage(props) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">About ITalk Blog</h1>
      <p className="text-gray-600">
        ITalk Blog is a platform created for IT professionals, enthusiasts, and anyone interested in the world of technology. Our mission is to provide a space for like-minded individuals to connect, share experiences, and explore a wide range of IT-related topics.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Vision</h2>
      <p className="text-gray-600">
        At ITalk Blog, we believe in the power of knowledge sharing. We aim to create a community where IT professionals can exchange ideas, learn from each other, and stay updated with the latest trends and technologies.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">What You Can Do</h2>
      <p className="text-gray-600">
        As a registered user, you can enjoy extended functionality on ITalk Blog. Here's what you can do:
      </p>
      <ul className="list-disc pl-8 text-gray-600">
        <li>Save your favorite authors</li>
        <li>Bookmark your favorite posts</li>
        <li>Participate in discussions and leave comments</li>
        <li>Customize your profile and connect with others in the IT community</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Join ITalk Blog Today</h2>
      <p className="text-gray-600">
        To access all these features and more, we invite you to register and become a part of our growing community. Let's embark on this IT journey together!
      </p>
    </div>
  );
}

export default AboutPage;