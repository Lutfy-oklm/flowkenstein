# Flowkenstein

[English](README.md) · [Français](README.fr.md)

Tableau BPMN 2.0 gratuit et open source pour dessiner et relier les étapes d’un processus métier.

**Site : https://flowkenstein.com** · **Tableau : https://flowkenstein.com/atelier**

## Organisation

| Emplacement | Contenu |
| --- | --- |
| `src/editor.html` | Source de l’éditeur, navigation et sauvegarde locale |
| `src/home.html` | Source de la page d’accueil |
| `src/pages.json` | Pages d’aide, contact et informations légales |
| `public/` | Site publié, logos et archive des sources |
| `vendor/` | Bibliothèque BPMN, styles, police, licence et rapport d’audit |
| `scripts/` | Génération du site, des protections et de l’archive |
| `vercel.json` | Routage et en-têtes de sécurité du déploiement |

## Utilisation

Ouvrez `public/index.html`, puis le tableau. Aucune installation ni création de compte n’est nécessaire pour utiliser les fichiers générés.

Les diagrammes sont enregistrés dans le navigateur, sur l’appareil de l’utilisateur. La sauvegarde dépend du navigateur et de l’adresse du site. Exportez un fichier BPMN pour conserver ou transférer votre travail. Le dépôt ne contient pas les diagrammes des utilisateurs.

## Construire le projet

Avec une version maintenue de Node.js, depuis la racine :

```sh
npm run build
```

Les dépendances de l’éditeur sont incluses dans `vendor/`. Le build ne télécharge rien et ne nécessite aucune clé. Il génère les pages, recalcule les empreintes CSP et recrée `public/Flowkenstein-sources.zip`. Cette archive contient le projet complet, sans historique Git, archive imbriquée ni fichiers locaux privés.

## Déploiement

Vercel sert directement `public/`, sans compilation sur le serveur. Après une modification des sources, exécutez le build puis publiez aussi les fichiers générés et `vercel.json`. Deux fichiers historiques, `public/Processia.html` et `public/Processia-icone.svg`, sont conservés uniquement pour la compatibilité. Ils affichent la marque Flowkenstein. Les anciennes adresses `/Processia` et `/Processia.html` sont conservées uniquement comme redirections vers `/atelier`.

## Fonctionnalités

- Tâches, événements, passerelles et connexions BPMN 2.0.
- Couloirs alternés, hauteurs harmonisées et navigation dans les sous-processus.
- Déplacement, zoom, aimantation et retour au contenu.
- Sauvegarde locale automatique ; import et export BPMN, PNG et SVG.
- Accueil, aide, contact, mentions légales, confidentialité et conditions d’utilisation.

## Sécurité et confidentialité

La bibliothèque intégrée est bpmn-js 18.31.0. Les fichiers importés sont contrôlés avant ouverture. Les en-têtes de sécurité sont générés par `scripts/security.cjs`.

Le dépôt contient uniquement les fichiers du produit. L’adresse de contact publiée volontairement est celle affichée sur le site. Aucune sauvegarde de navigateur, capture d’écran utilisateur, document personnel, mot de passe ou clé d’accès ne doit être ajouté. Les exclusions de `.gitignore` évitent plusieurs ajouts accidentels ; elles ne remplacent pas une revue avant publication.

## Licence

Le code et les illustrations originaux sont sous licence MIT. bpmn-js conserve sa propre licence, présente dans `vendor/LICENSE-bpmn-js.txt`, et son logo doit rester visible.

## Langues

L’accueil, le tableau, l’aide et les pages d’information sont disponibles en français et en anglais. Le sélecteur FR / EN conserve le diagramme et ses libellés sur le même domaine. Le contenu anglais est dans `src/en.json` ; `scripts/i18n.cjs` génère les pages et leurs liens.
