# Bayava Authentcation

<!-- ## Entity Relationship Diagram (ERD) in Mermaid -->

<!-- ```mermaid
erDiagram
    USERS {
        int id PK
        string username
        string password_hash
        string email
        string role
    }

    PRODUCTS {
        int id PK
        string name
        string description
        float price
        int stock
    }

    ORDERS {
        int id PK
        int user_id FK
        datetime order_date
        float total_amount
    }

    ORDER_ITEMS {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
        float price
    }

    COURSES {
        int id PK
        string title
        string description
        string content_type
        string content_url
    }

    ENROLLMENTS {
        int id PK
        int user_id FK
        int course_id FK
        datetime enrollment_date
    }

    DOCTORS {
        int id PK
        string name
        string specialty
        string bio
        string contact_info
    }

    APPOINTMENTS {
        int id PK
        int user_id FK
        int doctor_id FK
        datetime appointment_date
        string status
        string zoom_link
    }

    USERS ||--o{ ORDERS: places
    ORDERS ||--|{ ORDER_ITEMS: contains
    PRODUCTS ||--o{ ORDER_ITEMS: included_in
    USERS ||--o{ ENROLLMENTS: enrolls_in
    COURSES ||--o{ ENROLLMENTS: contains
    USERS ||--o{ APPOINTMENTS: books
    DOCTORS ||--o{ APPOINTMENTS: has
``` -->

## API URL List and Descriptions

| HTTP Method | URL | Description |
|-------------|-----|-------------|
| **Authentication** | | |
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login a user and return a token |
| POST | /api/auth/logout | Logout a user |
| **User Management** | | |
| GET | /api/users | Get a list of all users (Admin only) |
| GET | /api/users/{id} | Get details of a specific user |
| PUT | /api/users/{id} | Update a user's details |
| DELETE | /api/users/{id} | Delete a user (Admin only) |
| **E-commerce for Ayurvedic Products** | | |
| GET | /api/products | Get a list of all products |
| GET | /api/products/{id} | Get details of a specific product |
| POST | /api/products | Create a new product (Manager only) |
| PUT | /api/products/{id} | Update a product (Manager only) |
| DELETE | /api/products/{id} | Delete a product (Manager only) |
| POST | /api/orders | Create a new order |
| GET | /api/orders | Get a list of orders for the logged-in user |
| GET | /api/orders/{id} | Get details of a specific order |
| **E-commerce Marketplace for Yoga Courses** | | |
| GET | /api/courses | Get a list of all courses |
| GET | /api/courses/{id} | Get details of a specific course |
| POST | /api/courses | Create a new course (Manager only) |
| PUT | /api/courses/{id} | Update a course (Manager only) |
| DELETE | /api/courses/{id} | Delete a course (Manager only) |
| POST | /api/enrollments | Enroll in a course |
| GET | /api/enrollments | Get a list of enrollments for the logged-in user |
| GET | /api/enrollments/{id} | Get details of a specific enrollment |
| **Consultation Service for Ayurvedic Doctors** | | |
| GET | /api/doctors | Get a list of all doctors |
| GET | /api/doctors/{id} | Get details of a specific doctor |
| POST | /api/doctors | Add a new doctor (Admin only) |
| PUT | /api/doctors/{id} | Update doctor details (Admin only) |
| DELETE | /api/doctors/{id} | Delete a doctor (Admin only) |
| POST | /api/appointments | Book a new appointment |
| GET | /api/appointments | Get a list of appointments for the logged-in user |
| GET | /api/appointments/{id} | Get details of a specific appointment |
| PUT | /api/appointments/{id} | Update appointment details |
| DELETE | /api/appointments/{id} | Cancel an appointment |
