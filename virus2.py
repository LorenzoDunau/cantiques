import os

def traitementDesDonneesChants(nomFichier):
    fichier = open(nomFichier,'r', encoding = 'iso-8859-1')
    codeHtml = fichier.read()
    fichier.close()
    codeHtml = codeHtml.replace('<script src="animation.js">','<script src="../../../animation.js">')
    fichier = open(nomFichier,"w", encoding = 'iso-8859-1')
    fichier.write(codeHtml)
    fichier.close()


def traitementBaseDonnees(dossier):
    listeFichier = os.listdir(dossier)
    os.chdir(dossier)
    for c in listeFichier:
        chemin = c
        if os.path.isdir(chemin):
            if estDossierChant(chemin):
                traiteDossierChant(chemin)
                os.chdir("../")
            else:
                traitementBaseDonnees(chemin)
                os.chdir("../")
    
def estDossierChant(chemin):
    chemin = os.path.basename(chemin)
    return len(chemin) == 1

def traiteDossierChant(chemin):
    listeChant = os.listdir(chemin)
    os.chdir(chemin)
    for chant in listeChant:
        if estChant(chant):
            print(chant)
            traitementDesDonneesChants(chant)
            

def estChant(chant):
    chant = os.path.basename(chant)
    return ".htm" in chant or ".html" in chant