package com.example.battle_creator.repository;

import com.example.battle_creator.model.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}

// // --------- Exemple version sans JPARepository (implémentation en 2 fichiers) ----------
// // --- Dans un autre fichier (ProjectRepository.java) ---
// package com.example.battle_creator.repository;

// import com.example.battle_creator.model.Project;
// import java.util.List;
// import java.util.Optional;

// public interface ProjectRepository {

//     Project save(Project project);

//     Optional<Project> findById(Long id);

//     List<Project> findAll();

//     Project update(Project project); <-- inacessible quand JPAREpository est utilisé. Il faut prendre save() à la place

//     void deleteById(Long id);
// }
// // --- dans un autre fichier (ProjectRepositoryImpl.java) ---
// import com.example.battle_creator.model.Project;
// import jakarta.persistence.EntityManager;
// import jakarta.persistence.PersistenceContext;
// import jakarta.transaction.Transactional;
// import org.springframework.stereotype.Repository;

// import java.util.List;
// import java.util.Optional;

// @Repository
// public class ProjectRepositoryImpl implements ProjectRepository {

//     @PersistenceContext
//     private EntityManager entityManager;

//     @Override
//     @Transactional
//     public Project save(Project project) {
//         entityManager.persist(project);
//         return project;
//     }

//     @Override
//     public Optional<Project> findById(Long id) {
//         Project project = entityManager.find(Project.class, id);
//         return Optional.ofNullable(project);
//     }

//     @Override
//     public List<Project> findAll() {
//         return entityManager
//                 .createQuery("SELECT p FROM Project p", Project.class)
//                 .getResultList();
//     }

//     @Override
//     @Transactional
//     public Project update(Project project) {
//         return entityManager.merge(project);
//     }

//     @Override
//     @Transactional
//     public void deleteById(Long id) {
//         Project project = entityManager.find(Project.class, id);
//         if (project != null) {
//             entityManager.remove(project);
//         }
//     }
// }

// => Explication simple ligne par ligne

// @Repository
// Tu dis à Spring : “ce fichier sert à parler à la base de données”.

// EntityManager
// C’est l’objet JPA qui permet de faire les opérations sur les entités : créer, chercher, modifier, supprimer.

// @PersistenceContext
// Spring injecte automatiquement EntityManager dans ta classe.

// save(project)
// java
// entityManager.persist(project);
// Cette méthode ajoute un nouvel objet en base.

// findById(id)
// java
// entityManager.find(Project.class, id);
// Cette méthode cherche un Project avec son id.

// findAll()
// java
// createQuery("SELECT p FROM Project p", Project.class)
// Ici tu écris une requête JPQL pour récupérer toutes les lignes de la table liée à Project.

// update(project)
// java
// entityManager.merge(project);
// Cette méthode met à jour un objet existant.

// deleteById(id)
// Tu cherches d’abord l’objet, puis tu le supprimes avec remove().

