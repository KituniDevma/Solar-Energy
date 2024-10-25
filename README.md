# Solar Energy Forecasting Web App

This is a web application designed to forecast solar energy production using multivariate time series forecasting with solar radiation and weather data. The app features a React frontend and a Django backend, with a MySQL database for data storage.

## Features
- User registration and login
- Weather and solar radiation data collection and forecasting
- Location-based data storage and forecasting
- Accessible and responsive UI

## Tech Stack
- **Frontend**: React
- **Backend**: Django (Python)
- **Database**: MySQL

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL Server
- Git

### Backend Setup

1. **Clone the Repository:**
   ```
   git clone https://github.com/KituniDevma/Solar-Energy.git
   cd Solar-Energy
   ```

2. **Set up virtual environment and install dependencies:**
    ```
    cd backend
    python3 -m venv env
    source env/bin/activate   # Use 'env\Scripts\activate' on Windows
    pip install -r requirements.txt
    ```
3. **Database Configuration:**
    - Create a .env file in the backend directory with the following variables
    ```
        DB_NAME=your_db_name
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_HOST=your_db_host
        DB_PORT=your_db_port
    ```

4. **Create and Run Migrations:**
    ```
        python manage.py makemigrations
        python manage.py migrate
    ```

5. **Run Backend Server:**
    ```
        python manage.py runserver
    ```

## Frontend Setup

1. **Navigate to the frontend folder and install dependencies:**
    ```
        cd ../frontend
        npm install
    ```

2. **Run Frontend Server:**
    ```
        npm start
    ```