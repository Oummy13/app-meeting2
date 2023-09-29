const axios = require('axios');
require('dotenv').config();

const graphApiUrl = 'https://graph.microsoft.com/v1.0/me/events';

const meetingData = {
  subject: 'Prep for customer meeting',
  body: {
    contentType: 'HTML',
    content: 'Does this time work for you?',
  },
  start: {
    dateTime: '2023-09-30T16:00:00',
    timeZone: 'UTC',
  },
  end: {
    dateTime: '2023-09-30T17:00:00',
    timeZone: 'UTC',
  },
  location: {
    displayName: 'Cordova conference room',
  },
  attendees: [
    {
      emailAddress: {
        address: 'alahsi@la-pmn.org',
        name: 'Asma LAHSI',
      },
      type: 'required',
    },
  ],
  allowNewTimeProposals: true,
  isOnlineMeeting: true,
  onlineMeetingProvider: 'teamsForBusiness',
};


const accessToken = process.env.ACCESS_TOKEN; // Use the ACCESS_TOKEN environment variable

axios
  .post(graphApiUrl, meetingData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    if (response.data.onlineMeeting) {
      const meetingLink = response.data.onlineMeeting.joinUrl;
      console.log('Lien de la réunion:', meetingLink);

    } else {
      console.error('La réponse ne contient pas de lien de réunion.');
    }
  })
  .catch((error) => {
    console.error('Erreur lors de la création de la réunion:', error.response.data);
  });
