import React, { Component } from 'react'
import LoginOption from '../services/loginMenu';

class Header extends Component {
   render() {
      return (
         <div class="topPage">
            <LoginOption />
         </div>
      )
   }
}
export default Header