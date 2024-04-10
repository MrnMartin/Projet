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
    
    var texte = document.getElementById fileDisplayArea.innerText;

    // diviser le texte en mots en utilisant les délimiteurs présents dans la page HTML
    var mots = fileDisplayArea.split(",;’~|&#@=`-.?!%*$()[]{}_:+«»§\/");

    }

    mots = mots.filter(function(mot) {
        return mot.trim() !== '';

    // trier les mots par longueur croissante
   var mots_len = {};

// Compter les occurrences de mots et leurs longueurs
mots.forEach(function(mot) {
    const trimmedMot = mot.trim();
    if (trimmedMot !== "") {
        if (!mots_len[trimmedMot]) {
            mots_len[trimmedMot] = {
                length: trimmedMot.length,
                letterCount: countLetters(trimmedMot),
                occurrences: 1
            };
        } else {
            mots_len[trimmedMot].occurrences++;
        }
    }
});

// Afficher le nombre total de mots
var nombreMots = Object.keys(mots_len).length;

// Afficher les mots par longueur croissante dans un tableau
var tableau = "<table><tr><th>Mot</th><th>Longueur</th><th>Nombre de lettres</th><th>Occurrences</th></tr>";
Object.keys(mots_len).sort((a, b) => mots_len[a].length - mots_len[b].length).forEach(function(mot) {
    tableau += "<tr><td>" + mot + "</td><td>" + mots_len[mot].length + "</td><td>" + mots_len[mot].letterCount + "</td><td>" + mots_len[mot].occurrences + "</td></tr>";
});
tableau += "</table>";


function CoocurencesetF() {
 const term = document.getElementById("fileinput").value.trim().toLowerCase();
 const length = parseInt(document.getElementById("fileDisplayArea").value);

 if (!term || isNaN(length) || length <= 0) {
  alert("Veuillez entrer un terme valide et une longueur valide.");
  return;
    }

 const text = document.getElementById("fileDisplayArea").innerText;
    const words = text.split(/[ ,;’'~|&#@=`-.?!%*$()\[\]{}_:+«»§\/]+/).filter(word => word.trim() !== '');

	
   function tbCooccurrences(tbcoo) {
    const table = document.getElementById("page-analysis");
    table.innerHTML = "<table><tr><th>Co-fréquence</th><th>Fréquence gauche</th><th>Fréquence droite</th><th>% Fréquence gauche</th><th>% Fréquence droite</th></tr>";
   }
	   
let display = document.getElementById("resultFinal");
    display.innerText = "Nombre de mots: " + nombreMots(", ") + "\n" + "Tableau: " + tableau;
}
}
