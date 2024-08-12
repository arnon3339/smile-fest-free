# Smile Festival - Scientific Quiz

This project is a web application that serves as a scientific quiz platform. The frontend is built using Next.js, and the backend is powered by Python, which handles the database operations.

## Features

- **Scientific Quiz**: Engage users with scientifically themed quizzes.
- **Next.js Frontend**: A modern, responsive frontend built with Next.js.
- **Python Backend**: A robust backend developed in Python to manage database operations and quiz data.
- **Database Management**: The backend populates and manages the quiz questions and user data in the database.

## How It Works

1. **Next.js Frontend**: The frontend provides a user-friendly interface for participants to take the quiz. It interacts with the backend to fetch quiz questions and submit answers.
2. **Python Backend**: The backend is responsible for database operations such as populating quiz questions, storing user responses, and managing quiz data.

## Installation

1. **Clone the repository**:
   git clone <repository-url>

2. **Navigate to the project directory**:
   cd smile-festival-free

3. **Install Frontend Dependencies**:
   Navigate to the `frontend` directory and install the necessary packages:
   cd frontend
   npm install

4. **Install Backend Dependencies**:
   Navigate to the `backend` directory and install the necessary Python packages:
   cd backend
   pip install -r requirements.txt

## Usage

1. **Running the Frontend**:
   Start the Next.js development server:
   npm run dev
   The frontend will be available at `http://localhost:3000`.

2. **Running the Backend**:
   Start the Python backend server:
   python main.py
   The backend will handle database operations and interact with the frontend.

## Requirements

- Node.js and npm (for the frontend)
- Python 3.x (for the backend)
- Required Python libraries listed in `requirements.txt`

## Example

1. Frontend: Access the quiz interface through your browser at `http://localhost:3000`.
2. Backend: Ensure the backend server is running to handle quiz data and interactions.
