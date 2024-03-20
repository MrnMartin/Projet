function analyserPoeme() {
    let poeme = document.getElementById("poeme").value;

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

    var phrases = poeme.split(/[.!?]+/g);

    var longueurMoyenneMotsParPhrase = mots.length / phrases.length;
	

	let display = document.getElementById("resultFinal");
    display.innerText = "Top 10 mots: " + top10Mots.join(", ") + "\n" + "Richesse lexicale: " + richesseLexicale + "\n" + "Phrases: " + phrases.length + "\n" + "Longueur moyenne des mots par phrase: " + longueurMoyenneMotsParPhrase;
}




