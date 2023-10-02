import React, {useEffect} from 'react';
import API from './api/api';
import './App.css';

import LinkedInIcon from './assets/linkedin_icon.png';

function App() {
  /* Load LinkedIn credentials from dotenv */
  const LINKEDIN_ENV = {
    CLIENT_ID: process.env['REACT_APP_LINKEDIN_CLIENT_ID'],
    SCOPES: process.env['REACT_APP_LINKEDIN_SCOPES'],
    REDIRECT_URI: process.env['REACT_APP_LINKEDIN_REDIRECT_URI'],
  }

  /* Handle the client redirection to LinkedIn authentication portal */
  const onSignInLinkedIn = () => {
    window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_ENV.CLIENT_ID}&scope=${LINKEDIN_ENV.SCOPES}&redirect_uri=${LINKEDIN_ENV.REDIRECT_URI}`, '_blank');
  }

  /* Check if a Linkedin authorization code is provided */
  const authorizationCode = new URLSearchParams(window.location.search).get('code');
  useEffect(() => {
    if (authorizationCode) {
      // TODO: Send authorization code to server for validity check
    }
  }, [authorizationCode]);

  return (
    <div className="App">

      {/* Sign-in with LinkedIn - Button */}
      <button className="LinkedIn_Button" onClick={onSignInLinkedIn}>
        <img src={LinkedInIcon} alt="Logo LinkedIn" className="LinkedIn_Icon" />
        <span>Se connecter via LinkedIn</span>
      </button>

    </div>
  );
}

export default App;
