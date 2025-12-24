1. Question Bank
A full-stack application to manage and search technical interview questions based on technology, role, and experience level.
This project helps interviewers, students, and developers quickly find relevant questions from a centralized system.

2. Features
1.Filter / search by:
✔️ Technology      ✔️ Role      ✔️ Experience level
2.REST API built with Spring Boot
3.Frontend (React) consumes the API
4.CORS enabled for frontend–backend communication
5.Connected with database for persistent storage
6.The user uploads a CSV file from the UI (or Postman).
7.The REST API receives the file as multipart/form-data.
8.The backend parses each row.
9.All valid records are inserted into the database.

4. Project Architecture
    Frontend (React)
           ⬇
    Backend (Spring Boot)
           ⬇
    Database (MySQL / PostgreSQL)

5. 🛠️ Tech Stack
--> Backend
    Java
    Spring Boot
    Spring Data JPA
    MySQL (or any relational DB)
--> Frontend
    React js
    Tailwind

6. 📂 Folder Structure
     Question-Bank/
   Question-Bank/
   ├── backend/
   │   ├── src/main/java/com/questionbank
   │   └── ...
   ├── frontend/
   │   ├── src/
   │   └── ...
   ├── README.md

7. ScreenShop
  <img width="1897" height="899" alt="image" src="https://github.com/user-attachments/assets/3b2bb83f-ad13-4b8e-9e01-c3e7b376b8aa" />
  <img width="1492" height="730" alt="image" src="https://github.com/user-attachments/assets/58273a98-5e22-48f7-9797-219ef4a225d5" />

