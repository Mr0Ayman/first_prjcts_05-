# Questions Ouvertes & Recommandations pour le Client

Ce document rassemble les points d'arbitrage et recommandations techniques identifiés lors de la création de la démo 2026 pour **Marrakech Séminaires Maisons d'Hôtes**.

---

## 1. Choix du Numéro WhatsApp Principal

- **Constat** : Le site affiche actuellement deux numéros de téléphone mobiles marocains :
  - `+212 619 918 223` (qui a été associé par défaut au bouton WhatsApp et aux formulaires de la démo)
  - `+212 669 719 938`
- **Question pour le client** :
  - Lequel de ces deux numéros dispose d'un compte WhatsApp Business actif dédié à la réception des demandes de devis ?
  - Souhaitez-vous conserver ce numéro unique, ou préféreriez-vous un menu déroulant permettant au client de choisir son interlocuteur ?

---

## 2. Adresses E-mail Professionnelles (@marrakechseminairesmaisondhotes.com)

- **Constat** : Le site en ligne affiche deux adresses grand public Gmail :
  - `contact.luxurymanoir@gmail.com`
  - `nadiastrass@gmail.com`
- **Recommandation** :
  - Pour une clientèle d'affaires (organisateurs de séminaires d'entreprises du CAC 40 ou internationales) et pour des mariages haut de gamme, l'usage d'adresses professionnelles rattachées au nom de domaine officiel renforce considérablement la crédibilité et le sentiment de sécurité.
  - Nous vous recommandons de configurer deux boîtes e-mails sur votre domaine (ex. : `contact@marrakechseminairesmaisondhotes.com` et `nadia@marrakechseminairesmaisondhotes.com`) avec les protocoles d'authentification SPF, DKIM et DMARC configurés. Les messages pourront toujours être redirigés de manière transparente vers vos boîtes Gmail personnelles si vous le souhaitez.

---

## 3. Précision sur la Mention Tarifaire ("À partir de 1000 €")

- **Constat** : La bannière d'annonce indique :
  > *"DES VILLAS À PARTIR DE 1000 € pour 10 personnes"*
- **Question pour le client** :
  - Ce tarif indicatif de 1000 € correspond-il à :
    - Un tarif **par nuit** pour la villa privatisée (10 personnes) ?
    - Un tarif **par séjour / week-end** ?
    - Un forfait séminaire par personne ?
  - **Suggestion** : Ajouter la précision temporelle (ex. : *« à partir de 1 000 € / nuit pour 10 personnes »*) évite toute ambiguïté lors des demandes de devis corporate.

---

## 4. Logo en Haute Résolution (Format SVG ou PNG Transparent 300 DPI)

- **Constat** : Les fichiers d'images de logos extraits du site live (`logo-marrakech-seminaire.png` et `logo-conciergerie.png`) ont une résolution réduite (environ 110x76 pixels).
- **Recommandation** :
  - Pour un rendu parfaitement net sur les écrans modernes Retina, 4K et smartphones haut de gamme, pourriez-vous nous transmettre la version vectorielle originale de votre logo (`.SVG` ou `.AI`) ou une version PNG haute définition sur fond transparent ?

---

## 5. Canaux de Réception des Devis : WhatsApp vs E-mail Transactionnel

- **Fonctionnement dans la démo** :
  - Pour une réactivité maximale et une simplicité d'utilisation totale sans backend ni base de données, la démo statique convertit instantanément les saisies du formulaire en message WhatsApp pré-formaté et ouvre directement la conversation avec Nadia.
- **Question pour le client** :
  - Ce fonctionnement WhatsApp direct convient-il à vos habitudes de travail, ou souhaitez-vous également recevoir un double de chaque demande par e-mail via un service sécurisé (type Brevo, Formspree ou Resend) lors de la mise en ligne définitive ?

---

## 6. Inventaire des Établissements & Nouvelles Photos

- **Constat** : Le site référence 6 établissements principaux (`Les Lys Magique`, `Villa Anouar`, `Palais Paradis Hôtel`, `Villa D'Horizon`, `Riad Le Bleu de la Médina`, `Jardin Les Deux Sœurs`) et mentionne d'autres propriétés dans les listes de catégories (`Villa Palm Beach`, `Majestic Luxury Manoir`, `Royal Kasbah`, etc.).
- **Question pour le client** :
  - Souhaitez-vous que les 6 fiches détaillées actuelles soient complétées par des fiches individuelles pour l'ensemble des propriétés citées ?
  - Avez-vous des photos récentes en haute définition supplémentaires à intégrer dans les galeries photos ?
