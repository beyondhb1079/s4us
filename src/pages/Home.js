import React, { Component } from 'react';
import ReactTypingEffect from 'react-typing-effect';

import Header from '../components/Header';
import Footer from '../components/Footer';

class Home extends Component {
   render() {
      return (
         <div>
            <Header />
            <h4>Hi there,</h4>
            <h1>Welcome to DreamerScholars</h1>
            <p></p>
            <ReactTypingEffect className="typingeffect"
               text={['Our web-app purpose is guide you towards finding the right scholarship for you :]',
                  'Simply sign in with your Google account to have access to our entire scholarship database.'
               ]}
               speed={70} eraseDelay={550} />
            <Footer />
         </div>
      )
   }
}

export default Home