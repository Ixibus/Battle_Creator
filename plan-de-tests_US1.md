US01 - Création de compte

1. Périmètre : US1 - Création de compte (Onboarding)
2. Approche : 
    - front-end : 2 tests unitaires, 2 tests intégration et 1 test E2E
    - back-end: 1 test unitaire, 1 test intégration
3. Environnement :
    - React/Typescript - Vitest
    - Java/Spring - JUnit  
4. Cas des tests :
    [FRONT]CAS-US1-03-information-utilisateur_montage-des-éléments-rendered (hook et composants) (test unitaire)
    [FRONT]CAS-US1-01-création-de-compte-utilisateur_mauvais-format-email (affichage "Merci de renseigner une adresse email valide") (test unitaire)
    [FRONT]CAS-US1-02-création-d-un-projet_création-ok (code 200) (test d'intégration)
    [FRONT]CAS-US1-01-création-de-compte-utilisateur_login-deja-utilisé (affichage "Login déjà utilisé") (test d'intégration)
    [BACK]CAS-US1-01-création-de-compte-utilisateur_message-succès (affichage body "Compte créé avec succès") (test unitaire)
    [BACK]CAS-US1-02-création-d-un-projet_date-anterieur ("La date du projet ne peut pas être antérieure à aujourd'hui.") (test d'intégration)
    [FRONT]CAS-US1-création-de-compte_parcours-ok (affichage "homepage" personnalisé) (test E2E)
5. Critères de sortie : les tests remplissent ce qui est défini dans le tableau des cas des tests