## TICKET FLIP IONIC MOBILE APP 
    Production REPO : https://github.com/HamdiBaccar/TicketApp 
### Description
    This is a mobile app that allows users to buy and sell tickets for events. 
    The app is built using the Ionic framework. 
    The backend is built using Django and Django Rest Framework. 
    The database used is MongoDB. 
    The app is designed to be run on Android/IOS devices. 
    The app allows users to create an account, login, view events, buy tickets, and sell tickets... 
    The app also allows users to view their tickets, view their profile, and edit their profile... 
    Admin LOGIN : admin123@example.com
                  admin123
# 1 - RUN ON DOCKER
    One Command : docker compose up
# 2 - RUN ON LOCAL MACHINE
    WORK DIR : TicketApp
    steps : 
        A : RUN IONIC PROJECT (node v20.11.0): 
            1)  cd frontend 
            2)  npm install 
            3) npm i @ionic/cli@6.20.9
            4) ionic serve
        B : MIGRATE THE MONGO DB COLLECTIONS TO LOCAL MACHINE (mongo v7) :
            *)copy the db_mongo folder to the mongo data path (Example for windows :  C:\Program Files\MongoDB\Server\($mongo_version)\data)
        C : RUN BACKEND PROJECT (python 3.12) : 
            1) cd backend
            2) # Create a virtual environment (for example ./venv )
            3) # Activate the virtual environment : ~.\venv\Scripts\Activate.ps1
            2) pip install requirements.txt
            3) python manage.py runserver
# 3 - RUN ANDROID APP ON LAN
    A : BUILD AND RUN THE IONIC PROJECT TO ANDROID (Require Android SDK 33 and JAVA 17) :
        0) GET THE LAN IP OF YOUR COMPUTER (Example : 192.168.1.3)
        1) change the LAN IP in the environment.ts file to your computer's LAN IP.
        2) ionic build
        3) ionic capacitor add android
        4) ionic cap run android -livereload --external  : 
           -- Option 1 (WE USED) : RUN ON YOUR PHONE : You need to connect your phone to the same network as your computer (Using USB OR WIFI DEBUGGING)
           -- Option 2 : RUN ON EMULATOR : You need to run the emulator and connect it to the same network as your computer
    B : Serve the DJANGO BACKEND on LAN : 
        1) python manage.py runserver 0.0.0.0:8000

Early stage developpement repos :
    https://github.com/Moh4medNajjar/ticketMain (March-April 2024)
    https://github.com/Moh4medNajjar/TicketFlip (February 2024)