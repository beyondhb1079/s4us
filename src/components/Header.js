import React, { Component } from 'react'
import LoginMenu from '../components/LoginMenu';

class Header extends Component {
   render() {
      return (
         <div class="header">
            <LoginMenu />
         </div>
      )
   }
}
export default Header