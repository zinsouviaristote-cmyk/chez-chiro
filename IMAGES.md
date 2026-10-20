# IMAGES — Chez Chiro V2

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
| 12 | Infos pratiques, épingle de la carte | `logo-mark.png` (128×128, transparent) | Pictogramme découpé dans `logo.png` (montagnes, arc, fourchette, cuillère, sans le texte) | 42 px dans un rond crème cerclé d'orange, sur la carte et dans le pied de page | Pictogramme vectoriel (SVG) | **1** : à refaire à partir du logo vectoriel |

Sans image, volontairement : section Avis (typographique, logo Google en SVG), section « Commander en 3 étapes ».
La carte (section 7 et pied de page) n'est pas une image : ce sont les tuiles OpenStreetMap, chargées à l'approche.

Retirés en V2 (fichiers supprimés du site, originaux conservés dans `research/raw-images/`) :
- Petite photo du Barbecue d'Or (section TikTok), retirée à la demande. À réintroduire seulement avec la photo originale de la remise du prix.
- Marmite de gombo de l'ancien appel final « Une petite faim ? », section supprimée.

## Page Menu

| # | Emplacement | Fichier | Source actuelle | Format à livrer | Priorité |
|---|---|---|---|---|---|
| 13 | Catégorie « Sauces & pâtes » | `pate-sauce-challenge.jpg` | Image de la vidéo TikTok 7595186991277296952, à 2,3 s. Plat non nommé à l'écran | 1600×1200 | **1** |
| 14 | Catégorie « Riz & graines » | `plat-gras-poulet.jpg` | Photo client sur Google Maps (Lucrèce, janvier 2026). Plat non identifié avec certitude | 1600×1200 | **1** : photo d'un client, demander l'autorisation ou la remplacer avant la mise en ligne |
| 15 | Catégorie « Braisés » | `poulet-bicyclette-detail.jpg` | Photo du menu chezchiro.com (comme le hero) | 1600×1200 | **2** |
| 16 | Catégorie « Snacks » | `cassoulet-crop.jpg` | Photo du menu chezchiro.com n° 08 (`176302.jpg`), moitié basse (filigrane caché) | 1600×1200 | **2** |
| 17 | Catégorie « Douceurs & jus » | `jus-bissap.jpg` | Photo du menu chezchiro.com n° 24 (`IMG-20231130-WA0039.jpg`) | 1600×1200 | **2** : fond en gazon artificiel, peu premium |
| 18 | Lignes du menu (28 plats) | aucune photo par plat | Choix volontaire : 17 des 27 photos du menu portent un filigrane sur l'assiette | 1200×900 par plat si on ajoute des vignettes | **1** : demander les originaux sans filigrane |

## Logo et icônes

| # | Emplacement | Fichier | Source | Priorité |
|---|---|---|---|---|
| 19 | En-tête | `logo.png` | `research/raw-images/logo/logo-master-color-trimmed.png` (PNG réparé, 711×380) | **1** : il faut le fichier vectoriel (SVG/AI/PDF), à demander à la propriétaire ou à OWO EMPIRE |
| 20 | Pied de page, menu mobile | `logo-reversed.png` | Même logo, parties anthracite passées en crème | **1** : à faire valider, puis refaire à partir du vectoriel |
| 21 | Favicon, icône Apple | `src/app/icon.png`, `src/app/apple-icon.png` | Pictogramme du logo sur fond crème, 192 et 180 px | **2** |

## À demander à la propriétaire (par ordre de priorité)

1. Les photos originales du menu **sans filigrane**. Elles remplaceraient presque tout ce qui est en priorité 1.
2. Une vraie photo de la **Sauce Gbota Royal** (emplacement n° 4, déjà prêt dans le code).
3. Le **logo vectoriel** (emplacements 12, 19, 20, 21).
4. Une photo de **Chiro** en cuisine ou sur un stand. Elle n'apparaît nulle part.
5. La photo originale de la **remise du Barbecue d'Or 2022**.
6. Des photos du **lieu** s'il ouvre en décembre (vraies photos, pas le rendu de l'affiche).
7. Une photo du **Pack Banger** avec le sac cadeau, et d'un livreur avec les barquettes.
