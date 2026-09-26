# React Auth — Lab 1: Answers

## Step 1 — Signup with `fetch`

**1. What makes the request a valid JSON API call?**
- `method: "POST"`, because we are sending data to the server.
- `body: JSON.stringify(user)`, which turns the JS object into a JSON string.
- The header `"Content-Type": "application/json"`, so the server knows the body is JSON and `express.json()` can parse it.

**2. What does `response.ok` check?**
It is `true` when the status code is between 200 and 299. `fetch` doesn't throw an error on 4xx or 5xx responses, so we have to check `response.ok` ourselves.

**3. Why do we need two `await`s?**
The first `await` (for `fetch`) only waits until the headers arrive. The body might still be loading. `.json()` has to read the whole body and parse it, so it also returns a Promise and needs its own `await`.

**4. What does the token look like?**
It's a long string with 3 parts separated by dots: `header.payload.signature`. For example:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YWI4Mjc3NzBiZTY0NzViNTYwYjg3Y2MiLCJpYXQiOjE3OTA0NTM2MjMsImV4cCI6MTc5MDcxMjgyM30.x7gfp1EdaVImezxYSAmA7IfsbAoow8FCCvKMoYjpF-U
```
The payload has the user's `_id`, `iat` (when the token was created) and `exp` (when it expires).

## Step 2 — Login with `fetch`

**1. What is the only difference between `demo2.js` and `demo3.js`?**
Only the `apiUrl`: `/api/user/signup` vs `/api/user/login`. The log messages are also a bit different, but the code does the same thing.

**2. What should the client do with the token?**
It should save the token, for example in `localStorage`. Then when the page reloads, the user is still logged in and doesn't have to log in again. The token should also be sent in the `Authorization: Bearer <token>` header when calling protected routes.

## Step 3 — `localStorage`

**1. Running `demo1.js`**
In **Application → Local Storage** I could see `username` and `user` show up after `setItem`. They disappeared after `removeItem` and `clear()`.

**2. What happens with `JSON.parse(null)`?**
It returns `null` and there is no error, because `null` gets turned into the string `"null"` first. So if the `user` key doesn't exist, `JSON.parse(localStorage.getItem("user"))` just gives `null` and the app treats the user as not logged in.

**3. `removeItem("user")` vs `clear()`**
- `removeItem("user")` only deletes the `user` key. I would use this for logout.
- `clear()` deletes everything saved for the site. I would only use it to reset everything. It's not good for logout because it also deletes other data.

## Step 4 — Signup in React

**1.** I signed up with the strong password `4wa95=Vx#`. The `user` key showed up in Local Storage with both `email` and `token`.

**2.** After clicking "Log out", the `user` key was removed from Local Storage.

**3. Where does `setIsAuthenticated` come from?**
It is created with `useState` in `App.jsx`. Then it is passed down as a prop to `SignupComponent`, `LoginComponent` and `Navbar`.

## Step 5 — Login in React

I implemented `handleLogin` in `LoginComponent.jsx` the same way as `handleSignup`:
1. `fetch` `POST /api/user/login` with `{ email, password }`.
2. If `response.ok`, parse the JSON and save `user` to `localStorage`.
3. Call `setIsAuthenticated(true)` and `navigate("/")`.

When I logged in with the account from Step 4, the token showed up in Local Storage and I was sent to the home page.

## Step 6 — Default Unauthenticated Route

**1.** When I'm logged out and open the app, I land on the login page instead of the signup page.

**2.** I can still get to the signup page by going to `/signup` directly.

**3. Login or signup as the default page?**
I think login should be the default, because most people who open the app already have an account. New users can still click the Signup link in the navbar.

## Step 7 — `sessionStorage`

**1.** After switching to `sessionStorage` and logging in, the token showed up under **Application → Session Storage** and not under Local Storage.

**2. Am I still logged in after closing and reopening the tab?**
No. `sessionStorage` is cleared when the tab is closed, so the `user` is gone when I open the app again, and the app thinks I'm not logged in. Also, `App.jsx` still reads from `localStorage`, so even refreshing the page logs me out.

**3.** I changed everything back to `localStorage` after testing.

## Summary

- **Why `Content-Type: application/json`?** It tells the server that the body is JSON so the server can parse it. Without it, `req.body` on the backend is empty.
- **Why does `response.json()` need its own `await`?** The body is read asynchronously, after `fetch` has already resolved with the headers.
- **Why `JSON.stringify` / `JSON.parse`?** `localStorage` can only store strings, so objects have to be turned into strings when saving and parsed back when reading.
- **The three steps after a successful login/signup:** save the token (persist), then `setIsAuthenticated(true)` (update state), then `navigate("/")` (navigate).
- **`localStorage` vs `sessionStorage`:** `localStorage` stays after closing the tab or the browser and is shared between tabs. `sessionStorage` only lives in one tab and is deleted when the tab is closed.
