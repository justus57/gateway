### **Loan Payment Automation System**

This project is a Node.js REST API designed to automate loan payment reconciliation using a split payment method. It integrates with Business Central via SOAP services to fetch loan account balances and post split payments. The system is designed with advanced programming principles, including multi-threading and a layered architecture, to ensure efficiency and scalability.

---

## **Features**
- **Fetch Loan Balance**: Retrieve loan balances for multiple reference numbers under a single customer.
- **Post Split Payments**: Record payments split across various accounts and loans.
- **Integration with Business Central**: Communicates with Business Central via SOAP services for accurate data synchronization.
- **Queue Processing**: Background job processing using a robust task queue.

---

## **Technologies Used**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building REST APIs.
- **SOAP**: SOAP client library for interfacing with SOAP web services.
- **Bull Queue**: For job processing and managing background tasks.
- **Dotenv**: For managing environment variables.
- **ESLint**: For maintaining code quality.
- **Layered Architecture**: Separation of concerns with controllers, services, and data access layers.

---

## **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/loan-payment-automation.git
   cd loan-payment-automation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   SOAP_WSDL_URL=https://example.com/soap?wsdl
   SOAP_USERNAME=yourUsername
   SOAP_PASSWORD=yourPassword
   REDIS_URL=redis://localhost:6379
   ```

4. **Start the Application**
   ```bash
   npm start
   ```

---

## **Endpoints**

### **1. Fetch Loan Balance**
- **URL**: `/api/v1/loans/balances`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "customerNumber": "123456",
    "paybillAccount": "987654",
    "referenceNumber": "LN001"
  }
  ```
- **Response**:
  ```json
  {
    "customerNumber": "123456",
    "referenceNumber": "LN001",
    "loanBalance": 5000
  }
  ```

---

### **2. Post Split Payment**
- **URL**: `/api/v1/loans/payments`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "customerNumber": "123456",
    "paybillAccount": "987654",
    "payments": [
      {
        "referenceNumber": "LN001",
        "amount": 3000
      },
      {
        "referenceNumber": "LN002",
        "amount": 2000
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Payment posted successfully"
  }
  ```

---

## **Project Structure**
```
loan-payment-automation/
│
├── src/
│   ├── controllers/        # API request handlers
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions (e.g., SOAP integration)
│   ├── jobs/               # Queue and background task management
│   ├── routes/             # Route definitions
│   └── config/             # Configuration files
│
├── .env                    # Environment variables
├── package.json            # Project dependencies and metadata
├── README.md               # Project documentation
└── server.js               # Application entry point
```

---

## **Development**
1. **Run in Development Mode**
   ```bash
   npm run dev
   ```

2. **Lint the Code**
   ```bash
   npm run lint
   ```

3. **Run Tests** *(if applicable)*
   ```bash
   npm test
   ```

---

## **Contributing**
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Open a pull request with a detailed description.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.


