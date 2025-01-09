//React User Management Application

This project is a simple user management application built using React and Tailwind CSS. The application allows users to register, log in, and manage their account information. The project demonstrates the use of Context API for global state management, form handling, and secure password management.

Features of the project

//User Registration:

Allows users to register by providing a name, email, and password.

Passwords are securely hashed before being stored in localStorage.

//User Login:

Authenticates users by verifying credentials from localStorage.

Only the user's name and email are stored in the global state for security.(password not stored on frontend)

//Account Management:

Users can view and update their name and email.

Updated information is saved in both the global state and localStorage.

Passwords remain unchanged and secure during updates.

//Logout:

Clears the user from the context global state while retaining the user data in localStorage.

//Technologies Used

React: For building the user interface and handling state management.

React Router DOM: For routing and navigation.

Context API: For managing global state.As it is a small scale project.

Tailwind CSS: For styling the application.




How It Works

Registration

On the Register Page, the user enters their name, email, and password.

The password is hashed using the bcryptjs library before being stored in localStorage.

Upon successful registration, the user is redirected to the login page.

Login

On the Login Page, the user enters their email and password.

The application verifies the credentials with data stored in localStorage.

If valid, the user's name and email are stored in the global state using Context API.

Account Management

On the Account Page, the user can update their name and email.

The updated information is saved to both localStorage and the global state.

The password remains secure and is not change during updates.

Logout

Clicking the logout button clears the user from the global state but retains the user data in localStorage.

//for Security 

Password Hashing:

Passwords are hashed before  storing in localStorage to enhance security.

//Global State Management:

Only name and email are stored in the global state to avoid exposing sensitive information.

//Error Handling:

Errors during login or registration are gracefully handled and displayed to the user.


