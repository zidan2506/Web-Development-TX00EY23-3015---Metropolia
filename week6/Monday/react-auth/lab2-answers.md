# React Auth — Lab 2 Answers

## Step 1 — Prop Drilling

**1.** Both `SignupComponent` and `LoginComponent` receive `setIsAuthenticated` by destructuring it from props (`({ setIsAuthenticated })`) and call `setIsAuthenticated(true)` after `response.ok`, right after saving the user to `localStorage` and before `navigate("/")`.

**2–3.** Added `console.log("App re-rendered, isAuthenticated:", isAuthenticated)` before the `return` in `App.jsx`. After logging in, the console printed a new line with `isAuthenticated: true`, showing that calling the setter in the child re-rendered `App`. The `console.log` was removed afterwards.

**4.** If `setIsAuthenticated` was not passed to `SignupComponent`, calling it would throw `TypeError: setIsAuthenticated is not a function`. The error happens inside the `try`, so it is caught and logged, and `navigate("/")` is never reached. The user would be saved in `localStorage`, but the state in `App` would stay `false`:
- The user would **not** be redirected — they stay on `/signup`. Even if `navigate("/")` ran, the `/` route would see `isAuthenticated === false` and redirect back to the guest page.
- The navbar would **not** update — it would still show the Login/Signup links.

The user would only appear logged in after a full page refresh, when `App` reads `localStorage` again.

## Step 2 — Conditional UI in the Navbar

**1–2.** After logging in, the navbar shows "Welcome" and a "Log out" button. Clicking "Log out" removes `user` from `localStorage`, calls `setIsAuthenticated(false)`, and the navbar switches to the Login/Signup links straight away without reloading the page.

**3–4.** The navbar now shows `Welcome, <email>` using `user.email` from `localStorage`, and has a `Home` link to `/` next to the Log out button.

## Step 3 — Conditional Routing

**1.** While logged in, going to `/login` redirects to `/` via `<Navigate to="/" />`, because `/login` is a guest-only route.

**2.** While logged out, going to `/` redirects to the guest page instead of rendering `<Home />`, because `/` is a protected route.

**3.** The `/` route redirects unauthenticated users to `/login`.

**4.** Added a protected `/profile` route that renders `<Profile />` ("Profile Page") and redirects to `/login` when the user is not authenticated.

## Step 4 — Lazy Initializer

**1.** Replaced the direct expression with the lazy initializer `useState(() => { ... })`.

**2.** After removing the `token` field from the stored `user` and refreshing:
- Old approach: still authenticated, because `{"email":"x"}` is a truthy object.
- Lazy initializer: not authenticated, because `user.token` is `undefined`, so it returns `false` and `/` redirects to `/login`.

**3.** After clearing `localStorage` and refreshing, `JSON.parse(null)` returns `null`, the initializer returns `false`, and the user is redirected to the login page.

**4.** `isAuthenticated` is meant to answer a yes/no question, so a plain boolean keeps the state type consistent. The rest of the app calls `setIsAuthenticated(true)` / `setIsAuthenticated(false)`, so starting with an object would make the same state sometimes an object and sometimes a boolean. Returning the object would also treat any truthy value (like `{}` or an object with no token) as logged in. It would also keep user data such as the token in React state and pass it down as a prop, even though components only need to know whether the user is logged in. A boolean is predictable, safe to compare, and cannot accidentally leak or be mistaken for real user data.
