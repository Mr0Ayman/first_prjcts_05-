# Questions Ouvertes & Recommandations pour le Client (Démo 2026)

Ce document rassemble l'ensemble des arbitrages, points de validation et recommandations éditoriales et techniques nécessaires pour finaliser le site avant sa mise en production.

---

## 1. Validation des Nouveaux Libellés d'Interface (UI)
Conformément aux règles de conception ergonomique et d'accessibilité (WCAG AA), plusieurs libellés d'interface ont été intégrés dans les versions française, anglaise et espagnole. Merci de bien vouloir valider leur formulation :
- **Bouton d'action principal** : *« Demander un devis »* (EN: *« Request a Quote »*, ES: *« Pedir presupuesto »*)
- **Appel direct** : *« Appeler »* (EN: *« Call »*, ES: *« Llamar »*)
- **Messagerie instantanée** : *« WhatsApp »*
- **Navigation Services** : *« Nos Services »* (remplace l'ancien intitulé *« Nos maisons d'hôtes »*)
- **Navigation Événements & Galerie** : *« Tous les albums »*, *« Découvrir la galerie »*
- **Contrôles d'accessibilité & modales** : *« Fermer »*, *« Précédent »*, *« Suivant »*, *« Langue »*, *« Menu »*
- **Section Avis** : *« Témoignages »* (EN: *« Testimonials »*, ES: *« Testimonios »*)

---

## 2. Noms des Albums Photos (Page /events/)
Quatre albums ont été configurés dans la galerie liquid-glass d'événements :
1. **Mariages** (Day-after, réceptions au bord de l'eau, couchers de soleil)
2. **Soirée berbère** (Intègre les **10 photos réelles** transmises : tables de banquet, tarbouches marocains, amphores en terre cuite, lustres en osier, espace lounge en plein air)
3. **Soirée [NOM À CONFIRMER]** : Nom d'album à confirmer par le client (actuellement configuré avec les photos de spectacles DJ, cracheur de feu et danses orientales).
4. **Cuisine marocaine** (Buffets traiteur et dégustations orientales)

> **Action client** : Merci de nous indiquer le titre définitif souhaité pour l'album *« Soirée [NOM À CONFIRMER] »* (ex. : *« Soirées Mille et Une Nuits »*, *« Soirées Privées & Spectacles »* ou *« Soirées Corporate »*).

---

## 3. Services Événementiels & Cartes à Confirmer
1. **Section « Team building »** :
   - Ce service figure dans la navigation déroulante mais ne fait l'objet d'aucun texte dans la copie d'origine de votre site live.
   - Il affiche actuellement la mention explicite `[DESCRIPTION À CONFIRMER]`.
   - **Action client** : Souhaitez-vous nous fournir une description personnalisée (environ 2 à 3 phrases) pour valoriser vos offres de team building (activités dans le désert d'Agafay, ateliers cuisine, olympiades en villa, etc.) ?
2. **Cartes de services sur la page d'accueil** :
   - En plus des 4 services verbatim extraits de votre présentation (transfert aéroport, dégustations orientales, DJ/cracheur de feu/folklore, Nadia comme interlocutrice unique), 4 cartes d'attente `[SERVICE À CONFIRMER 1]` à `[SERVICE À CONFIRMER 4]` ont été prévues.
   - **Action client** : Avez-vous des services complémentaires à mettre en avant (ex. : *Excursions & Quads*, *Privatisation d'hélicoptère*, *Bien-être & Spa privatif*, *Conciergerie VIP*) ?

---

## 4. Traduction Multilingue (DRAFT EN / ES)
- Les versions anglaise (`/en/...`) et espagnole (`/es/...`) ont été générées statiquement à partir de `data/i18n/en.json` et `data/i18n/es.json`.
- **Note de conformité** : Ces traductions constituent un **brouillon de traduction assistée (DRAFT)**.
- **Recommandation** : Faire relire ces versions par un locuteur natif anglophone et hispanophone spécialisé dans l'hôtellerie de luxe pour valider les subtilités d'expression avant toute campagne d'acquisition internationale.
- Les noms de propriétés, numéros de téléphone, adresses e-mail et adresses physiques ont été scrupuleusement conservés intacts sans traduction.

---

## 5. Texte de la Page « À propos » (/about-us/)
- Le texte commercial direct, percutant et énergique a été intégré tel quel sous le hero de la page `/about-us/` :
  > *« Écoutez-moi bien. Votre prochain événement n'a pas besoin d'être « correct ». Il doit être inoubliable... »*
- Aucune signature personnelle n'a été ajoutée, conformément à la consigne.
- **Action client** : Confirmez-vous l'utilisation de cette voix directe pour la page À Propos, ou préférez-vous un format institutionnel classique ?

---

## 6. Témoignages Clients : Source, Consentement & RGPD
- La section Témoignages est pilotée dynamiquement par le fichier `data/testimonials.json`.
- **Règle stricte** : Conformément à la législation européenne et aux bonnes pratiques éthiques, aucun faux avis, fausse note étoilée ou faux compteur n'a été créé.
- Le système n'affiche que les témoignages ayant `consent: true`. En l'absence de retours validés par écrit, 3 cartes d'attente explicites `[TÉMOIGNAGE À CONFIRMER]` sont affichées pour permettre d'apprécier le design.
- **Action client** : Pourriez-vous nous transmettre 3 à 5 vrais témoignages de clients passés (Prénom, type d'événement, date approximative, court paragraphe) avec leur accord pour publication sur le site ?

---

## 7. Choix du Numéro WhatsApp Principal
- Le site affiche actuellement deux numéros mobiles marocains :
  - `+212 619 918 223` (configuré par défaut sur le bouton flottant WhatsApp et le formulaire de devis)
  - `+212 669 719 938`
- **Action client** : Confirmez-vous que le numéro `+212 619 918 223` est bien le compte WhatsApp Business dédié à la réception des demandes de réservation ?

---

## 8. Adresses E-mail Professionnelles (Domaine vs Gmail)
- Le site utilise actuellement deux adresses Gmail : `contact.luxurymanoir@gmail.com` et `nadiastrass@gmail.com`.
- **Recommandation technique** : Pour rassurer les directeurs d'achats, agences événementielles et mariés haut de gamme, nous préconisons la création d'adresses sur le domaine officiel (ex. : `contact@marrakechseminairesmaisondhotes.com` et `nadia@marrakechseminairesmaisondhotes.com`) avec protocoles SPF, DKIM et DMARC configurés. Les courriels peuvent être automatiquement redirigés vers vos boîtes Gmail existantes.

---

## 9. Précision Tarifaire : Bannière « À partir de 1000 € »
- La bannière indique : *« DES VILLAS À PARTIR DE 1000 € pour 10 personnes »*.
- **Question pour le client** :
  - Ce tarif de base de 1 000 € correspond-il à un montant **par nuitée**, **par séjour / week-end**, ou **par personne** ?
  - Ajouter la mention temporelle (ex. : *« à partir de 1 000 € / nuit pour 10 personnes »*) protégera votre équipe contre tout malentendu lors de l'envoi des devis.

---

## 10. Fichier Logo en Haute Définition
- Les logos actuels sont des vignettes basse résolution (110x76 px).
- Pour garantir un affichage net sur écrans Retina, iPhone, iPad et écrans 4K, merci de nous transmettre le logo au format vectoriel (`.SVG` ou `.AI`) ou en PNG transparent haute résolution (minimum 1000 px de large).


---

## 11. Photo Hero Page d'Accueil (4K - Vue Koutoubia & Montagnes de l'Atlas)
- Le hero de la page d'accueil adopte désormais le format plein écran (100vh) edge-to-edge avec menu sous forme de pill translucide et dégradé forest.
- Une image d'attente 4K (3840x2160) au thème *Terre & Architecture* est actuellement configurée.
- **Action client** : Remplacer cette image par une photo réelle grand angle ou prise par drone de vos propriétés ou d'un panorama de Marrakech (Koutoubia et chaîne de l'Atlas au coucher du soleil).
- **Emplacement du fichier** : Déposer le fichier original 4K dans `assets/originals/hero/home.jpg` puis exécuter `npm run images && npm run build`.

---

## 12. Harmonisation et Validation des Intitulés des 8 Services
Pour assurer une parfaite cohérence ergonomique et éditoriale sur l'ensemble du site, les intitulés des 8 prestations événementielles ont été harmonisés de manière rigoureusement identique dans :
- Le menu déroulant desktop (« Nos Services »)
- Le tiroir de navigation mobile
- Les titres principaux (H1) de chaque page dédiée (`/nos-services/<slug>/`)
- Les cartes de la page récapitulative (`/nos-services/`)
- Le sélecteur du formulaire de devis (« Type d'événement »)

**Intitulés soumis à validation client :**
1. **Séminaires d'entreprise** (EN: *Corporate Seminars*, ES: *Seminarios de Empresa*)
2. **Mariages d'exception** (EN: *Exclusive Weddings*, ES: *Bodas Exclusivas*)
3. **Anniversaires & Célébrations** (EN: *Birthdays & Celebrations*, ES: *Cumpleaños y Celebraciones*)
4. **Team building** (EN: *Team Building*, ES: *Team Building*)
5. **Fêtes de famille** (EN: *Family Gatherings*, ES: *Fiestas Familiares*)
6. **Lancements de produit** (EN: *Product Launches*, ES: *Lanzamientos de Producto*)
7. **Stages de yoga & bien-être** (EN: *Yoga & Wellness Retreats*, ES: *Retiros de Yoga y Bienestar*)
8. **Soirées et animations** (EN: *Evenings & Entertainment*, ES: *Veladas y Animaciones*)

> **Action client** : Merci de valider ces intitulés définitifs ou de nous signaler toute nuance souhaitée (ex. : « Team building & Cohésion », « Retraites bien-être »).

---

## 13. En-tête de Colonne « Capacités » dans le Pied de Page
- Le pied de page comporte désormais une colonne structurée intitulée **« Capacités »** regroupant les accès rapides par taille de groupe :
  - *5 à 10 personnes*
  - *10 à 20 personnes*
  - *20 à 40 personnes*
  - *40 à 60 personnes*
- **Précision éditoriale** : Cet intitulé « Capacités » a été ajouté pour des raisons d'ergonomie et de navigation intuitive, mais ne figurait pas textuellement dans la copie d'origine de votre site live.
- **Action client** : Confirmez-vous le titre de colonne « Capacités » ou préférez-vous une formulation alternative (ex. : *« Nos Villas par Capacité »*, *« Tailles de Groupe »* ou *« Hébergement & Capacité »*) ?
