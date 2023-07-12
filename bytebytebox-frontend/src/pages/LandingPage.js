import React from 'react';
import Header from '../components/header';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div>
      <Header />

      <main>
        <h2>Welcome to ByteByteBox!</h2>
        <p>Store and share your files securely.</p>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} ByteByteBox. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
