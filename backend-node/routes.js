const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const { getAccessToken } = require('./auth'); // Importez la fonction getAccessToken depuis auth.js

const app = express();
const port = 7000;

// Configurations pour votre application
const clientId = '7fb35931-0ac2-4634-815b-e7ceafdb7f2b';
const clientSecret = 'O5h8Q~bVWwvY4KzgHfips.Kg_IkSW6veW3bgxc.e';
const redirectUri = 'http://localhost:7000'; // L'URL de redirection que vous avez configurée dans Azure AD
const scope = ['Calendars.ReadWrite', 'offline_access', 'User.Read']; // Les autorisations que votre application demande

// Route pour l'URL d'authentification Microsoft
app.get('/auth', (req, res) => {
    const authUrl = `https://login.microsoftonline.com/531c66bb-f691-4bdf-86e6-73393bf0c3bb/oauth2/v2.0/authorize?` +
    `client_id=${clientId}&` +
    `response_type=code&` +
    `redirect_uri=${redirectUri}&` +
    `response_mode=query&` +
    `scope=${encodeURIComponent(scope)}&` +
    `state=12345&` +
    `prompt=consent`;
  res.redirect(authUrl);
});

// Route de redirection après l'authentification Microsoft
app.get('/auth/callback', async (req, res) => {
    
  // Obtenez le token d'accès en utilisant la fonction getAccessToken depuis auth.js
  const accessToken = await getAccessToken();
  
  // Utilisez le token d'accès pour effectuer des appels à Microsoft Graph ou d'autres API protégées
  
  // ...
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
