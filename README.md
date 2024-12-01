
# Quotes - Social Media Platform

Quotes is a social media platform built using Node.js and React. It allows users to create, like, dislike, and browse through various quotes.

## Features

-   User authentication (login, signup)
-   Creating new quotes
-   Liking and disliking quotes
-   Browsing and searching for quotes
- Profile tab for managing your quotes 
-   Responsive design for mobile and desktop

## Getting Started

### Prerequisites

-   Node.js (version 12 or higher)
-   npm (or yarn)
-   MongoDB (for the database)

### Installation

1.  Clone the repository:
`git clone https://github.com/egeyardimci/quotes`

2.  Install the dependencies:
`cd quotes npm install`

3.  Set up the environment variables:
    -   Create a `.env` file in the root directory of the project.
    -   Add the following variables to the `.env` file:
        -   `ACCESS_TOKEN_SECRET`: A secret key used for JWT token generation.
        -   `REFRESH_TOKEN_SECRET`: A secret key used for JWT refresh token generation.
        -   `PORT`: The port number on which the server will run (e.g., `3000`).
        -   `DB_URI`: The connection string for your MongoDB database.
5.  Start the development server:
`node app.js`

The application should now be running at `http://localhost:3000`.

## Tech Stack

-   **Backend**: Node.js, Express.js, MongoDB, Mongoose
-   **Frontend**: React, React Router, Styled Components
-   **Authentication**: JSON Web Tokens (JWT)
-   **Other Tools**: ESLint, Prettier

## Deployment

The application can be deployed to a hosting platform like Heroku, AWS, or DigitalOcean. You'll need to set the environment variables on the hosting platform as well.

## Roadmap

-   Implement Docker support for easier deployment
-   Refactor the frontend codebase and publish it on GitHub
-   Add more features, such as commenting on quotes, sharing quotes on social media, and user profiles
-   Improve the overall user experience and design

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
