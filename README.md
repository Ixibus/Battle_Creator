# Battle Creator - Plateforme de Gestion de Battles Hip-Hop

> **Projet présenté dans le cadre de la validation du Titre RNCP Niveau 6 : Concepteur Développeur d'Applications (CDA)**

[![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-blue?logo=githubactions)](https://github.com)
[![Frontend](https://img.shields.io/badge/Frontend-React_18_%7C_TypeScript-61DAFB?logo=react)](https://react.dev/)
[![Backend](https://img.shields.io/badge/Backend-Java_Spring_Boot-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![Database](https://img.shields.io/badge/Database-PostgreSQL_%7C_Neon.tech-4169E1?logo=postgresql)](https://neon.tech/)

---

## À propos du projet

**Battle Creator** est un Saas pour les créateurs de battles Hip-Hop qui permet de simplifier et gérer les ressources humaines bénévoles (création de compte, de projet de battle, de missions, de bénévoles et  de tâches notamment).

Les organisateurs d'événements culturels font souvent face à un casse-tête organisationnel : coordination des bénévoles, répartition des tâches logistiques, etc. **Battle Creator** répond directement à cette problématique grâce à un espace centralisé dédié uniquement à l'organisateur.

### Valeur ajoutée & Modèle d'accès
**Accès Exclusif Organisateur :** Il n'y a pas de compte bénévoles. L'organisateur gère l'intégralité de ses événements en toute autonomie.
**Gestion par Thématique :** Battle Creator comportent déjà des missions pour aiguiller le créateur de battle, mais il est possible de créer et personnaliser des missions.

---

## Fonctionnalités Clés

**Gestion des Projets (Battles) :** Création, modification et suivi des événements à venir ou passés.
**Missions par Thématique :** Regroupement des actions par pôles spécifiques au sein d'un battle.
**Attribution & Suivi des Tâches :** Création de tâches spécifiques au sein de chaque mission et affectation directe aux bénévoles identifiés.
**Gestion de Matériel :** Inventaire et liste du matériel nécessaire par mission.
**Espace Sécurisé :** Authentification robuste réservée à l'organisateur.

---

## Architecture & Conception

### Structure Monorepo
Le projet est structuré sous forme de Monorepo pour centraliser la gouvernance du code. 

```text
Projet_Battle_creator/
├── Frontend/
│   └── developpement/            # Application React + TypeScript (Vite)
│       └── src/                  # architecture "Layered" (Couches de responsabilité UI et séparation composants présentationnels, logique métier (features) et gabarits (layouts))
│           ├── components/       # composants UI réutilisables
│           ├── features/         # modules métier
│           ├── layouts/          # modèles d'encadrement des pages
│           ├── pages/            # vues de l'application
│           └── style/            # CSS Vanilla
└── Backend/
    └── developpement/            # API REST Java/Spring
        └── src/main/java/com/example/battle_creator/   # architecture "N-tiers" (Séparation des rôles)
            ├── config/           # configuration transversale de l'API REST
            ├── controllers/      # Endpoints REST
            ├── dtos/             # Data Transfer Objects
            ├── exceptions/       # gestionnaires d'erreurs globaux
            ├── filters/          # filtres de sécurité (JWT Filter)
            ├── mappers/          # helpers métier
            ├── models/           # entités JPA / Hibernate
            ├── repositories/     # interfaces d'accès aux données
            └── services/         # logique métier application
```

---

## Modèle de Sécurité

**Chiffrement:** mots de passe hachés via Argon2 (Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8()).

**Authentification Statless:** génération de jetons JWT lors de la connexion.

**Contrôle d'accès front-end :** Composant "conteneur" <ProtectedRoute /> effectuant une vérification dynamique auprès de l'API REST avant d'autoriser l'accès aux routes privées.

---

## Stack Technique & Environnement de Développement

| Domaine | Technologies / Outils |
| :--- | :--- |
| **Frontend** | React, TypeScript, Vite, CSS Vanilla |
| **Backend** | Java, Spring Boot, Spring Security, Hibernate / JPA |
| **Base de Données** | PostgreSQL (Hébergé sur Neon.tech) |
| **Gestionnaire de dépendances** | Maven (Local), NPM |
| **Conteneurisation** | Docker & Docker Compose |
| **Tests Frontend** | Vitest, Playwright (E2E), Coverage Vitest |
| **Tests Backend** | JUnit, Spring Test, Java Code Coverage |
| **CI/CD** | GitHub Actions |
| **Hébergement** | Alwaysdata (Front & API Rest Java), Neon.tech (PostgreSQL) |

---

## Installation & Lancement en Local

### Prerequisites
* **Node.js** (v18+) & **npm**
* **Java JDK** (17 ou +)
* **Maven**
* **Docker & Docker Compose** (pour le conteneur Java/Spring et de BDD)

### 1. Clonage du dépôt
```bash
git clone [https://github.com/votre-compte/Projet_Battle_Creator.git](https://github.com/votre-compte/Projet_Battle_Creator.git)
```

### 2. Démarrage du Backend conteneurisé Docker (Java/Spring + serveur PostgreSQL)

**1er Lancement** 
```bash
cd Projet_Battle_Creator/Backend/developpement
docker-compose up -d
```

**en Développement (après travaux du code Java)**
```bash
cd Projet_Battle_Creator/Backend/developpement
# destruction des conteneurs, compilation en local du java dans .jar, construction et lancement des services Java/Spring et PostgreSQL
docker-compose down && mvn clean package -DskipTests && docker compose up -d --build
```
*en développement: (L'API REST accessible sur http://localhost:8080)*

### 3. Démarrage du Frontend (React + Vite)

```bash
cd Projet_Battle_Creator/Frontend/developpement
npm install
npm run dev
```
*en développement: (L'application interface client accessible sur http://localhost:5173)*

---

## Stratégie de Test & Qualité Code

### Dépendances de test

**Application React/TypeScript :** Vitest, PlayWright, Vitest/coverage
**API REST Java/Spring :** Spring Boor Test, Junit, Java Code Coverage

### Documentation des tests

**Liste des tests**: liste_des_tests.md
**Paramétrage des environnements de tests**: environnement-tests

---

## Pipeline CI/CD & Déploiement

### Pipeline GitHub Actions

Chaque push ou Pull Request déclenche un workflow d'intégration et de déploiement continu

**Exécution des Tests :** lancement automatisé des suites de tests Front (Vitest) et Back (JUnit).

**Build :** compilation de l'application React et génération du fichier .jar pour Spring Boot.

**Déploiement Automatisé :** 
    **Application React/TypeScript :** Alwaysdata
    **API REST Java/Spring :** Alwaysdata
    **Base de données :** Neon.tech

---

## Méthodologie et livrables

**Conception UX/UI :** Wireframes et maquettes de l'application réalisés sur Penpot

**Modélisation de la base de données (Merise) :** MCD, MLD et MPD

**Gestion de projet :** tableau Kanban sur Jira

