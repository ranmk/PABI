# PABI (BiBuilders)
# 🌍 Business Intelligence Dashboards & Application (MonoFico)

## 📊 Description
Ce repository contient une collection de dashboards interactifs et d’applications web développés dans le cadre de nos projets BI (Business Intelligence). Ces outils visent à améliorer la prise de décision à travers une visualisation claire des données financières, achats, ventes, et performance fournisseur.

## 🧩 Composants principaux

### 1. Dashboards Power BI
- **Fournisseurs (Supplier Performance)** : Évalue la fiabilité, la marge moyenne, le taux de litige et les remises par fournisseur.
- **Achats (Procurement Dashboard)** : Analyse des coûts, délais de livraison, remises obtenues, et comportements d’achat.
- **Prévision des montants dus (Due Amount Forecasting)** : Utilisation de modèles prédictifs pour anticiper les montants à recevoir ou à payer.
- **Analyse temporelle des prix (Price Over Time)** : Visualisation de l’évolution des prix par période, produit ou fournisseur.

### 2. Applications Web
- **Backend** : API Flask exposant les données traitées et les modèles IA.
- **Frontend** : Interface Angular pour interagir avec les dashboards et filtrer les données dynamiquement.
- **Modèle IA** : Modèles de machine learning (K-Means, CNN...) pour la segmentation fournisseur, la détection d’anomalies et la prévision des montants.

## 📂 Structure du projet
Dashbords:
 PIII.pbix
 Backend:
 Flask
 Front:
 Angular
 Models:
 clustering.ipynb
 DelayPayment.ipynb
 ProfitMargin.ipynb
 serie temp (rana et amin).ipynb
 anomalie_detection.ipynb
 ClassificationPI (1).ipynb
 MachineLearningPI (2).ipynb
 MachinePIObj2 (2).ipynb
 SerietemporellePI (3).ipynb
 📌 Objectifs
Faciliter la prise de décision basée sur les données.
Automatiser l’analyse des performances fournisseurs.
Prédire les montants dus et optimiser la trésorerie.
Surveiller les tendances des prix pour une meilleure stratégie d’achat.

📎 Auteurs & Contributions

Haythem Kalboussi,Nesrine Bousselmi– Développement backend & IA

Rana Maknine ,Yosra challekh – Conception des dashboards Power BI

Amine Amara – Développement frontend & UX

 ## 🖼️ Aperçu de l'application MonoFico :
[Application MonoFico](C:/Users/MSI/Desktop/dashbord/1.jpeg)
<img src="C:/Users/MSI/Desktop/dashbord/1.jpeg" alt="Dashboard Fournisseurs" width="600"/>
## 🚀 Déploiement de l'application Flask

Voici les étapes pour exécuter et déployer localement l’API Flask qui alimente les dashboards et les modèles IA :


1.cloner le projet 
git clone https://github.com/ranmak/PA_BI.git
cd nom-du-projet/backend/flask_app
 2. 🐍 Créer un environnement virtuel (recommandé)
python -m venv venv    
venv\Scripts\activate
3. 📦 Installer les dépendances
pip install -r requirements.txt
4. ⚙️ Lancer l'application localement:
python app.py
5. 📤 Déploiement
Arborescence simplifiée du dossier Flask : flask_app/
├── app.py
├── models/
│   └── forecasting_model.pkl
├── static/
├── templates/
├── requirements.txt
└── README.md
et fianlment : 🧪 Test de l'API avec Postman
## 🌐 Frontend Angular

L'application Angular permet d'afficher les dashboards et d'interagir avec l'API Flask (prédiction, données).

### ▶️ Lancer l'application

```bash
cd frontend/angular-app
npm install
ng serve
Communication avec l'API Flask :
angular-app/
├── app/
│   ├── components/
│   ├── services/api.service.ts
│   └── app.module.ts
├── package.json

lien de l'application : http://localhost:4200/dashboard/overview








 
