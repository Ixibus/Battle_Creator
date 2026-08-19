
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

US02 - Creation de mission et tache

1. Périmètre : US1 - Creation de mission et tache
2. Approche : 
    - front-end : 1 test unitaire et 1 test E2E
    - back-end: 2 tests unitaires, 1 test intégration et 1 test E2E
3. Environnement :
    - React/Typescript - Vitest
    - Java/Spring - JUnit  
4. Cas des tests :
    [FRONT]CAS-US2-01-création-de-mission_parcours-ok (navigation vers mission récemment crée) (testE2E)
    [FRONT]CAS-US2-04-création-bénévole-et-assignation_affichage-toast-succès ("Bénévole [prénom] [nom] a été créé et assigné à la tâche "[nom de la tâche]) (test unitaire)
    [BACK]CAS-US2-03-assignation-de-tâche_id-tache-valide (méthode validateId(id) dans TaskService.assignMemberToTask(), doit renvoyer un id positif) (test unitaire)
    [BACK]CAS-US2-02-création-de-tâche_trimeurs-d-espaces (méthode cleanText(text) dans TaskService.create(), transformation des espaces en espaces simples) (test unitaire)
    [BACK]CAS-US2-01-création-de-mission_id-introuvable (erreur handleIllegalArgument() via console "l'id de la mission est introuvable") (test intégration)
    [BACK]CAS-US2-02-création-de-tâche_création-d-une-tache (via controller TaskController.java, renvoi body tache créée) (test E2E)
5. Critères de sortie : les tests remplissent ce qui est défini dans le tableau des cas des tests



CO00 - test de couverture (front-end)

1. Périmètre : Application React/Typescript
2. Approche : test de couverture
3. Environnement : Vitest/Coverage
4. *(tableau ci-dessous)*
5. Critères de sortie : avoir la part de ce qui est couvert par l'application React uniquement


CO01 - test de couverture (back-end)

1. Périmètre : API Java/SpringBoot
2. Approche : test de couverture
3. Environnement : Jacoco
4. *(tableau ci-dessous)*
5. Critères de sortie : avoir la part de ce qui est couvert par l'API Java/Spring uniquement