/*
  PersonService.js

  Client léger pour appeler l'API backend concernant les personnes.
  - getAll(): récupérer toutes les personnes (GET /persons)
  - getPerson(id): récupérer une personne par id (GET /person/{id})
  - createPerson(firstname, lastname): créer une personne (POST /person)
  - editPerson(id, firstname, lastname): modifier une personne (PUT /person/{id})
  - deletePerson(id): supprimer une personne (DELETE /person/{id})

  Ce fichier utilise axios configuré dans `http-common.js` pour gérer l'URL de base
  et les en-têtes JSON.
*/

import http from "../http-common";

// Récupérer toutes les personnes
const getAll = () => {
  return http.get("/persons")
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

// Récupérer une personne par id
const getPerson = (id) => {
  return http.get(`/person/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

// Créer une personne
const createPerson = (firstname, lastname) => {
  return http.post("/person", { firstname, lastname })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

// Supprimer une personne
const deletePerson = (id) => {
  return http.delete(`/person/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

// Modifier une personne
const editPerson = (id, firstname, lastname) => {
  // Backend expects PUT for updating a person (see your Spring controller)
  return http.put(`/person/${id}`, { firstname, lastname })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
};

// Export default
const PersonService = { getAll, getPerson, createPerson, deletePerson, editPerson };

export default PersonService;
