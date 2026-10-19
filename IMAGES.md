# IMAGES — Chez Chiro V1

Toutes les images du site sont de vraies photos de Chez Chiro ou de ses clients (site, back-office du menu, Google Maps, TikTok). Aucune photo de banque d'images, aucune image IA.

- Les fichiers du site sont dans `src/assets/images/`. Ils sont recadrés et réduits ; `next/image` les sert en AVIF/WebP à la bonne taille.
- Les originaux sont dans `research/raw-images/`. Les images tirées des vidéos TikTok, en pleine résolution, sont dans `research/raw-images/social/tiktok/stills/`.
- Priorité Higgsfield : **1** = à refaire en premier, **2** = à améliorer, **3** = garder tel quel.

## Page d'accueil

| Emplacement | Fichier | Source | Traitement | Priorité |
|---|---|---|---|---|
| Hero, plein écran, desktop (≥ 768 px) | `hero-poulet-desktop.jpg` | Photo du menu chezchiro.com, « Poulet bicyclette braisé Complet » (`logiciel.chezchiro.com/plats/IMG_20221123_105350_519.jpg`, 2976×3968, sans filigrane) | Recadrage 16:9 sur toute la largeur, 2560×1440. Image LCP, préchargée (media query), AVIF/WebP qualité 60, voile brun 70 % (texte centré), zoom lent (Ken Burns) | **1** : la photo la plus vue du site. Plat métallique, éclairage plat. Idéalement une photo horizontale du plat ou de la cuisine |
| Hero, plein écran, mobile (< 768 px) | `hero-poulet-mobile.jpg` | Même photo | Recadrage portrait 3:5, 1440×2400. Préchargée (media query), qualité 50 | **1** : même remarque |
| Image de partage (Open Graph) | `src/app/opengraph-image.jpg` | Composition : recadrage desktop du hero + logo + titre « Votre déjeuner signé Chez Chiro. » + bouton WhatsApp + note Google, TikTok, Barbecue d'Or | 1200×630, Figtree | **1** : à refaire avec la nouvelle photo du hero |
| « Nos plats », carte « Attiéké » | `attieke-poisson-aloco.jpg` | Image de la vidéo TikTok 7634944240405056786 (« Food Challenge Chez Chiro Partie 1 », 10,9 M de vues), à 1,0 s | Recadrée sur l'assiette, 720 px. Une main tient l'assiette | **1**. Plat reconnu à l'œil comme attiéké-poisson-aloco : **à confirmer** |
| « Nos plats », carte « Poulet bicyclette braisé » | `poulet-bicyclette-detail.jpg` | Même photo que le hero | Autre recadrage, 1200 px, qualité 60 | **2** |
| « Nos plats », carte « Riz au gras aux petits pois » | `riz-petit-pois-crop.jpg` | Photo du menu chezchiro.com n° 12 (`IMG-20231214-WA0004.jpg`) | Bande du haut seulement, pour cacher le filigrane « 60408324 » | **1** : on voit des boulettes de viande, absentes de la description du plat |
| « Nos plats », carte « Tapioriz au lait » | `tapioriz-au-lait.jpg` | Image de la vidéo TikTok 7698019915499883794 (« Tapioriz au lait crémeux »), à 6,3 s | Recadrée sous le texte TikTok et l'affiche incrustée | **1** : image un peu floue |
| « Nos plats », bloc Sauce Gbota Royal | aucune (bloc typographique brun) | — | La photo du site porte deux filigranes au milieu du plat | **1** : prioritaire, c'est la signature de la maison. Une vraie photo remplacerait le bloc typographique |
| « Nos plats », offre Pack Banger | aucune (bloc typographique) | — | La photo du site est filigranée | **2** : photo du pack avec le sac cadeau |
| « Chez Chiro sur TikTok », 4 vidéos (carrousel sur mobile) | `tiktok-7558439966552935691.jpg`, `tiktok-7634944240405056786.jpg`, `tiktok-7595186991277296952.jpg`, `tiktok-7556231244745411851.jpg` | Couvertures publiques des 4 vidéos les plus vues (onglet « Populaire », 19/10/2026) | 540 px. La vidéo se charge seulement au toucher | **3** : ce sont les vraies couvertures |
| « Chez Chiro sur TikTok », petite photo du prix | `barbecue-or-2022-polaroid.jpg` | Recadrage de leur publication photo TikTok 7697367858166238471 (« EN 2022, ON REPARTAIT AVEC UN BARBECUE D'OR ! »). Visage flouté par eux | Recadré sur le polaroïd, 545 px | **1** : demander la photo originale de la remise du prix |
| La Manifestation | `affiche-manifestation.jpg` | Affiche officielle (avatar TikTok, couverture Facebook) | 1080 px, affichée comme une affiche | **3** : document officiel, à garder |
| Appel final (desktop seulement) | `marmite-gombo.jpg` | Image de la vidéo TikTok 7697944752087420168, à 9,7 s, sans texte incrusté | Recadrée, 720 px | **2** |

## Page Menu

| Emplacement | Fichier | Source | Traitement | Priorité |
|---|---|---|---|---|
| Catégorie « Sauces & pâtes » | `pate-sauce-challenge.jpg` | Image de la vidéo TikTok 7595186991277296952 (« Food Challenge », 8,3 M de vues), à 2,3 s | Recadrée sur l'assiette. Plat non nommé à l'écran | **1** |
| Catégorie « Riz & graines » | `plat-gras-poulet.jpg` | Photo client sur Google Maps (Lucrèce, janvier 2026) | Recadrée, 1400 px. Plat non nommé (identification incertaine) | **1** : photo d'un client. Demander l'autorisation ou la remplacer avant la mise en ligne |
| Catégorie « Braisés » | `poulet-bicyclette-detail.jpg` | Photo du menu chezchiro.com (comme le hero) | — | **2** |
| Catégorie « Snacks » | `cassoulet-crop.jpg` | Photo du menu chezchiro.com n° 08 (`176302.jpg`) | Moitié basse seulement, pour cacher le filigrane | **2** |
| Catégorie « Douceurs & jus » | `jus-bissap.jpg` | Photo du menu chezchiro.com n° 24 (`IMG-20231130-WA0039.jpg`) | 1080 px | **2** : fond en gazon artificiel, peu premium |
| Lignes du menu (28 plats) | aucune photo par plat | — | Choix volontaire : 17 des 27 photos du menu portent un filigrane au milieu de l'assiette ; les autres sont surtout des boissons sur gazon artificiel | **1** : demander les originaux sans filigrane (sur le téléphone ou dans WhatsApp de la propriétaire). C'est la demande la plus utile |

## Logo et icônes

| Emplacement | Fichier | Source | Traitement | Priorité |
|---|---|---|---|---|
| En-tête | `logo.png` | `research/raw-images/logo/logo-master-color-trimmed.png` (site, PNG réparé, 711×380) | Tel quel | **1** : il faut le fichier vectoriel (SVG/AI/PDF), à demander à la propriétaire ou à OWO EMPIRE |
| Pied de page, menu mobile | `logo-reversed.png` | Même logo | Version pour fond brun : les parties anthracite passent en crème, l'orange ne change pas | **1** : faire valider cette version par la propriétaire. À refaire à partir du vectoriel |
| Favicon, icône Apple | `src/app/icon.png`, `src/app/apple-icon.png` | Le pictogramme du logo (montagnes, arc, fourchette et cuillère) sans le texte | 192 px et 180 px, fond crème | **2** |

## À demander à la propriétaire (par ordre de priorité)

1. Les photos originales du menu **sans filigrane**. Elles remplaceraient presque tout ce qui est en priorité 1.
2. Une vraie photo de la **Sauce Gbota Royal**.
3. Le **logo vectoriel**.
4. Une photo de **Chiro** en cuisine ou sur un stand. Elle n'apparaît nulle part en V1.
5. La photo originale de la **remise du Barbecue d'Or 2022**.
6. Des photos du **lieu** s'il ouvre en décembre (vraies photos, pas le rendu de l'affiche).
7. Une photo du **Pack Banger** avec le sac cadeau, et d'un livreur avec les barquettes.
