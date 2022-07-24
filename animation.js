// paramètres de mise en page
const coefficientTailleCaractere = 200;
const portionEcranOccupeMax = 90;



// trouve la ligne la plus longue ...
const listeBaliseP = document.getElementsByTagName("p");
var m = 0;
var p = -1;
for (var i=0; i<listeBaliseP.length; i++){
    if (listeBaliseP[i].innerHTML.length>m){
        m = listeBaliseP[i].innerHTML.length;
        p = i;
        //listeBaliseP[i].style["color"]= "darkcyan";

    }
}

// et l'adapte à la taille de l'écran
tailleCaractere = coefficientTailleCaractere/m;
for (var i=0; i<listeBaliseP.length; i++){
    listeBaliseP[i].style.fontSize = tailleCaractere.toString() + "vw";
}



// Adapte la hauteur des lignes à l'écran
const listeBaliseDiv = document.getElementsByTagName("div");
var baliseP;
var m = 0;
var nombreMaxLignes = 0;
var ligneTropGrande = false;

// Compte le nombre de lignes et calcule le nombre de pixel occupés par les paragraphes
for (var i=2; i<listeBaliseDiv.length; i++){
    baliseP = listeBaliseDiv[i].getElementsByTagName("p");
    m = baliseP.length;
    if (m > nombreMaxLignes){
        nombreMaxLignes = m;
    }
    console.log(i)
    var hauteurPage = parseInt(listeBaliseDiv[i].clientHeight);
    var hauteurStrophe = 0;
    for (var j=0; j<baliseP.length; j++){
        hauteurStrophe += parseInt(baliseP[j].clientHeight);
    }
    if (hauteurPage*portionEcranOccupeMax/100 < hauteurStrophe){
        ligneTropGrande = true;
    }
}

// Remanie en fonction de ces informations la taille des paragraphes
if (ligneTropGrande){
    var pourcentage = portionEcranOccupeMax/nombreMaxLignes //mettre le 90 en paramètre
    for (var i=2; i<listeBaliseDiv.length; i++){
        baliseP = listeBaliseDiv[i].getElementsByTagName("p");
        m = baliseP.length;
        for( var j=0; j<baliseP.length; j++){
            baliseP[j].style.height = `${pourcentage}%`;
            baliseP[j].style.paddingBottom= "10px";
        }
    }
}









let tailleFenetre = window.innerHeight;
var diapositiveActuelle;
let modeDiapositive = true; 

const boutton = document.getElementById("mode");
const container = document.getElementById("container");

window.addEventListener("keydown",defile);
boutton.addEventListener("click", changerDeMode);

function changerDeMode(event){
    if (modeDiapositive){
        modeDiapositive = false;
        container.style.overflowY = "scroll";
        boutton.innerHTML = "Mode Fenêtre";
    }
    else {
        modeDiapositive = true;
        container.style.overflowY = "visible";
        boutton.innerHTML = "Mode Diapositive";
    }
}


function defile(event){
    if (modeDiapositive){
        const nomTouche = event.key;
        switch (nomTouche){
            case "ArrowLeft":
                diapositivePrecedente();
                break;
            case "ArrowRight":
                diapositiveSuivante();
                break;
            case "Enter":
                diapositiveSuivante();
                break;
        }
        event.preventDefault();
    }
}


function diapositiveSuivante(){
    tailleFenetre = window.innerHeight;
    window.scrollBy(0,tailleFenetre);
};

function diapositivePrecedente(){
    tailleFenetre = window.innerHeight;
    window.scrollBy(0,(-1)*tailleFenetre);
};

