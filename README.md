RBAC System for Hotel Management Application (Airbnb-like)

In this project, we have implemented a Role-Based Access Control (RBAC) system for a hotel management application inspired by Airbnb. The system includes three main roles: Admin, Manager, and User, each with distinct permissions and capabilities.

Admin Role
The Admin has the highest level of access within the system. Key responsibilities and permissions include:

User Management: The Admin can access all user data, update or delete user profiles, and activate or deactivate user accounts.
Property Management: The Admin can add, update, or delete properties. Admins are also responsible for assigning Managers to specific properties.
Manager Assignment: The Admin assigns managers to properties, ensuring each manager is responsible for the operations and management of a particular property.
Admins also have full control over permissions, meaning they can grant or restrict specific actions for other roles, such as whether a manager can access rental logs or view the property's revenue.

Manager Role
The Manager role is limited to the properties they are assigned to by the Admin. Responsibilities include:

Property Information Management: Managers can update and manage property information, such as availability and details about the property.
Rental Logs and Revenue Management: Depending on the permissions granted by the Admin, Managers may access past rental logs, view revenue generation, and check the overall performance of the property.
Booking Management: Managers track and monitor bookings for their assigned properties.
However, Managers cannot view or manage data related to properties they are not assigned to. This ensures that access is restricted to the specific properties under their control.

User Role
The User role provides limited access. Users can:

View Property Information: Users can browse available properties, view details, and book properties for a specified number of days.
Property Booking: Users can only book properties and are restricted from viewing sensitive property data or modifying it.
Security Features
To enhance security and ensure that only authorized users can access sensitive information, several key security measures have been implemented:

JWT Authentication: A secure login system using JSON Web Tokens (JWT) ensures that users are authenticated before accessing any protected routes.
Role Management: Each user is assigned a specific role (Admin, Manager, User), and based on their role, they are granted specific permissions to access certain features of the application.
Protected Routes: Routes that require authentication or specific roles to access are protected, preventing unauthorized access to confidential data.
Encrypted Passwords: All passwords are encrypted using a secure hashing algorithm, ensuring that user credentials are stored safely and reducing the risk of data breaches.
Robust Backend and Frontend
The application is built with a robust backend that handles user management, property management, and role-based access control, ensuring smooth and secure operation. The frontend provides an intuitive interface for users to interact with the system, making it easy for them to browse properties, make bookings, and view relevant information. Admins and Managers have separate dashboards that provide them with the necessary tools and permissions to manage users and properties effectively.

In conclusion, this RBAC system with secure login, role management, encrypted passwords, and protected routes ensures that users have appropriate access levels based on their roles while maintaining the integrity and security of sensitive data. This project not only demonstrates a robust backend and frontend design but also showcases advanced security measures to protect the application from unauthorized access.
