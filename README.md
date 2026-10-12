# Processia

Un tableau libre, gratuit et en français pour cartographier les processus métier en BPMN 2.0.

## Fonctionnalités

- Tâches, événements, passerelles et connexions BPMN 2.0.
- Couloirs alternés, noms d’acteurs lisibles et hauteurs harmonisées.
- Déplacement, zoom et redimensionnement.
- Sauvegarde locale automatique dans le navigateur.
- Import et enregistrement de fichiers BPMN ; export PNG et SVG.
- Page d’accueil et accès sans compte.

## Utilisation

Le site prêt à servir est dans public/. Ouvrez public/index.html pour la page d’accueil,
ou public/Processia.html pour accéder au tableau. Aucune installation n’est nécessaire.

La sauvegarde automatique est propre à l’appareil, au navigateur et à l’adresse du site.
Enregistrez vos diagrammes en fichiers BPMN pour les conserver et les transférer.

## Modifier le code

Les modèles HTML se trouvent dans src/. La bibliothèque BPMN, les styles et la police
sont dans vendor/. Pour regénérer les pages après modification, exécutez :

```sh
node scripts/build.cjs
```

## Déployer sur Vercel

Importez ce dépôt dans Vercel. La configuration vercel.json sert public/ directement,
sans commande de compilation ni variable secrète. Chaque nouveau push peut déclencher
automatiquement une mise à jour via l’intégration GitHub de Vercel.

## Licence

Le code original de Processia est sous licence MIT. La bibliothèque bpmn-js conserve
sa licence (vendor/LICENSE-bpmn-js.txt), qui impose l’affichage de son logo.
