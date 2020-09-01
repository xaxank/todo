

#setup frontend requirement

cd frontend

npm install

npm run build

cd ..

#setup backend requirement

cd backend

python3 -m venv env

pwd

source ./env/bin/activate

pip install -r requirements.txt

#setup server

cd server

python3 manage.py makemigrations

python3 manage.py migrate

cd ..

deactivate


