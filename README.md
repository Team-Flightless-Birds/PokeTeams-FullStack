# PokeTeams-React
PokeTeams is a full stack CRUD project for CS 4750: Database Systems course at the University of Virginia

# Deployment
## Deploying React (frontend) Project 
1. Always ensure you have done ```git pull origin main``` before you do any commits to avoid merge conflicts.
1. Ensure changes work locally on your local React server.
    - ```npm start```
2. Ensure react project can build locally
    - ```npm run build```
3. Make git commits to main branch or commit to feature branch then merge
    - ```git add ...```
    - ```git commit ...```
    - ```git push origin main```
    - Note: You do not need to commit the build folder or the node_modules folder, they are automatically ignored in .gitignore so they won't be committed.
4. A successful commit or merge to main will trigger the following:
    - Github NodeJS CI workflow will attempt to build to ensure build is successful
    - Then, Google Cloud Build Continueous Deployment will build the build folder, and upload/deploy the project to the GCP. Note: In this process, both the backend PHP and frontend React will be built and deployed even if one or the other did not have any changes.
- Note: No manual deployment to frontend (such as running ``` gcloud app deploy frontend/frontend.yaml``` ) should be necessary unless for debugging purposes.

## Deploying to PHP (backend) 
1. Always ensure you have done ```git pull origin main``` before you do any commits to avoid merge conflicts.
1. Make necessary changes to the backend contents (in the backend folder) and push the commit to main branch.
2. A successful commit or merge to main will trigger the following:
    - Github NodeJS CI workflow will attempt to build the react project to ensure build is successful
    - Then, Google Cloud Build Continueous Deployment will build the NodeJS build folder, and upload/deploy the project to the GCP. Note: In this process, both the backend PHP and frontend React will be built and deployed even if one or the other did not have any changes.
- Note: No manual deployment to the backend (such as running ``` gcloud app deploy backend/backend.yaml``` ) should be necessary unless for debugging purposes.
