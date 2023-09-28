
import React from 'react';

const MicrosoftLoginButton = () => {
  const handleMicrosoftLogin = () => {
    // Redirigez l'utilisateur vers l'URL Microsoft pour l'authentification
    window.location.href = 'https://login.microsoftonline.com/531c66bb-f691-4bdf-86e6-73393bf0c3bb/oauth2/v2.0/authorize?client_id=7fb35931-0ac2-4634-815b-e7ceafdb7f2b&response_type=code&redirect_uri=http://localhost:7000&response_mode=query&scope=offline_access%20user.read%20mail.read&state=12345&prompt=consent';
  };

  return (
    <div>
      <button onClick={handleMicrosoftLogin}>Se connecter à Microsoft</button>
    </div>
  );
};

export default MicrosoftLoginButton;
