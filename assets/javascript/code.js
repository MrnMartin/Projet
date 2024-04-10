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

// Fonction pour trouver les co-occurrences dans le texte
function CoocurencesetF() {
// Récupérer le terme saisi par l'utilisateur et la longueur de l'intervalle
 const term = document.getElementById("fileinput").value.trim().toLowerCase();
 const length = parseInt(document.getElementById("fileDisplayArea").value);
	
// Vérifier si le terme et la longueur sont valides
 if (!term || isNaN(length) || length <= 0) {
  alert("Veuillez entrer un terme valide et une longueur valide.");
  return;
    }
	
// Récupérer le texte du fichier
 const text = document.getElementById("fileDisplayArea").innerText;
 // Diviser le texte en mots	
    const words = text.split(/[ ,;’'~|&#@=`-.?!%*$()\[\]{}_:+«»§\/]+/).filter(word => word.trim() !== '');
	
 // Initialiser un dictionnaire pour stocker les co-occurrences
const cooccurrences = {};

// Parcourir tous les mots du texte
words.forEach((word, i) => {
 // Vérifier si le mot correspond au terme saisi	
    if (word === term) {
	// Déterminer l'indice de début et de fin de la fenêtre autour du mot    
        const startIndex = Math.max(0, i - length);
        const endIndex = Math.min(words.length - 1, i + length);
         // Parcourir les mots dans la fenêtre autour du mot
        for (let j = startIndex; j <= endIndex; j++) {
	 // Ne pas compter le mot lui-même
            if (i !== j && Math.abs(i - j) <= length) {
                const coWord = words[j];
	// MAJ les co-occurrences dans le dictionnaire
                if (!cooccurrences[coWord]) {
                    cooccurrences[coWord] = { coFrequency: 0, leftFrequency: 0, rightFrequency: 0 };
                }
                cooccurrences[coWord].coFrequency++;
                if (j < i) {
                    cooccurrences[coWord].leftFrequency++;
                } else {
                    cooccurrences[coWord].rightFrequency++;
                }
            }
        }
    }
});

}	
// Fonction pour afficher les co-occurrences dans le tableau	
   function tbCooccurrences(tbcoo) {
    const table = document.getElementById("page-analysis");
    table.innerHTML = "<table><tr><th>Co-fréquence</th><th>Fréquence gauche</th><th>Fréquence droite</th><th>% Fréquence gauche</th><th>% Fréquence droite</th></tr>";
   }
	    
 // Parcourir le dictionnaire des co-occurrences
    Object.entries(tbcooccurrences).forEach(([word, data]) => {
        const { coFrequency, leftFrequency, rightFrequency } = data;
        const totalFrequency = leftFrequency + rightFrequency;
        const leftPercentage = totalFrequency > 0 ? ((leftFrequency / totalFrequency) * 100).toFixed(2) : 0;
        const rightPercentage = totalFrequency > 0 ? ((rightFrequency / totalFrequency) * 100).toFixed(2) : 0;

        // Ajouter une nouvelle ligne au tableau pour chaque co-occurrence
        const row = table.insertRow();
        [coFrequency, leftFrequency, rightFrequency, leftPercentage + "%", rightPercentage + "%"].forEach(value => {
            row.insertCell().textContent = value;
        });
    });
}	    
	   
    display.innerText = "Nombre de mots: " + nombreMots(", ") + "\n" + "Tableau: " + tableau;
}
}
