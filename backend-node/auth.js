const { PublicClientApplication, InteractionType } = require('@azure/msal-browser');

const msalConfig = {
  auth: {
    clientId: '7fb35931-0ac2-4634-815b-e7ceafdb7f2b',
    authority: 'https://login.microsoftonline.com/531c66bb-f691-4bdf-86e6-73393bf0c3bb', // Remplacez par l'ID de votre locataire
    redirectUri: 'http://localhost:7000',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

// Fonction pour obtenir ou rafraîchir le token d'accès
const getAccessToken = async () => {
  try {
    const tokenRequest = {
      scopes: ['Calendars.ReadWrite', 'offline_access', 'User.Read'],
    };

    // Essayez d'obtenir le token d'accès sans interaction de l'utilisateur
    const response = await msalInstance.acquireTokenSilent(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error('Erreur lors de l\'obtention du token d\'accès :', error);

    // Si l'obtention du token d'accès silencieux échoue, effectuez une authentification interactive
    try {
        
      const loginRequest = {
        scopes: ['Calendars.ReadWrite', 'offline_access', 'User.Read'],
      };
      const authResult = await msalInstance.loginPopup(loginRequest);
      return authResult.accessToken;
    } catch (error) {
      console.error('Erreur de connexion :', error);
      throw new Error('Impossible d\'obtenir un token d\'accès valide.');
    }
  }
};

module.exports = { getAccessToken };
