window.onload = function () {
    const fileInput = document.getElementById('fileInput');
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    const logger = document.getElementById("logger");

    // Fonction de tokenisation
    function tokenize(text) {
        // Utilisation de split pour diviser le texte en mots
        return text.split(/\b\w+\b/g);
    }

    // Fonction pour afficher un message d'erreur
    function displayError(message) {
        logger.innerHTML = '<span class="errorlog">' + message + '</span>';
    }

    // Fonction pour afficher un message de succès
    function displaySuccess(message) {
        logger.innerHTML = '<span class="infolog">' + message + '</span>';
    }

    // Écouteur d'événement pour le chargement de fichier
    fileInput.addEventListener('change', function (e) {
        const file = fileInput.files[0];
        const textType = new RegExp("text.*");

        if (file.type.match(textType)) {
            const reader = new FileReader();

            reader.onload = function (e) {
                fileDisplayArea.innerText = reader.result;
            }

            reader.readAsText(file);

            displaySuccess('Fichier chargé avec succès');
        } else {
            fileDisplayArea.innerText = "";
            displayError('Type de fichier non supporté !');
        }
    });
}

function empty() {
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    if (fileDisplayArea.innerText.trim() === "") {
        alert("Veuillez saisir un fichier s'il vous plaît format txt.");
        return true;
		  }
    return false;
}

function emptys() {
    const fileDisplayArea = document.getElementById('fileDisplayArea');
    if (fileDisplayArea.innerText.trim() === "") {
        alert("Désolé je n'ai pas réussi.");
        return true;
		  }
    return false;
}

function sortWords() {
    const output = document.getElementById("fileDisplayArea").innerText;
    const result = document.getElementById("page-analysis");
    const delimiters = document.getElementById("delimID").value;

    let delim2 = delimiters.replace("-", "\\-");
    delim2 = delim2.replace("[", "\\[");
    delim2 = delim2.replace("]", "\\]");
    delim2 = delim2 + "—";
    delim2 = delim2 + "\\s";

    const word_regex = new RegExp("[" + delim2 + "]", 'g');

    const all_words = output.split(word_regex);
    const cleaned_words = all_words.filter(x => x.trim() != '');

    let dic_length = {};

    for (let word of cleaned_words) {
        if (word.length in dic_length) {
            dic_length[word.length]["freq"] += 1;
            if (!dic_length[word.length]["elements"].includes(word.toLowerCase())) {
                dic_length[word.length]["elements"].push(word.toLowerCase());
            }
        } else {
            dic_length[word.length] = {}
            dic_length[word.length]["freq"] = 1;
            dic_length[word.length]["elements"] = [word.toLowerCase()];
        }
    }

    let table = document.createElement("table");
    // table.style.margin = "auto";
    let head = table.appendChild(document.createElement("tr"));
    head.innerHTML = "<th>Nombre de caractères</th><th>Nombre d'occurrences</th><th>Formes(s) unique(s)</th>";

    const ordered = Object.keys(dic_length).sort((a, b) => a - b);

    for (let elem of ordered) {
        let row = table.appendChild(document.createElement("tr"));
        let cell_length = row.appendChild(document.createElement("td"));
        let cell_total = row.appendChild(document.createElement("td"));
        let cell_details = row.appendChild(document.createElement("td"));
        cell_length.innerHTML = elem;
        cell_total.innerHTML = dic_length[elem]["freq"];
        cell_details.innerHTML = dic_length[elem]["elements"].sort().join(', ') + '(' + dic_length[elem]["elements"].length + ')';
    }

    result.innerHTML = `<p>Le  texte contient au total ${cleaned_words.length} mots.<p/>`;
    result.append(table);
}

function Message(){
	var message = document.getElementById("message");
	if (message.style.display === "none"){
		message.style.display = "block";
	}
	else {
		message.style.display = "none";
	}
}

function afficherErreur(message) {
    document.getElementById("page-analysis").innerHTML = '<span class="errorlog">' + message + '</span>';
}

function afficherCooccurrents() {
	if (empty()) return;
    const texte = document.getElementById("fileDisplayArea").innerText;
    const pole = document.getElementById("poleID").value.toLowerCase().trim();
    const longueur = parseInt(document.getElementById("lgID").value);

    if (pole === "") {
        afficherErreur("Veuillez entrer un terme dans le champ Pôle.");
        return;
    }

    if (isNaN(longueur) || longueur <= 0) {
        afficherErreur("Veuillez entrer une longueur valide dans le champ Longueur.");
        return;
    }

     const mots = texte.match(/\b\w+\b/g).map(mot => mot.toLowerCase());

    if (!mots.includes(pole)) {
        afficherErreur("Le terme spécifié ne se trouve pas dans le texte.");
        return;
    }

    let cooccurrents = {};
    for (let i = 0; i < mots.length - 1; i++) {
        const motActuel = mots[i];
        const motSuivant = mots[i + 1];
        if (motActuel === pole || motSuivant === pole) {
            const intervalle = mots.slice(i, i + longueur).join(" ");
            if (!cooccurrents[intervalle]) {
                cooccurrents[intervalle] = { coFrequence: 0, frequenceGauche: 0, frequenceDroite: 0 };
            }
            cooccurrents[intervalle].coFrequence++;
            if (motActuel === pole) {
                cooccurrents[intervalle].frequenceDroite++;
            } else {
                cooccurrents[intervalle].frequenceGauche++;
            }
        }
    }

    let tableauHTML = '<table border="1">';
    tableauHTML += '<tr><th>Cooccurrences</th><th>Co-fréquence</th><th>Fréquence gauche</th><th>Fréquence droite</th><th>% Fréquence gauche</th><th>% Fréquence droite</th></tr>';

    for (const [intervalle, stats] of Object.entries(cooccurrents)) {
        const pourcentageGauche = ((stats.frequenceGauche / stats.coFrequence) * 100).toFixed(2);
        const pourcentageDroite = ((stats.frequenceDroite / stats.coFrequence) * 100).toFixed(2);
        tableauHTML += '<tr><td>' + intervalle + '</td><td>' + stats.coFrequence + '</td><td>' + stats.frequenceGauche + '</td><td>' + stats.frequenceDroite + '</td><td>' + pourcentageGauche + '%</td><td>' + pourcentageDroite + '%</td></tr>';
    }

    tableauHTML += '</table>';
    document.getElementById("page-analysis").innerHTML = tableauHTML;
}

function affGraph(){
	if (emptys()) return;
 }
 //Voici ce que j'ai essayé pour le graphique mais sans succès.
 
 //function freqmot(texte) {
	 //const mots = texte.split(/\b\w+\b/g);
	 //const freqs = {};
	 
	 //mots.forEach(function(mot) {
		// if (!freqs[mot]) { 
            //freqs[mot] = 0; 
        //}
       // freqs[mot] += 1; 
    //});
  //  return freqs; 
// }

//function freqbarre() {
	//var max = 10
	//var text = document.getElementById("fileDisplayArea").innerText
	//var freqs = freqmot(text.toLowerCase());
	//var label = [];
	//var serie = [];
	
	//if(label.length < max){
		//label.push(mot);
		//serie.push(freq[mot]);
	//}
	
	//var data = {
		//labels: label,
		//series: [serie]
	//};
	
	//var options = {
		//width: 100,
		//height: 400,
		//seriesBarDistance: 10,
		//reverseData: true,
	//horizontalBars: true,
	//}
	
	//document.getElementById('page-analysis').innerHTML = ""; 
	//new Chartist.Bar('ct-chart', data, options);
	
		
	
	