# Mentions Légales — Version Actuelle (Démo)

> **Document juridique en vigueur** pour la landing page et la version Démo (`demo.nuxipro.com`).
> La version Cloud n'est pas encore disponible — ses mentions légales seront ajoutées lors du lancement.

---

## 1. Éditeur du Site

- **Nom :** Sébastien Babas
- **Contact :** contact@nuxipro.com
- **Conformément à l'article 6-III-2 de la loi LCEN**, l'éditeur a choisi de ne pas divulguer son adresse personnelle, celle-ci ayant été transmise de manière sécurisée à l'hébergeur.

---

## 2. Hébergement

- **Hébergeur :** Cloudflare, Inc.
- **Adresse :** 101 Townsend Street, San Francisco, CA 94107, États-Unis
- **Contact :** https://www.cloudflare.com/contact

---

## 3. Propriété Intellectuelle

L'ensemble des éléments constituant le service (code source, architecture, design UI/UX, interfaces graphiques, logos, éléments visuels, marques et documentations) est la propriété exclusive de l'éditeur et est protégé par les lois internationales sur le droit d'auteur et la propriété intellectuelle.

L'utilisation du service ne confère à l'utilisateur aucun droit de propriété intellectuelle sur l'application.

**Interdictions :**
- Rétro-ingénierie, décompilation, désassemblage
- Copie, reproduction, modification ou création d'œuvres dérivées
- Utilisation de robots, scrapers ou moyens automatisés

---

## 4. Nature du Service (Démo)

La version Démo (`demo.nuxipro.com`) est un **Proof of Concept / MVP** mis à disposition à des fins de :

- **Test et évaluation** de l'application
- **Démonstration technique** des fonctionnalités

**Elle ne constitue pas un service de production et ne doit pas être utilisée pour des données critiques, confidentielles ou irremplaçables.**

---

## 5. Stockage des Données

### 5.1 Stockage 100% Local (`localStorage`)

- Toutes les tâches, colonnes et configurations sont stockées **exclusivement dans le `localStorage`** du navigateur de l'utilisateur.
- **Aucune donnée n'est transmise, stockée ou traitée sur nos serveurs distants.**
- Les données persistent indéfiniment dans le navigateur tant que l'utilisateur ne les supprime pas.

### 5.2 Risque de Perte de Données

⚠️ **Avertissement important :** Les données stockées dans le navigateur peuvent être perdues de manière définitive dans les cas suivants :
- Suppression du cache du navigateur
- Utilisation d'un autre navigateur ou appareil
- Paramètres de confidentialité du navigateur
- Mise à jour du navigateur

**L'utilisateur assume l'entière responsabilité des risques liés à l'utilisation de cet outil expérimental.**

### 5.3 Limites d'Usage

- Il n'y a **aucune limite technique imposée par le serveur** (pas de limite de tâches, de colonnes ou de stockage côté serveur).
- Toute la gestion est effectuée côté navigateur.
- La durée de vie de la démo est **indéfinie** mais l'éditeur peut l'arrêter à tout moment sans préavis.

---

## 6. Analytics & Session Recording

### 6.1 PostHog — Analytics Anonymes

Nous utilisons **PostHog** pour collecter des données d'utilisation anonymes dans le but d'améliorer le produit :

- **Données collectées :** Pages visitées, clics, navigation, interactions UI
- **Données NON collectées :** Contenu de tâches, noms de tâches, données personnelles, frappes clavier
- **Rétention :** 30 jours, puis suppression automatique

### 6.2 Session Recording — Mode Confidentialité Totale

L'enregistrement de session est **optionnel et désactivé par défaut**.

- L'utilisateur doit donner son **consentement explicite** pour activer l'enregistrement.
- **Aucun texte saisi n'est visible** — tous les champs de texte sont automatiquement masqués et floutés à la source avant transmission.
- Seules les **interactions UI** (clics, navigation, parcours) sont enregistrées.
- **Rétention :** 30 jours, puis suppression automatique.

### 6.3 Consentement

- **Opt-in strict :** Aucun outil d'analyse ou d'enregistrement de session n'est exécuté sans le consentement préalable explicite de l'utilisateur.
- **Bandeau de cookies :** Un bandeau de consentement s'affiche lors de la première visite de la démo, permettant à l'utilisateur d'accepter ou refuser les cookies d'analyse et l'enregistrement de session.
- L'utilisateur peut modifier ses préférences à tout moment via l'icône de paramètres.

---

## 7. RGPD & Droits de l'Utilisateur

Conformément au Règlement Général sur la Protection des Données (RGPD), l'utilisateur dispose des droits suivants :

- **Droit d'accès** à ses données personnelles
- **Droit de rectification** des données inexactes
- **Droit d'effacement** (droit à l'oubli)
- **Droit à la limitation** du traitement
- **Droit à la portabilité** des données
- **Droit d'opposition** à tout moment

**Note :** Étant donné que toutes les données sont stockées localement dans le navigateur de l'utilisateur, celui-ci peut les effacer à tout moment via les paramètres de son navigateur.

Pour exercer ces droits, contactez-nous à : contact@nuxipro.com

---

## 8. Cookies & Stockage Local

La démo utilise un **bandeau de consentement** qui s'affiche lors de la première visite, permettant à l'utilisateur de choisir s'il accepte ou refuse les cookies d'analyse et l'enregistrement de session.

### 8.1 Cookies Essentiels (sans consentement)

| Cookie | Finalité | Durée |
|--------|----------|-------|
| `nuxipro_cookie_consent` | Mémorise le choix de consentement (accepté/refusé) | Session |
| `nuxipro_cookie_recording` | État de l'enregistrement session | Session |

### 8.2 Cookies d'Analyse (avec consentement)

| Cookie | Finalité | Durée |
|--------|----------|-------|
| PostHog (`ph_*`) | Analytics anonymes et session recording | 12 mois |

---

## 9. Responsabilité

### 9.1 Service "En l'état" (As-Is)

Le service est fourni « en l'état », sans garantie explicite ou implicite d'ininterruption ou d'absence d'erreurs.

### 9.2 Exonération de Responsabilité

L'éditeur ne pourra être tenu responsable :
- Des dommages directs ou indirects résultant de l'utilisation du service
- De la perte de données survenue dans le cadre de l'utilisation de la version Démo (stockée uniquement en local)
- Des interruptions de service imputables à des tiers ou à des cas de force majeure

### 9.3 Données Utilisateur

L'utilisateur conserve la pleine et entière propriété des données, contenus et tâches qu'il crée dans l'application.

---

## 10. Droit Applicable

Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.

---

## 11. Contact

Pour toute question relative à ces mentions légales ou à l'exercice de vos droits, contactez-nous à :

**contact@nuxipro.com**

---

*Dernière mise à jour : août 2026*
