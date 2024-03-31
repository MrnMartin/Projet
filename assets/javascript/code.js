window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

function segmenterTexte() {
    
    var texte = document.getElementById('texte').innerText;

    // diviser le texte en mots en utilisant les délimiteurs présents dans la page HTML
    var mots = texte.split(/\s+|[,;.!?]/);

    // enlever les mots vides
    mots = mots.filter(function(mot) {
        return mot.trim() !== '';
    });

    // trier les mots par longueur croissante
    mots.sort(function(a, b) {
        return a.length - b.length;
    });

    // afficher le nombre total de mots
    var nombreMots = mots.length;
 

    // afficher les mots par longueur croissante dans un tableau
    var tableau = "<table><tr><th>Mot</th><th>Longueur</th></tr>";
    mots.forEach(function(mot) {
        tableau += "<tr><td>" + mot + "</td><td>" + mot.length + "</td></tr>";
    });
    tableau += "</table>";
}

// Ajouter un écouteur d'événements au bouton "Segmentation"
document.getElementById('segmentation').addEventListener('click', segmenterTexte);

let display = document.getElementById("resultFinal");
    display.innerText = "Nombre de mots: " + nombreMots(", ") + "\n" + "Tableau: " + tableau;
}


}
