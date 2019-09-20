# Express Login-System Boilerplate

Simple login in system boilerplate to help start your backend. Hope it helps don't forget to follow me on Instagram & Youtube. Fork and Star, and would love to see the community expand this boilerplate. You can also check out the video tutorial where we built this boilerplate.
\
\
[Instagram](https://www.instagram.com/siteit_solutions/)
\
[YouTube](https://www.youtube.com/c/thelifeofadev)
\
[Video Tutorial]()

# Dependencies

## • express (server)

## • express-validator (request validation/sterilization)

## • cors (cross origin resource sharing)

## • mongoose (object data modeling)

## • bcryptjs (password hashing)

# Install Dependencies

run `npm install` in your terminal to install the required dependencies

# API Routes / Examples of Request in Javascript

## Register (POST)

```javascript
fetch("https://example.com/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: "CamSkiTheDev",
    email: "fake@fakemail.com",
    password: "password123"
  })
})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
```

## Login (POST)

```javascript
fetch("https://example.com/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "fake@fakemail.com",
    password: "password123"
  })
})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
```

## Validate Login / Token (POST)

```javascript
fetch("https://example.com/validate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "5d84218320cbdf0d4494409a"
  })
})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
```

## Logout / Delete Token (POST)

```javascript
fetch("https://example.com/logout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    token: "5d84218320cbdf0d4494409a"
  })
})
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));
```
