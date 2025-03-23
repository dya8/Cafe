# Cafe Management System
## Overview
The Cafe Management System is a full-stack web application designed to manage cafe operations efficiently. Built using **Angular** for the frontend, **Node.js** and **Express.js** for the backend, and **MongoDB** for database management, it offers seamless user experiences for both customers and administrators.

## Features
- **User Management:** User registration, login, and authentication using JWT.
- **Menu Display:** Dynamic display of coffee and pastry items.
- **Add to Cart:** Users can add items to their cart and update quantities.
- **Checkout and Billing:** Streamlined checkout process with order summary generation.
- **Responsive Design:** Built using **Bootstrap** for a clean and adaptive UI.

## Tech Stack
- **Frontend:** Angular 19.0.7, TypeScript, Bootstrap 3.3.7
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [MongoDB](https://www.mongodb.com/)

## Installation
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/yourusername/cafe-management.git
    cd cafe-management
    ```

2. **Backend Setup:**
    ```bash
    cd backend
    npm install
    npm start
    ```

3. **Frontend Setup:**
    ```bash
    cd frontend
    npm install
    ng serve
    ```

4. **Database Setup:**
    - Start MongoDB.
    - Configure your `.env` file in the backend with:
      ```env
      MONGO_URI=mongodb://localhost:27017/cafeManagement
      JWT_SECRET=your_secret_key
      ```

5. **Access the Application:**
    - Frontend: `http://localhost:4200`
    - Backend: `http://localhost:3000`

## Usage
- **Customers** can browse the cafe menu, add items to their cart, and place orders.
- **Admins** can log in to manage the menu, including adding, editing, and deleting items.

## Folder Structure
```bash
cafe-management/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│
├── backend/
│   ├── db.js
│   ├── server.js
│
└── .env

```
![Screenshot 2025-03-23 220219](https://github.com/user-attachments/assets/8e205b08-dbb5-40e5-ac1c-6122bd839ee7)
![Screenshot 2025-03-23 220415](https://github.com/user-attachments/assets/f35e1023-2256-4e41-abbc-75856d9b2c62)

![Screenshot 2025-03-23 220257](https://github.com/user-attachments/assets/ff208814-154e-4e85-bc08-d30793373784)
![Screenshot 2025-03-23 220311](https://github.com/user-attachments/assets/4e9713eb-6a98-4b72-837e-c11b622621ff)
![Screenshot 2025-03-23 220352](https://github.com/user-attachments/assets/59a45df4-e9d2-41d7-a6ee-27eef6801a5d)


## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License. Feel free to use and modify it as needed.

---
**Happy Coding!** 🍵

