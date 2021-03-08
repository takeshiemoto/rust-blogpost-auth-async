/* eslint-disable */
const withNx = require('@nrwl/next/plugins/with-nx');
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withTM = require('next-transpile-modules')([
  '@adobe/react-spectrum',
  '@spectrum-icons/.*',
  '@react-spectrum/.*',
]);

module.exports = withPlugins(
  [withCSS, withTM],
  withNx({
    env: {
      FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      FIREBASE_MESSAGING_SENDER_ID:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    },
  })
);
