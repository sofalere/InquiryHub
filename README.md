# Request Bin

Request Bin is a simple HTTP request inspection tool built using JavaScript, Node.js, MongoDB, and PostgreSQL. It allows you to create temporary endpoints to capture and inspect incoming HTTP requests for debugging and testing purposes.

## Features

- **MongoDB and PostgreSQL Support:** Utilize MongoDB for storing request data and PostgreSQL for managing relational data.
- **Easy Setup:** Get started quickly by following the installation instructions below.

## Installation

### Prerequisites

- Node.js and npm installed.
- MongoDB and PostgreSQL databases.

### Steps

```bash
# Clone the repository
git clone https://github.com/your-username/request-bin.git

# Navigate to the project directory
cd request-bin

# Install dependencies
npm install

# Configure the databases:
# For MongoDB: Edit the env file DDB_URL and provide your MongoDB connection details.
# For PostgreSQL: Edit the env file RDB_URL and provide your PostgreSQL connection details.

# Start the application
npm start
```
# Running the Request Bin

The Request Bin will be running at http://localhost:3000. You can access the web interface and start creating bins.

## Usage

1. Open your web browser and go to http://localhost:3000.
2. Create a new bin to generate a unique URL.
3. Send HTTP requests to the generated URL.
4. View and inspect the captured requests on the web interface.

## Database Structure

- **MongoDB:** Stores raw HTTP request data.
- **PostgreSQL:** Manages relational data, such as bin information and user accounts.

## License

This project is licensed under the MIT License.
