# todo - App

To-do application absed on Django backend and ReactJS Frontend.

## How to setup & run

The below commands should be run from teh project root directory `todo/`

1. Set up the environment & dependencies
```
$ bash setup.sh
```

2. Run the backend server
```
$ bash run_backend.sh 
```
This command creates a process in the foreground on the default port 8000.

3. Run the frontend server
```
$ bash run_frontend.sh
```
Since the previous step runs the process in the foreground, this command will have to be run in a separate tab from the project root directory.