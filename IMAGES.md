# IMAGES — Chez Chiro V2 (accueil + menu)

Toutes les images du site sont de vraies photos de Chez Chiro ou de ses clients (site, back-office du menu, Google Maps, TikTok). Aucune photo de banque d'images, aucune image IA pour l'instant.

- Les fichiers du site sont dans `src/assets/images/`. Ils sont recadrés et réduits ; `next/image` les sert en AVIF/WebP à la bonne taille.
- Les originaux sont dans `research/raw-images/`. Les images tirées des vidéos TikTok, en pleine résolution, sont dans `research/raw-images/social/tiktok/stills/`.
- Priorité Higgsfield : **1** = à refaire en premier, **2** = à améliorer, **3** = garder tel quel.
- Colonne « Format à livrer » : la taille minimale du fichier à produire pour l'étape Higgsfield (le site le réduit lui-même). Pour remplacer une image, garder le même nom de fichier dans `src/assets/images/` : rien d'autre à changer, sauf mention contraire.

## Page d'accueil

| # | Emplacement | Fichier | Source actuelle | Affichage | Format à livrer | Priorité |
|---|---|---|---|---|---|---|
| 1 | Hero, desktop (≥ 768 px) | `hero-poulet-desktop.jpg` | Photo du menu chezchiro.com, « Poulet bicyclette braisé Complet » (`logiciel.chezchiro.com/plats/IMG_20221123_105350_519.jpg`, 2976×3968, sans filigrane) | Plein écran, sous un voile brun à 70 %, zoom lent. Image LCP, préchargée | 2560×1440 (16:9), sujet centré : le titre est centré par-dessus | **1** : la photo la plus vue. Plat métallique, éclairage plat |
| 2 | Hero, mobile (< 768 px) | `hero-poulet-mobile.jpg` | Même photo | Plein écran portrait | 1440×2400 (3:5), sujet centré | **1** |
| 3 | Image de partage (Open Graph) | `src/app/opengraph-image.jpg` | Composition : hero desktop + logo + titre + note Google, TikTok, Barbecue d'Or | Aperçu WhatsApp, Facebook, TikTok | 1200×630, à recomposer avec la nouvelle photo du hero | **1** |
| 4 | Nos plats, bloc Sauce Gbota Royal | **emplacement réservé, vide** : `sauce-gbota-royal.jpg` (à créer) | Aucune : la photo du site porte deux filigranes au milieu du plat. Le bloc est typographique en attendant | Desktop : moitié gauche du bloc brun, environ 600×480 px. Mobile : pleine largeur en haut du bloc, 4:3 | 1600×1280 minimum (5:4 ou 4:3), plat entier visible avec de la marge sur les côtés (recadrage différent desktop / mobile) | **1** : la signature de la maison. Pour l'activer : déposer le fichier, puis remplacer la ligne `const GBOTA_PHOTO = null` en haut de `src/components/home/dishes.tsx` par les 2 lignes indiquées juste au-dessus en commentaire |
| 5 | Nos plats, carte « Attiéké » | `attieke-poisson-aloco.jpg` | Image de la vidéo TikTok 7634944240405056786 (« Food Challenge Chez Chiro Partie 1 »), à 1,0 s | Carte 4:3, 280 px de large (72 % de l'écran sur mobile) | 1200×900 (4:3) | **1** : une main tient l'assiette. Plat identifié à l'œil : **à confirmer** |
| 6 | Nos plats, carte « Poulet bicyclette braisé » | `poulet-bicyclette-detail.jpg` | Même photo que le hero | Carte 4:3 | 1200×900 (4:3) | **2** |
| 7 | Nos plats, carte « Riz au gras aux petits pois » | `riz-petit-pois-crop.jpg` | Photo du menu chezchiro.com n° 12 (`IMG-20231214-WA0004.jpg`), bande du haut seulement (filigrane caché) | Carte 4:3 | 1200×900 (4:3) | **1** : on voit des boulettes de viande, absentes de la description |
| 8 | Nos plats, carte « Tapioriz au lait » | `tapioriz-au-lait.jpg` | Image de la vidéo TikTok 7698019915499883794, à 6,3 s | Carte 4:3 | 1200×900 (4:3) | **1** : image un peu floue |
| 9 | Nos plats, offre Pack Banger | aucune (bloc typographique, pas d'emplacement réservé) | La photo du site est filigranée | — | 1600×1200 si on veut l'ajouter (le pack avec le sac cadeau) | **2** |
| 10 | Chez Chiro sur TikTok, 4 vidéos | `tiktok-7558439966552935691.jpg`, `tiktok-7634944240405056786.jpg`, `tiktok-7595186991277296952.jpg`, `tiktok-7556231244745411851.jpg` | Couvertures publiques des 4 vidéos les plus vues (19/10/2026) | Cartes 9:16, la vidéo se charge au toucher | — | **3** : ce sont les vraies couvertures, à ne pas retoucher |
| 11 | La Manifestation | `affiche-manifestation.jpg` | Affiche officielle (avatar TikTok, couverture Facebook) | Affichée comme une affiche | — | **3** : document officiel |
| 12 | Épingle de la carte (Infos pratiques, pied de page), avatar de la conversation WhatsApp (« Commandez en trois étapes »), tuile logo de la page Menu | `logo-mark.png` (128×128, transparent) | Pictogramme découpé dans `logo.png` (montagnes, arc, fourchette, cuillère, sans le texte) | 32 à 88 px, sur fond crème | Pictogramme vectoriel (SVG) | **1** : à refaire à partir du logo vectoriel |

Sans image, volontairement : section Avis (typographique, logo Google en SVG), section « Commander en 3 étapes ».
La carte (section 7 et pied de page) n'est pas une image : ce sont les tuiles OpenStreetMap, chargées à l'approche.

Retirés en V2 (fichiers supprimés du site, originaux conservés dans `research/raw-images/`) :
- Petite photo du Barbecue d'Or (section TikTok), retirée à la demande. À réintroduire seulement avec la photo originale de la remise du prix.
- Marmite de gombo de l'ancien appel final « Une petite faim ? », section supprimée.

## Page Menu

Structure inspirée d'Uber Eats : bannière, vignettes carrées sur les cartes des plats. Les grandes photos de catégorie ont été retirées ; celles qui correspondaient à un plat sont devenues des vignettes.

| # | Emplacement | Fichier | Source actuelle | Affichage | Format à livrer | Priorité |
|---|---|---|---|---|---|---|
| 13 | Bannière de l'en-tête | `hero-poulet-desktop.jpg` (même fichier que le hero de l'accueil) | Photo du menu chezchiro.com, « Poulet bicyclette braisé Complet » | Desktop : 1200×288 (≈ 4:1), arrondi 8 px. Mobile : pleine largeur, 176 px de haut. Le logo chevauche le bas à gauche | 2400×800, sujet étalé sur toute la largeur et centré en hauteur (le recadrage mobile garde le milieu). Fichier à créer : `menu-banniere.jpg`, puis changer l'import dans `src/components/menu/store-header.tsx` | **1** |

### Vignettes des plats (`src/assets/images/menu/`, carrés de 112 px affichés)

Règle : une photo du menu n'est utilisée que si son filigrane ne se voit pas à cette taille. Pour les photos filigranées, on a gardé une zone du plat sans filigrane (recadrage indiqué). Format à livrer pour toutes : 800×800, plat centré, fond simple. Priorité **2** pour toutes.

| Plat | Fichier | Source | Remarque |
|---|---|---|---|
| Sauce Gbota Royal | `gbota-royal.jpg` | Menu n° 09, recadré en bas de la marmite (filigranes « Chez Chiro » et numéro hors champ) | Recadrage serré : on voit sauce, piments, oignons. Même photo Higgsfield que l'emplacement n° 4 |
| Sauce assrokouin bien garnie | `assrokouin.jpg` | Menu n° 10, moitié haute (numéro hors champ) | |
| Télibo avec sauce mouton | `telibo-sauce-mouton.jpg` | Menu n° 11, moitié basse | |
| Télibo | `telibo.jpg` | Menu n° 14, coin haut gauche | Photo d'origine très compressée |
| Riz au gras | `riz-au-gras.jpg` | Menu n° 21, bas de la photo (poisson braisé) | |
| Riz au gras aux petits pois | `riz-petit-pois.jpg` | Menu n° 12 (même recadrage que l'accueil) | Boulettes de viande, absentes de la description |
| Entrée + résistant | `entree-resistant.jpg` | Menu n° 03, bas gauche (hors-d'œuvre) | |
| Attiéké | `attieke.jpg` | Vidéo TikTok 7634944240405056786 (comme l'accueil) | Plat identifié à l'œil : à confirmer |
| Pack Banger | `pack-banger.jpg` | Menu n° 06, plateau de droite | Une partie du pack seulement |
| Poulet bicyclette braisé complet | `poulet-bicyclette.jpg` | Menu n° 17, sans filigrane | |
| Frites avec aloco | `frites-aloco.jpg` | Menu n° 16, haut de la photo (bandeau filigrane hors champ) | |
| Hors-d'œuvre à chaud | `hors-doeuvre.jpg` | Menu n° 13, bas de la photo | |
| Chawarma standard | `chawarma-standard.jpg` | Menu n° 19, moitié droite | Le site d'origine utilise cette photo pour les deux chawarmas ; elle n'est mise que sur le standard |
| Cassoulet avec pain ou gari | `cassoulet.jpg` | Menu n° 08, moitié basse | |
| Bouillie : tapioriz au lait | `tapioriz.jpg` | Vidéo TikTok 7698019915499883794 | |
| Yaourt | `yaourt.jpg` | Menu n° 23, sans filigrane | Bouteille sur gazon artificiel |
| Dèguè couscous | `degue-couscous.jpg` | Menu n° 22, sans filigrane | Même bouteille que le yaourt (choix du site d'origine) |
| Jus de bissap, de tamarin, de gingembre, d'ananas | `jus-bissap.jpg`, `jus-tamarin.jpg`, `jus-gingembre.jpg`, `jus-ananas.jpg` | Menu n° 24 à 27, sans filigrane | Gazon artificiel, peu premium |

### Plats sans vignette (le texte prend toute la largeur) — priorité 2

| Plat | Pourquoi | Format à livrer |
|---|---|---|
| Croupion de dinde | Menu n° 01 : le numéro reste visible sur toutes les zones du plat | 800×800 |
| Mélange riz au gras et cassoulet | Menu n° 07 : idem | 800×800 |
| Sauce mouton | Photo cassée sur le site d'origine (fichier de banque d'images) | 800×800 |
| Wassa-wassa | Menu n° 18 : signature « Chez Chiro » et numéro sur tout le plat | 800×800 |
| Portion de frites | Menu n° 20 : probablement une photo de banque d'images | 800×800 |
| Dèguè mil | Aucune photo | 800×800 |
| Chawarma du chef | Aucune photo propre (voir chawarma standard) | 800×800 |

Retirés de la page Menu en V2 (fichiers supprimés du site, originaux dans `research/raw-images/`) : les cinq grandes photos de catégorie. `pate-sauce-challenge.jpg` (plat non identifié) et `plat-gras-poulet.jpg` (photo d'une cliente) ne sont plus utilisés nulle part : la question de l'autorisation ne se pose plus pour le site. `cassoulet-crop.jpg` et `jus-bissap.jpg` sont remplacés par leurs vignettes.

## Logo et icônes

| # | Emplacement | Fichier | Source | Priorité |
|---|---|---|---|---|
| 14 | En-tête | `logo.png` | `research/raw-images/logo/logo-master-color-trimmed.png` (PNG réparé, 711×380) | **1** : il faut le fichier vectoriel (SVG/AI/PDF), à demander à la propriétaire ou à OWO EMPIRE |
| 15 | Pied de page, menu mobile | `logo-reversed.png` | Même logo, parties anthracite passées en crème | **1** : à faire valider, puis refaire à partir du vectoriel |
| 16 | Favicon, icône Apple | `src/app/icon.png`, `src/app/apple-icon.png` | Pictogramme du logo sur fond crème, 192 et 180 px | **2** |

## À demander à la propriétaire (par ordre de priorité)

1. Les photos originales du menu **sans filigrane**. Elles remplaceraient presque tout ce qui est en priorité 1, et donneraient une vignette aux 7 plats qui n'en ont pas.
2. Une vraie photo de la **Sauce Gbota Royal** (emplacement n° 4, déjà prêt dans le code).
3. Le **logo vectoriel** (emplacements 12, 14, 15, 16).
4. Une photo de **Chiro** en cuisine ou sur un stand. Elle n'apparaît nulle part.
5. La photo originale de la **remise du Barbecue d'Or 2022**.
6. Des photos du **lieu** s'il ouvre en décembre (vraies photos, pas le rendu de l'affiche).
7. Une photo du **Pack Banger** avec le sac cadeau, et d'un livreur avec les barquettes.
