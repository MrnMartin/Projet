window.onload = function () {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // Listen for changes in the file input
    fileInput.addEventListener('change', function (e) {
        let file = fileInput.files[0];
        let textType = /^text\//;

        if (file.type.match(textType)) {
            let reader = new FileReader();

            reader.onload = function (e) {
                fileDisplayArea.innerText = reader.result;
            }

            reader.readAsText(file);

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else {
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

function sortWords() {
    const output = document.getElementById("fileDisplayArea").innerText;
    let result = document.getElementById("page-analysis");
    let delimiters = document.getElementById("delimID").value;

    // Escape special characters in the delimiter list
    let delim2 = delimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    delim2 += "—\\s"; // Add whitespace and em dash to delimiter list

    let word_regex = new RegExp("[" + delim2 + "]", 'g');

    let allWords = output.split(word_regex);
    let cleanedWords = allWords.filter(x => x.trim() !== '');

    let wordLengths = {};

    for (let word of cleanedWords) {
        let wordLength = word.length;
        if (wordLengths[wordLength]) {
            wordLengths[wordLength]["freq"] += 1;
            if (!wordLengths[wordLength]["elements"].includes(word.toLowerCase())) {
                wordLengths[wordLength]["elements"].push(word.toLowerCase());
            }
        } else {
            wordLengths[wordLength] = {
                "freq": 1,
                "elements": [word.toLowerCase()]
            };
        }
    }

    let table = document.createElement("table");
    table.style.margin = "auto";
    let head = table.appendChild(document.createElement("tr"));
    head.innerHTML = "<th>Nombre de caractères</th><th>Nombre d'occurrences</th><th>Formes(s) unique(s)</th>";

    let orderedLengths = Object.keys(wordLengths).sort((a, b) => a - b);

    for (let length of orderedLengths) {
        let row = table.appendChild(document.createElement("tr"));
        let cellLength = row.appendChild(document.createElement("td"));
        let cellTotal = row.appendChild(document.createElement("td"));
        let cellDetails = row.appendChild(document.createElement("td"));
        cellLength.innerHTML = length;
        cellTotal.innerHTML = wordLengths[length]["freq"];
        cellDetails.innerHTML = wordLengths[length]["elements"].sort().join(', ') + ' (' + wordLengths[length]["elements"].length + ')';
    }

    result.innerHTML = `<p>Le texte contient au total ${cleanedWords.length} mots.</p>`;
    result.appendChild(table);
}

function pieChars() {
    const output = document.getElementById("fileDisplayArea").innerText;
    let delimiters = document.getElementById("delimID").value;

    let delim2 = delimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    delim2 += "—\\s";

    let wordRegex = new RegExp("[" + delim2 + "]", 'g');

    let allWords = output.split(wordRegex);
    let cleanedWords = allWords.filter(x => x.trim() !== '');

    let wordLengths = {};

    for (let word of cleanedWords) {
        let wordLength = word.length;
        if (wordLengths[wordLength]) {
            wordLengths[wordLength] += 1;
        } else {
            wordLengths[wordLength] = 1;
        }
    }

    let orderedLengths = Object.keys(wordLengths).sort((a, b) => a - b);

    let sizeChars = [];

    for (let length of orderedLengths) {
        sizeChars.push(wordLengths[length]);
    }

    let data = {
        labels: orderedLengths,
        series: sizeChars
    };

    let options = {
        width: 400,
        height: 200
    };

    document.getElementById('page-analysis').innerHTML = '';
    new Chartist.Pie("#page-analysis", data, options);
}
