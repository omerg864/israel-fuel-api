# Israel Fuel Prices API Website

This project is a website that offers an API for Israel fuel prices for registered users. The website was developed using ExpressJS, JavaScript, React, CSS, and MongoDB. The database is inserted with data from the israeli department of energy website with a python script.


## Installation

To install this project, follow the steps below:

1. Clone the repository to your local machine using the command below:

```bash
git clone https://github.com/{your-username}/israel-fuel-prices-api.git
```

2. Install the dependencies using the command below:

```bash
npm install
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/israel-fuel-prices
JWT_SECRET={your-jwt-secret}
ADMIN_TOKEN={your-admin-token}
EMAIL_USER={your-email-user}
EMAIL_SERVICE={your-email-service}
EMAIL_PASSWORD={your-email-password}
EMAIL_ADDRESS={your-email-address}
```

Replace the values in curly braces (`{}`) with the appropriate values for your environment.
4. Start the development server using the command below:

```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000` to view the website.


## API Endpoints

This website offers an API for registered users to get the fuel prices data. To access the API, users need to authenticate with a valid token that will be used to authorize subsequent requests. The token will be passed in the URL as a parameter.

The following is the API endpoint:

- `GET /api/fuel/:token` - Returns all fuel prices in Israel for registered users.

To access the protected API endpoint, users need to include their token as a parameter in the URL. For example:

- `GET /api/fuel/token123456` - Returns all fuel prices in Israel for registered users.

The following are the additional API endpoints for admins:

- `PUT /api/fuel/:token/:id` - Updates the fuel price with the given `id` in the database for admins. The request body should contain the updated fuel price object. To access this endpoint, admins need to include their admin token as a parameter in the URL. For example:

  - `PUT /api/fuel/token123456/123` - Updates the fuel price with the given `id` in the database for admins.

- `DELETE /api/fuel/:token/:id` - Deletes the fuel price with the given `id` from the database for admins. To access this endpoint, admins need to include their admin token as a parameter in the URL. For example:

  - `DELETE /api/fuel/token123456/123` - Deletes the fuel price with the given `id` from the database for admins.


## Contributing

Contributions to this project are welcome! To contribute, please fork the repository and create a pull request with your changes. Before submitting a pull request, please make sure that your changes are consistent with the existing code and follow the project's coding standards.