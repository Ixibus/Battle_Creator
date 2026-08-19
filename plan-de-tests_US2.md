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
