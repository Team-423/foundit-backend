# Back-end server project
## Summary
This back-end project aims to host an accessible server that will aim to handle data accessible for a lost and found website.

## Tech Stack & Skills

- **Node.js/Express.js**: RESTful API framework
- **MongoDB**: noSQL database implementation
- **Jest/Supertest**: Automated testing suite
- **dotenv**: Environment configuration
- **Nodemon**: Development server
- **Socket.io**: Real-time chat-box
- **Resend**: Email notifications

### Skills

1. **Test-Driven Development**: Writing tests before implementing functionality. Tests cover:

- API endpoints
- Edge cases
- Error handling
- Data validation

2. **MVC Architecture**: Clear separation of models, views, and controllers
3. **RESTful Design**: Following REST principles for API endpoints
4. **Incremental Development**: Building features incrementally with git version control

### Hosted Version
[Posted - Live Demo](https://foundit-backend-dg0o.onrender.com/api)

### Link to the front-end 
[Front-end Repo](https://github.com/Team-423/foundit-frontend)

## Versions
- Node.js v23.8.0 or higher
- Mongoose 8.15.1 or higher

## Table of Contents

- [Setup Instructions](#setup)
- [API Documentation](#api-documentation)

## Setup

### Installation

#### 1. Clone the repository

#### 2. Install dependencies:

```zsh
npm install
```

#### 3. Set up environment variables:

Create two `.env` files in the root directory:

For development:

```
// .env.development
MONGO_URI=dev_dialogue
```

For testing:

```
// .env.test
MONGO_URI=dev_dialogue_test
```

#### 4. Set up and seed the database:

```zsh
npm run seed-dev
```

### Running Tests

Run the test suite with:

```zsh
npm test
```

### Local Development

To run the server locally:

```zsh
npm start
```


## API Documentation

Once the server is running, you can access the API documentation at the `/api` endpoint, which provides details about all available endpoints, accepted queries, and example responses.

### Core Endpoints

| Method | Endpoint                           | Description                             |
| ------ | ---------------------------------- | --------------------------------------- |
| GET    | /api                               | API documentation                       |
| GET    | /api/items                         | Get items (with filters)                |
| GET    | /api/items/categories              | Get all categories of items             |
| GET    | /api/items/brands                  | Get all brands of items                 |
| GET    | /api/items/locations               | Get all locations of items              |
| GET    | /api/items/colours                 | Get all colours of items                |
| GET    | /api/items/resolved                | Get all resolved items                  |
| GET    | /api/items/:item_id                | Get a specific item by its id           |
| GET    | /api/items/:item_id/QandA          | Get the Q and A for specific item       |
| GET    | /api/users/:userId                 | Get a specific user by their id         |
| GET    | /api/users/:userId/items           | Get all items associated with a user    |
| PATCH  | /api/items/:item_id                | Update a specific item                  |
| PATCH  | /api/items/:item_id/resolved       | Update a specific item to resolved      |
| PATCH  | /api/items/:item_id/QandA          | Update answers for specific item        |
| PATCH  | /api/items/:item_id/QandA/questions| Update questions for specific item      |
| PATCH  | /api/users/:userId                 | Update user information                 |
| POST   | /api/items                         | Post an item (lost/found)               |
| POST   | /api/items/:item_id/QandA          | Post questions and answers for item     |
| DELETE | /api/items/:item_id                | Delete an item listing                  |

### Query Examples

**Filtering items:**
(item_name, category and location are mandatory)
```js
GET /api/items?item_name=ring&category=accessories&location=manchester&colour=silver
```

**Getting a specific user:**
(:user_id to be replaced with MongoDB ID)
```js
GET /api/users/:user_id
```


