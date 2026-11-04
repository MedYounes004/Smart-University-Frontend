# Smart University App - integration

This is the supplied React + TypeScript UI template, preserved in place. Authentication now uses email/password against Spring Boot; signup creates student/professor accounts through the API. Administrator registration is intentionally blocked.

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_URL=http://localhost:8080/api`.
3. Start MongoDB and the backend (see `../SmartUniversityBackend/README.md`).
4. Run `npm install` and `npm run dev`.

The template's feature screens still contain some demo/mock data and must be connected screen-by-screen to the REST resource endpoints before every screen can be considered fully persistent. The API endpoints and typed request helper are available in `src/app/services/api.ts`.
