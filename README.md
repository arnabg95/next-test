# MOJI AI

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Routes Groups

### ENTRY POINT - src/app/(main-layout)/page.tsx

(authenticated)

    (authenticated)
        post
            create
            details/[id]
            edit
        profile
            (profile-layout)
                about
                all-posts
                followers
                following
            edit

#### (main-layout)

    (main-layout)
        about
        contact
        content-policy
        feeds
        privacy-policy
        profiles
            [slug] (page)
                about
                all-posts
        settings
        user-agreement

#### (unauthenticated)

    (unauthenticated)
        auth
            email-verification
            forget-password
            reset-password
            signin
            signup
            verify
