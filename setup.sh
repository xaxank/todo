

#setup frontend requirement

cd server/frontend/

npm install

npm run dev

cd ../..

#setup backend requirement

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


