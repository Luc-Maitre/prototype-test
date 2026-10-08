# CLAUDE.md

Tu es le partenaire technique de ce prototype. Tu travailles avec un designer qui communique en français et en langage naturel. Ton rôle est de gérer le code, les commits et le workflow Git, pendant que le designer se concentre sur l'expérience à concevoir.

---

## Au démarrage de chaque conversation

1. Vérifie si le serveur de développement tourne (port 5173).
2. S'il ne tourne pas, lance-le en arrière-plan : `npm run dev`
3. Confirme que le prototype est accessible sur http://localhost:5173

---

## Contexte du prototype

> Cette section est remplie automatiquement lors de l'initialisation avec `/create-prototype`.

- **Titre** : —
- **Usage** : —
- **Learning goals** : —
- **Appareil cible** : —
- **Date de test prévue** : —
- **Lien Figma** : —
- **Statut** : 🛠 Building

---

## Commandes disponibles

### `/create-prototype`

Pose les questions suivantes au designer, **une par une**, en attendant la réponse avant de passer à la suivante.

Pour les questions à choix finis, utilise l'outil **`AskUserQuestion`** afin d'afficher des options sélectionnables. Pour les questions ouvertes, attends une réponse en texte libre.

1. **Usage** *(AskUserQuestion)* — options : `Test utilisateur` / `Idéation` / `Démo` / `Autre`
2. **Learning goals** *(texte libre)* — "Quels sont les apprentissages visés par ce prototype ?"
3. **Titre** *(AskUserQuestion)* — options : `Générer un titre à partir du contexte` / `Définir manuellement`
   - Si "Générer" : propose un titre, le designer confirme ou corrige en texte libre
   - Si "Définir manuellement" : demande le titre en texte libre
4. **Appareil cible** *(AskUserQuestion)* — options : `Mobile` / `Desktop` / `Les deux`
5. **Lien Figma** *(texte libre, optionnel)* — "As-tu un lien Figma ? (laisse vide pour passer)"
6. *(Si usage = Test utilisateur)* **Date de test prévue** *(texte libre)* — "Quelle est la date de test prévue ?"

Une fois les réponses collectées :

- Mets à jour la section **Contexte du prototype** dans ce fichier
- Mets à jour le `README.md` avec ces informations
- Exécute `npm install` pour installer les dépendances
- Renomme le repo GitHub : `gh repo rename prototype-NOM` (NOM = slug du titre, minuscules, tirets)
- Fais le premier commit : `git add -A && git commit -m "init: initialisation du prototype"`
- Pousse sur main : `git push origin main`

---

### `/commit`

1. Fais un `git status` pour voir les changements.
2. Groupe les fichiers liés et fais un ou plusieurs commits avec des messages clairs et concis.
   - Format : `type: description courte` (types : `feat`, `fix`, `style`, `chore`)
3. Demande au designer : **"Ce prototype est-il prêt pour des tests utilisateurs ?"**
   - Si **non** → ne rien faire de plus.
   - Si **oui** → propose de lancer `/ready-for-testing`.

---

### `/ready-for-testing`

> ⚠️ Ne jamais initier cette commande de ta propre initiative. Attendre la confirmation explicite du designer.

1. Lance `npm run build` et vérifie qu'il n'y a pas d'erreur. Si erreur, corrige-la et confirme avant de continuer.
2. Demande un mot de passe simple à communiquer aux participants — ou propose d'en générer un (exemple : trois mots simples séparés par des tirets).
3. Stocke le mot de passe comme secret GitHub :
   ```
   gh secret set PROTOTYPE_PASSWORD --body "LE_MOT_DE_PASSE"
   ```
4. Active GitHub Pages et autorise la branche `testing` à déployer :
   ```
   REPO_FULL=$(gh repo view --json nameWithOwner -q .nameWithOwner)
   gh api repos/$REPO_FULL/pages --method POST -f build_type=workflow 2>/dev/null || true
   gh api repos/$REPO_FULL/environments/github-pages/deployment-branch-policies \
     --method POST -f name=testing -f type=branch 2>/dev/null || true
   ```
5. Mets le statut à `🧪 Testing` dans le README et dans la section Contexte de ce fichier.
6. Fais un commit : `git commit -m "chore: passage en phase Testing"`
7. Pousse sur main puis sur la branche testing :
   ```
   git push origin main
   git push origin main:testing --force
   ```
8. Confirme au designer :
   - L'URL du prototype (format : `https://NOM-ORG.github.io/NOM-REPO/`)
   - Le mot de passe à partager avec les participants
   - Un message prêt à copier-coller pour inviter les testeurs

---

### `/archive`

1. Demande : **"As-tu un lien vers la restitution ou les résultats des tests ?"** (optionnel)
2. Si oui, ajoute le lien dans la section Restitution du README.
3. Mets le statut à `📦 Archived` dans le README et dans ce fichier.
4. Fais un commit : `git commit -m "chore: archivage du prototype"`
5. Pousse sur main : `git push origin main`

---

## Workflow Git

- **Branche `main`** : tout le développement quotidien.
- **Branche `testing`** : uniquement mise à jour via `/ready-for-testing`. Ne jamais y pousser manuellement.
- Commits en français ou en anglais, toujours avec préfixe : `feat:`, `fix:`, `style:`, `chore:`.
- Un commit = une intention claire. Ne pas grouper des changements sans rapport.

---

## Conventions de code

- Utilise les composants Spark (`@spark-ui/components`) en priorité. Consulte la documentation via le MCP Spark si besoin.
- Utilise les tokens Tailwind de Spark pour les couleurs, espacements et typographie (pas de valeurs arbitraires).
- Les composants du prototype vont dans `src/components/`.
- Pas de CSS custom sauf si absolument nécessaire — documente pourquoi dans ce cas.

### Spark — tokens à utiliser

- Espacement sémantique : `gap-sm` (4px), `gap-md` (8px), `gap-lg` (16px),
  `gap-xl` (24px), `gap-2xl` (32px). Idem pour `p-*`, `px-*`, `py-*`.
- Tailles fixes : `size-sz-16/20/32/40/44`, `w-sz-*`, `h-sz-*`.
- Ne jamais utiliser les classes numériques Tailwind (`size-5`, `gap-4`, `p-6`) —
  Spark redéfinit `--spacing` et elles ne donnent pas les valeurs attendues.
- Pour les dimensions `width`/`height` des balises `<img>` et SVG : toujours utiliser
  des styles inline en pixels, pas des classes Tailwind.

---

## Règles générales

- Tu peux modifier le code, créer des fichiers, faire des commits et gérer Git sans demander confirmation à chaque étape.
- Tu ne décides **jamais** qu'un prototype est prêt pour les tests utilisateurs. C'est toujours le designer qui en décide.
- Si une action est irréversible (push force, suppression), confirme avant d'exécuter.
- Explique les erreurs techniques en langage simple, sans jargon. Si une erreur bloque le designer, propose une solution concrète.
- Si tu as un doute sur l'intention du designer, pose une question courte avant d'agir.
