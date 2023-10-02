import React, {useEffect, useState} from 'react';
import API from './api/api';
import './App.css';

import LinkedInIcon from './assets/linkedin_icon.png';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');

  /* Load LinkedIn credentials from dotenv */
  const LINKEDIN_ENV = {
    CLIENT_ID: process.env['REACT_APP_LINKEDIN_CLIENT_ID'],
    SCOPES: process.env['REACT_APP_LINKEDIN_SCOPES'],
    REDIRECT_URI: process.env['REACT_APP_LINKEDIN_REDIRECT_URI'],
  }

  /* Handle the client redirection to LinkedIn authentication portal */
  const onSignInLinkedIn = () => {
    window.location.replace(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_ENV.CLIENT_ID}&scope=${LINKEDIN_ENV.SCOPES}&redirect_uri=${LINKEDIN_ENV.REDIRECT_URI}`);
  }

  /* Check if a Linkedin authorization code is provided */
  const authorizationCode = new URLSearchParams(window.location.search).get('code');
  useEffect(() => {
    if (authorizationCode) {
      // TODO: Send authorization code to server for validity check
      setIsLoading(true);
      API.post('linkedin/auth/login', { authorization_code: authorizationCode })
        .then((res) => {
          const { firstName, lastName, email, profileImageUrl } = res.data || {};
          setUsername(`${firstName} ${lastName}`);
          setProfileImageUrl(profileImageUrl);
          setEmail(email);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [authorizationCode]);

  return (
    <div className="App">

      {isLoading ? (
        <div className="Loading">
          <div className="Progress_Bar">
            <div className="Circle Border">
            </div>
          </div>
          <span>Chargement en cours..</span>
        </div>
      ) :
        email.length > 0 ? ( /* Current identity from LinkedIn */
          <div className="Identity">
            <i>Vous êtes connecté(e) à LinkedIn ✅<br />Voici les informations extraites de votre profil :</i>
            <img src={profileImageUrl} className="Profile_Picture" alt={username} />
            <div className="Text_Data">
              <span className="Username">{username}</span>
              <span>({email})</span>
            </div>
          </div>
        ) : ( /* Sign-in with LinkedIn */
          <div className="Signin_Content">
            <div className="Information">
              <span>Avant toutes choses,<br /><br />Soyez sûre que les variables d'environnement de l'application <i>(fichier <code>.env</code> à la racine du projet)</i>:
              &nbsp;<code>REACT_APP_LINKEDIN_CLIENT_ID</code>, <code>REACT_APP_LINKEDIN_SCOPES</code>,
              &nbsp;ainsi que <code>REACT_APP_LINKEDIN_REDIRECT_URI</code> soient dûement renseignées par les données fournies par&nbsp; 
              <a href="https://www.linkedin.com/developers/apps" target="_blank" rel="noreferrer">LinkedIn Developers</a> pour votre application.
              <br /><br />Il en va de même pour les variables d'environnement de l'API, à savoir : <code>LINKEDIN_API_CLIENT_ID</code>,
              &nbsp;<code>LINKEDIN_API_CLIENT_SECRET</code>,
              &nbsp;ainsi que <code>LINKEDIN_API_REDIRECT_URI</code></span>.
              <br /><br />PS : L'URI de redirection de l'application ainsi que celle de l'API doivent être identiques et préalablement approuvées depuis le panel de votre application LinkedIn. Les scopes renseignés doivent également être autorisés.
            </div>
            <button className="LinkedIn_Button" onClick={onSignInLinkedIn}>
              <img src={LinkedInIcon} alt="Logo LinkedIn" className="LinkedIn_Icon" />
              <span>Se connecter via LinkedIn</span>
            </button>
          </div>
        )}

    </div>
  );
}

export default App;
