# Week 3: Advanced Security and Final Reporting

## Overview
In the final week of the internship, advanced security measures were implemented, including application activity logging. Furthermore, basic penetration testing techniques were applied to test the security of the developed Node.js application and validate the defenses implemented during Week 2.

---

## 1. Basic Penetration Testing & Defense Validation

To ensure the application was secure, I simulated attacks against the authentication endpoints (`/login`, `/profile`, `/signup`) using Thunder Client.

### A. Testing Input Validation
- **Action:** Sent invalid email formats (e.g., `"email": "notanemail"`) and weak passwords (e.g., `"password": "123"`).
- **Result:** The application successfully blocked the requests, returning a `400 Bad Request` status with appropriate error messages (`"Invalid email format"`, `"Password must be at least 6 characters"`).

### B. Testing for SQL Injection (SQLi)
- **Action:** Attempted to bypass authentication by sending malicious SQL payloads in the login request:
  ```json
  {
    "email": "' OR 1=1 --",
    "password": "123456"
  }

  ## 2. Set Up Basic Logging

To monitor HTTP requests, track application activity, and detect suspicious behavior, basic logging was implemented using the `morgan` middleware.

### Implementation Details:
- **Configured Morgan to log:**
  - HTTP request method (GET, POST, etc.) 
  - Endpoint URL accessed 
  - Response status codes 
  - Request timestamps 
- **Outcome:** All incoming requests (including failed login attempts and unauthorized access) are now logged in the terminal. This provides clear visibility into how users interact with the application and is crucial for incident response and debugging.

---

## 3. Final Security Checklist

To ensure basic security practices are consistently followed during development, the following security checklist was successfully completed for this application:

- **Input validation and sanitization enabled** (Mitigates XSS and SQLi) 
- **Passwords hashed using bcrypt** (Prevents credential exposure) 
- **JWT-based authentication implemented** (Secure, stateless authentication) 
- **Protected routes secured with middleware** (Enforces access control) 
- **HTTP security headers configured using Helmet** (Mitigates Clickjacking, MIME-sniffing) 
- **Request logging enabled using Morgan** (Provides audit trails and visibility) 
- **Proper error handling without information leakage** (Prevents reconnaissance) 
- **Unauthorized access properly blocked** (Returns 401/403 status codes)

##Summary
In Week 3 (**[Week 3 Report](Week3_Internship.pdf)**), the application's defenses were validated through basic penetration testing, confirming that malicious inputs like SQL injections were rejected and unauthorized access was successfully blocked. Additionally, morgan middleware was set up to log HTTP requests and track application activity for better monitoring and incident response. The project concluded with a comprehensive security checklist, verifying that all essential protections—such as input validation, bcrypt hashing, JWT authentication, and helmet headers—were fully and successfully implemented
