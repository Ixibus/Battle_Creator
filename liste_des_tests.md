Battle Creator

    US01 - Création de compte
        Branche : tests/**
        Périmètre :
            US1-01-création de compte utilisateur
            US1-02-création d'un projet
            US1-03-information utilisateur
        Couche : React (Vitest), Java/Spring (JUnit)
        Environnement : local
        Impact :
            en developpment : utilisation unitaire des tests
            en production : automatisation CI/CD

    US02 - Creation de mission et tache
        Branche : tests/**
        Périmètre :
            US2-01-création de mission
            US2-02-création de tâche
            US2-03-assignation de tâche
            US2-04-création bénévole et assignation
        Couche : React (Vitest), Java/Spring (JUnit)
        Environnement : local
        Impact :
            - en developpement : utilisation unitaire des tests
            - en production : automatisation CI/CD


    CO00 - test de couverture (front-end)

        Branche : tests/**
        Périmètre : front-end
        Couche : React (Vitest/coverage)
        Environnement : local
        Impact :
            en developpment : utilisation unitaire
            en production : uniquement durant la CI

   CO01 - test de couverture (back-end)

        Branche : tests/**
        Périmètre : back-end
        Couche : Java/SpringBoot (Java Code Coverage)
        Environnement : local
        Impact :
            en developpment : utilisation unitaire
            en production : uniquement durant la CI
