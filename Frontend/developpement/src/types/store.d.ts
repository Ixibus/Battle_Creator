// .d dans le nom du fichier pour signaler que c'est une "déclaration"
// qu'il n'y apas de code qui s'exécute (fonctions, etc) dans ce fichier
export interface typeState {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}