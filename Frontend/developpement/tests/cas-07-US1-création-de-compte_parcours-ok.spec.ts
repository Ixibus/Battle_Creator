// tests/onboarding.spec.ts

import { test, expect } from "./fixtures";
// Adapte le chemin ci-dessus selon l'emplacement réel de ta fixture.

test.describe("Onboarding complet", () => {
  test("créer un compte, un projet et accéder à la home page", async ({
    page,
  }) => {
    test.setTimeout(120_000);
    const login = `e2e_user_${Date.now()}`;
    const email = `${login}@example.com`;
    const password = "Password123!";
    const projectName = `Projet E2E ${Date.now()}`;

    await test.step("Accéder à la création de compte", async () => {
      await page.goto("/");

      await expect(
        page.getByRole("heading", { name: "Battle Creator" }),
      ).toBeVisible();

      await page.getByRole("button", { name: "Commencer" }).click();

      await expect(
        page.getByRole("heading", { name: "CREATION DE COMPTE" }),
      ).toBeVisible();
    });

    await test.step("Créer le compte", async () => {
      await page
        .getByLabel("Votre login de connexion")
        .pressSequentially(login, { delay: 150 });

      await page
        .getByLabel("Votre email")
        .pressSequentially(email, { delay: 150 });

      await page
        .getByLabel("Veuillez rentrer votre mot de passe")
        .pressSequentially(password, { delay: 150 });

      await page
        .getByLabel("Confirmer votre mot de passe")
        .pressSequentially(password, { delay: 150 });

      await page.getByRole("button", { name: "Valider" }).click();

      await expect(page).toHaveURL(/\/projectCreation$/);
      await expect(
        page.getByRole("heading", { name: "CREATION DE PROJET" }),
      ).toBeVisible();
    });

    await test.step("Créer le projet", async () => {
      await page
        .getByLabel("Veuillez entrer le nom du projet")
        .pressSequentially(projectName, { delay: 150 });

      await page
        .getByLabel("lieu du déroulement")
        .pressSequentially("Paris", { delay: 150 });

      // La date doit être aujourd'hui ou une date future.
      await page
        .getByLabel("Date du déroulement du projet")
        .fill(getFutureDate());

      await page
        .getByLabel("Décrivez votre projet")
        .pressSequentially(
          "Projet de test E2E pour vérifier le parcours onboarding.",
          { delay: 150 },
        );

      await page.getByRole("button", { name: "Valider" }).click();

      await expect(page).toHaveURL(/\/onboardingMandatoryMissions$/);
      await expect(
        page.getByRole("heading", { name: "Missions Obligatoires" }),
      ).toBeVisible();
    });

    await test.step("Passer les missions obligatoires", async () => {
      await page
        .getByRole("button", { name: "Suivant" })
        .click();

      await expect(page).toHaveURL(/\/onboardingOptionalMissions$/);
      await expect(
        page.getByRole("heading", { name: "Missions Optionnelles" }),
      ).toBeVisible();
    });

    await test.step("Passer les missions optionnelles", async () => {
      await page
        .getByRole("button", { name: "Se connecter" })
        .click();

      await expect(page).toHaveURL(/\/connexionPage$/);
      await expect(
        page.getByRole("heading", { name: "Connexion" }),
      ).toBeVisible();
    });

    await test.step("Se connecter", async () => {
      await page
        .getByLabel("Votre login")
        .pressSequentially(login, { delay: 150 });

      await page
        .getByLabel("Votre mot de passe")
        .pressSequentially(password, { delay: 150 });

      await page.getByRole("button", { name: "Valider" }).click();

      await expect(page).toHaveURL(/\/homePage$/);
    //   await expect(page).toHaveURL(/\/home\/page$/);
    });
  });
});

function getFutureDate(): string {
  const date = new Date();

  date.setDate(date.getDate() + 7);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}