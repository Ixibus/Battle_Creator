Environnement de tests

- Installation environnement de tests:
    - "npm install -D vitest @testing-library/react @testing-library/jest-dom happy-dom" (Vitest + module pour tester des composants + module pour utiliser des fonctions d'identification d'élément de DOM + module pour simuler un DOM).
    
    - mettre dans package.json la ligne ""test": "vitest run"," dans "scripts"
    - mettre dans package.json la ligne ""test:watch": "vitest"," dans "scripts"

- Dossier de configuration de tests: 
    - front: 
        - pour des tests plus rapides (dans un "vitest.config.ts") :

            import { defineConfig } from "vitest/config";

            export default defineConfig({
            test: {
                environment: "happy-dom",
                css: false,
                fileParallelism: false,
                },
            });

        - CLIs anti-confusion playwright/vitest: 
            - Dans package.json : 

                "scripts": {
                    "test": "vitest run", // donc CLI npm test
                    "test:e2e": "playwright test", // donc CLI npm run est:e2e (utiliser "--" pour utiliser les flags. ex: "npx playwright test --ui" devient "npm run test:e2e -- --ui")
                }
            
            (l'utilisation des flags )

            - CLIs anti-confusion playwright/vitest (dans un "vitest.config.ts"): 
                Dans ignorer la route de "playwright" (si les tests playwright se trouve dans "tests/"):

                    export default defineConfig({
                        test: {
                            // Vitest va ignorer le dossier des tests Playwright
                            exclude: ['**/node_modules/**', '**/tests/**'],
                        },
                        })
    - back:    
        - configuration variable d'environnement: 
            - prendre de "main/resources/application.properties" pour "test/resources/application.properties" ou "test/resources/application-test.properties" suivant le profil de test choisi, normalement c'est "test"(ex: la "jwt.secret-key" pour éviter les erreurs de variable absente)

- Placement des fichiers de tests:
    - front: au dossier racine de la commande de lancement (*.test.ts)
    - back: dans src/test en respectant l'arboresence du lancement de l'app dans main: test/java/com/example/back/*Test.java

- CLI lancement des tests:
    - front: 
        cd front
        npm ci && npm test
            - détails des commandes :
                npm ci
                npm test              # vitest run (one-shot)
                npm run test:watch    # mode watch
    - back:
        cd back
        ./mvnw test           # ou : ./mvnw -B test

- Résultats des tests:

    - front (Vitest):
        - résultat simple:
            output terminal après CLI npm ci && npm test

    - back (JUnit):
        - résultat simple: output terminal après la commande ./mvnw test (dans target/surefire-reports/....txt ou ....xml)
        - résultat détaillé (après ./mvnw test): 
            - voir les logs des tests en output terminal : 
                (exemple: utiliser ".andDo(print())" de "MockMvcResultHandlers.print") pour voir les entrées et sorties de ce qui est testé.
            - voir ces logs dans un fichier dédié (dans target/surefire-reports/....-output.txt): 
                - installer la dépendance "maven-surefire-plugin" avec redirection des logs dans les fichiers générés: 

                    <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-plugin</artifactId>
                    <version>3.5.3</version>
                    <configuration>
                        <redirectTestOutputToFile>true</redirectTestOutputToFile>
                    </configuration>
                    </plugin>
                    
            - générer un rapport en mise en page designé: 
                faire la CLI "mvn surefire-report:report" puis ouvrir "target/reports/surefire.html" dans le navigateur
            - générer un rapport avec plus d'option (détails sur les logs):
                - installer la dépendance maven-site-plugin et sa dépendance permettant d'assurer sa redirection du rapport dans le chemin "target/site/surefire-report.html" (sinon target/site/surefire.html):

                    <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-site-plugin</artifactId>
                    <version>3.21.0</version> <!-- Version récente compatible Java 17/21 et Maven récent -->
                    </plugin>

                    <reporting>
                    <plugins>
                    <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-surefire-report-plugin</artifactId>
                    <version>3.5.3</version>
                    </plugin>
                    </plugins>
                    </reporting>

                - faire la CLI "mvn surefire-report:report-only" (normalement "mvn site" mais long...)


- Dépendances installées: 
    - front: npm ci dans front/
    - back: Maven wrapper dans back/

- Autres types de tests :
    - front: 
        - Générer des tests E2E (Playwright):
            - Installer la dépendance: 
                - npm init playwright@latest
                - puis accepter : l'emplacement tests/; le workflow Github Actions workflow; l'installation des navigateur Playwright; l'installation des dépendances OS Playwright.
            - Configurer l'environnement sur le bon port:
                - permettre à Playwright d'utiliser le port de l'application front en mettant dans playwright.config.ts :
                    
                    import { defineConfig } from '@playwright/test';

                    // CI est 'true' automatiquement sur GitHub Actions
                    const isCI = !!process.env.CI; 

                    export default defineConfig({
                    use: {
                        baseURL: 'http://localhost:5173',
                        trace: 'on-first-retry',

                        // En local : headless false (pour l'interface graphique). En CI : headless true (sans interface graphique).
                        headless: isCI ? true : false, 

                        launchOptions: {
                        // Ralentit seulement en local, pas en CI
                        slowMo: isCI ? 0 : 500, 
                        },
                    },
                    });

            - Lancer le test : 
                - une fois l'app front, l'API Back lancées et le fichier test rédigé dans une fichier ....spec.ts, faire :
                    --> npx playwright test (pour une sortie terminale + rapport sur http://localhost:9323/)
                    --> npx playwright test --ui (ouvrir un environnement de config Playwright)
                    --> npx playwright test --headed (test en temps réel sur les navigateurs configurés)
                    --> npx playwright test --headed --project=chromium --workers=1 (test en temps réel uniquement sur Chrome + se lance à la suite et non en parallèle)

                - Styliser le live testing :
                    - Pour configurer la vitesse des tests (playwright.config.ts):

                        import { defineConfig } from '@playwright/test';

                            export default defineConfig({
                                use: {
                                    headless: false, // Nécessaire pour voir le navigateur s'ouvrir
                                    launchOptions: {
                                        slowMo: 1000, // Ajoute 1 seconde (1000 ms) de pause entre CHAQUE action
                                    },
                                },
                            });

                    - Effets de touches tapées:
                        - dans les fichiers de test :
                            await page
                                .locator(input de complétion)
                                .pressSequentially("contenu de l'input", { delay: 150 })

    - back:
        - Générer un rapport de couverture de tests (avec Jacoco) :
            - Installer la dépendance :

                <plugin>
                <groupId>org.jacoco</groupId>
                <artifactId>jacoco-maven-plugin</artifactId>
                <version>0.8.12</version>
                <executions>
                <!-- Prépare l'agent Java pour enregistrer la couverture pendant les tests -->
                <execution>
                <goals>
                <goal>prepare-agent</goal>
                </goals>
                </execution>
                <!-- Génère le rapport HTML/XML après l'exécution de la phase test -->
                <execution>
                <id>report</id>
                <phase>test</phase>
                <goals>
                <goal>report</goal>
                </goals>
                </execution>
                </executions>
                </plugin>
                
            - le rapport est disponible dans "target/site/jacoco/index.html"
                
            
- back : 
    - configuration variable d'environnement: 
        - prendre de "main/resources/application.properties" pour "test/resources/application.properties" ou "test/resources/application-test.properties" suivant le profil de test choisi, normalement c'est "test"(ex: la "jwt.secret-key" pour éviter les erreurs de variable absente)
        - 


- Couverture : *non dispo*