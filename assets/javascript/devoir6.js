function analyserPoeme() {
    let poeme = document.getElementById("poeme").value;

    if (poeme.trim() === "") {
        alert("Le poème est vide.");
        return;
    }

    var lignes = poeme.split("\n").filter(Boolean);

    var motsFreq = {};
    var mots = lignes.join(" ").split(/\s+/);
    mots.forEach(function(mot) {

        mot = mot.toLowerCase();
        motsFreq[mot] = (motsFreq[mot] || 0) + 1;
    });

    var motsTries = Object.entries(motsFreq).sort(function(a, b) { return b[1] - a[1]; });

    var top10Mots = motsTries.slice(0, 10).map(function(item) { return item[0] + " (" + item[1] + ")"; });

    const richesseLexicale = (new Set(mots)).size / mots.length * 100;

    var phrases = poeme.split(/[.!?]+/).filter(Boolean);

    var longueurMoyenneMotsParPhrase = mots.length / phrases.length;

    console.log('Les 10 mots les plus fréquents:');
    console.log(top10Mots);
    console.log('Richesse lexicale:', richesseLexicale.toFixed(2) + '%');
    console.log('Nombre de phrases:', phrases.length);
    console.log('Longueur moyenne des mots par phrase:', longueurMoyenneMotsParPhrase.toFixed(2));
}

document.getElementById("my-button").addEventListener("click", analyserPoeme);




