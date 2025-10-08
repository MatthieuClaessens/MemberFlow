/*
  http-common.js

  Configuration axios partagée pour les appels HTTP.
  - Définit `baseURL` (URL du backend) et l'en-tête Content-Type pour JSON.
  - Si le backend change de port, modifiez uniquement `baseURL` ici.
*/

import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "Content-type": "application/json"
  }
});