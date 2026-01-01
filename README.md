# Exchange Ease

A full-stack web application for buying, selling, and exchanging products. This project features a robust Node.js/Express backend and a dynamic React frontend.

##  Tech Stack

### Frontend (`react-app`)
*   **React**: UI Library (v18)
*   **React Router**: Navigation (v6)
*   **Axios**: HTTP Client
*   **Bootstrap**: CSS Framework
*   **React Toastify**: Notifications
*   **Socket.io Client**: Real-time communication

### Backend (`node-app`)
*   **Node.js & Express**: Server-side framework
*   **MongoDB & Mongoose**: Database 
*   **JWT (JSON Web Token)**: Authentication
*   **Bcrypt**: Password Hashing
*   **Multer**: File Upload Handling
*   **Socket.io**: Real-time events

---

##  Project Structure

*   **`node-app/`**: Contains the backend API code.
    *   `controllers/`: Logic for handling requests.
    *   `models/`: Database schemas.
    *   `routes/`: API endpoint definitions.
*   **`react-app/`**: Contains the frontend React code.
    *   `src/components/`: UI Components.
    *   `src/services/`: API integration services.
    *   `src/pages/`: Page-level components.

## How it works

### **1. Authentication**
*   **Sign Up (`/signup`)**: New users create an account by providing their details.
*   **Login (`/login`)**: Registered users log in to access features like selling products and liking items.
*   **Logout**: Securely signs out the user.

### **2. Browsing & Searching**
*   **Home Page (`/`)**: Displays a grid of all available products.
*   **Search**: Users can find specific items using the search bar in the header (filters by name, description, or category).
*   **Filter by Category**: Users can click on category icons or use the dropdown menu to view products in specific categories (e.g., Mobiles, Bikes).
*   **Product Details (`/product/:id`)**: Clicking on a product card shows the full details, including multiple images, price, description, seller contact info, and location.

### **3. Selling & Management**
*   **Add Product (`/add-product`)**: Logged-in users can list a new item for sale by uploading images and providing product details.
*   **My Products (`/my-products`)**: Users can view a dashboard of all products they have listed.
    *   **Edit Product (`/edit-product/:id`)**: Update details of an existing listing.
    *   **Delete Product**: Remove a listing from the platform.

### **4. User Profile & Favorites**
*   **Like/Dislike**: Users can click the heart icon on any product to add or remove it from their favorites.
*   **Liked Products (`/liked-products`)**: A dedicated page to view all of the user's favorite items.
*   **My Profile (`/my-profile`)**: Users can view their account details.


##  Setup & Run

### Backend
1.  Navigate to `node-app`:
    ```bash
    cd node-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    npm start
    ```
    (Runs on port 5000 by default)

### Frontend
1.  Navigate to `react-app`:
    ```bash
    cd react-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm start
    ```
    (Runs on port 3000 by default and proxies requests to backend)

