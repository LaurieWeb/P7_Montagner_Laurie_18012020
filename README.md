<<<<<<< HEAD
# P7 - Groupomania - Créez un réseau social d’entreprise
=======
# P7 - Groupomania - Création d'une application fullstack
>>>>>>> main

## Préparation de la base de donnée

* Enregistrer le fichier sauvegarde_groupomania.sql

* Démarrer votre client MySQL

* Importer la base de donnée avec la commande :
```
mysql -u[utilisateur] -p Groupomania < sauvegarde_groupomania.sql // sur Windows
mysql Groupomania < sauvegarde_groupomania.sql // sur Linux
```
Veillez à ce que votre fichier sois situé dans le dossier où vous lancez votre terminal, ou donnez le chemin complet pour y accèder.

* Créer un fichier .ENV dans le dossier backend et entrez vos informations de connexion MySQL
```
DB_USER=nom_utilisateur_mysql
DB_PASS=motdepasse_mysql
```

----------

## Lancement du serveur backend

* Dans le terminal, à la racine du projet, saisir :

```
cd backend
```
pour travailler dans le dossier backend, puis installer le serveur node et ses modules :
```
npm install
```
* Démarer le serveur avec :
```
node server
```
ou avec
```
nodemon server
```
si vous faites des modifications.

----------

## Lancement du serveur frontend

* Dans le terminal, à la racine du projet, saisir :
```
cd frontend
```
pour travailler dans le dossier backend, puis installer Vue client :
```
npm install -g @vue/cli
```
* Installer le serveur node et ses modules :
```
npm install
```
* Démarrer le serveur avec :
```
npm run serve
```

----------

## Compte administrateur sur le réseau Groupomania

Voici les identifiants pour vous connecter au compte administrateur du réseaux Groupomania :
```
email : admin@groupomania.fr
mot de passe : adminadmin
```
