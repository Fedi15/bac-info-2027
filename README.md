# Bac Info 2027 — Private Tutoring

Website for Fedi Ghanmi (Torbaga)'s private computer science tutoring service.

## Positioning

- One-to-one computer science lessons
- Student can come to Fedi's home (`Chez moi`)
- Fedi can travel to the student's home (`Chez l'élève`)
- Target levels: 3ème année secondaire and Bac
- FR / EN / AR

## Bac sections and programmes

The site presents the five relevant Bac sections:

- **Bac Économie & Gestion** — Access, Pandas and Python
- **Bac Mathématiques** — Python and algorithmique
- **Bac Technique** — Python and algorithmique
- **Bac Sciences Expérimentales** — same Informatique programme as Mathématiques and Technique
- **Bac Lettres** — Informatique not offered

**Bac Informatique is explicitly not taught** and is not available as a request-form option.

## Availability

Availability is no longer a simple morning/afternoon/evening checklist. The student can:

1. Select one or more days.
2. Choose a start and end time.
3. Add the time slot.
4. Add multiple different slots if needed.

The resulting weekly availability is stored in the existing `availability` text column.

## Form and email

The request form collects:

- Full name
- Phone
- Email
- Level
- School / institution
- Bac section
- Lesson location
- City / area
- Multiple availability slots

The form displays a post-request note explaining that the student will receive an email with the next information. The project currently **collects the email address and stores it in the database**; an external email provider / sending workflow is still required if the site should automatically send that email after submission.

## Structure

- `public/index.html` — main landing page and request form
- `public/lang.html` — language selection page
- `public/style.css` — shared main-site styles
- `api/register.js` — public lead registration endpoint
- `api/leads.js` — admin lead endpoint
- `pages/admin.js` — admin dashboard
- `migrations/002_private_lesson_location.sql` — lesson location
- `migrations/003_private_tutoring_updates.sql` — availability/location indexes
- `migrations/004_email.sql` — email address column and index

## Google Maps

The public site links to the teaching location:

https://maps.app.goo.gl/mSkGnLRJGRDpTnhc7

## Database

Run migrations `002`, `003`, and `004` on an existing deployment before using the new fields.
