# Phase 4 Interview Challenge

This is the challenge for getting into phase 4. You'll work on one app, building it in three stages.

To get started, create a new repository called `phase-4-challenge` and load the files from [the scaffold][scaffold]. Do all of your work in this repo and submit it as your solution.

As part of your evaluation for this challenge, you'll be building an additional feature with the interviewer. Read the [Pairing Exercise](#pairing-exercise) section for more detail.

Skills covered:

- Node.js
- HTTP Applications
- HTML & CSS
- The Browser
- SQL

Each requirement has a point value. A fully complete requirement gets full points; partially complete requirements get partial points; incomplete requirements get no points. Completeness is determined by calculating points earned divided by total points available.

## Project Description

Build a community for record enthusiasts to review their favorite albums. The app is called **Vinyl**.

The client has provided basic wireframes and user stories (broken into 3 stages).

Some work has already been done for you in the [scaffold][scaffold]. Build off of the existing code.

## Wireframes

Use these wireframes to guide your design.

Don't worry about using real images - just use placeholders for now.

![app flow](https://user-images.githubusercontent.com/16725399/27102456-2d2a9950-503a-11e7-8552-6302645e1191.png)

## Sample Data

Use this data to seed the `albums` table on your database.

| Title               | Artist          |
|:--------------------|:----------------|
| Malibu              | Anderson .Paak  |
| A Seat at the Table | Solange Knowles |
| Melodrama           | Lorde           |
| In Rainbows         | Radiohead       |

## General Requirements

- [x] __10:__ Solution is in a public repository called `phase-4-challenge`.
- [x] __10:__ All dependencies are declared in a `package.json` file.
- [x] __10:__ Express is used for the web server.
- [x] __10:__ PostgreSQL is used for the database.
- [x] __10:__ Database is seeded with at least 4 albums (check out the [sample data](#sample-data)).

_The items that are already checked off have been completed in the [scaffold][scaffold]._

## Stage 1: Basic User Authentication & Profiles

Allow users to sign up, sign in, view their profile page, and sign out.

#### Requirements

**Users can...**

- [x] __20:__ Navigate to "/" and see a basic splash page.
- [x] __20:__ See the name of the website on the splash page.
- [x] __20:__ See links to "Sign In" and "Sign Up" on the splash page.
- [x] __20:__ Sign up for an account with name, email, and password.
- [x] __20:__ Sign in to their account if they already have one.
- [x] __20:__ Be redirected to their public profile page after signing in (e.g. "/users/1").
- [x] __20:__ On their public profile page, see their name, email, and their join date.
- [x] __20:__ See the site-wide header on every page.
- [x] __20:__ See a link to "Profile" and "Sign Out" if they're logged in in the site-wide header.
- [x] __20:__ See links to "Sign In" and "Sign Up" if they're logged out in the site-wide header.

## Stage 2: Album Reviews

Allow users to see albums and leave reviews on them.

#### Requirements

**Users can...**

- [x] __20:__ View all albums on the home page (under "Records").
- [x] __20:__ View the most recent 3 reviews on the home page.
- [x] __20:__ Click on an album title to go to the album page (e.g. "/albums/1").
- [x] __20:__ See the site-wide header on the album page.
- [x] __20:__ See the name of the album on the album page.
- [x] __20:__ See all reviews for the album on album page sorted by newest first.
- [x] __20:__ Use an "Add review" button on the album page to pull up the new review form.
- [x] __20:__ Create a new review for an album using the new review form.
- [x] __20:__ See their created reviews on the album page.

**On the user's profile page, they can...**

- [ ] __20:__ See their reviews sorted by newest first.
- [ ] __20:__ Click delete icon "trash can" on ANY individual review.
- [ ] __20:__ See a pop-up that says: "Are you sure you want to delete this review?" when clicking trash can icon
- [ ] __20:__ Have the review deleted when confirming the pop-up.

## Stage 3: Validations & Authorization

Ensure that no invalid data gets saved to the database with validation. Also make sure that certain user actions are authorized.

#### Requirements

Users CANNOT save invalid data to the database. You don't need to show error messages to the user for the following.

- [ ] __30:__ Users CANNOT sign up with an email that is already in use.
- [ ] __30:__ A review's content must not be empty.

A user is authorized to perform certain actions on the site. You don't need to show error messages to the user for the following.

- [ ] __30:__ Only logged in users can create/destroy reviews.
- [ ] __30:__ Users may only delete their own reviews.

---

## Pairing Exercise

As part of the interview portion of this challenge, you will be pairing on a new feature with your interviewer.

**DO NOT COMPLETE THE FEATURES LISTED BELOW.** They are here simply so that you can see what _kinds_ of things you may be asked to build during your interview.

These are the possible features that your interviewer may choose from to pair with you on (you will not know which one they'll choose until your interview):

#### Profile Features

**Users can...**

- See a "default" profile photo on their profile page before adding their own photo.
- Update their profile photo (consider using Uploadcare).
- See their profile photo next to their reviews.
- Receive a welcome email after creating an account.
- Visit user profile pages via pretty urls, like "/users/james-franco".

#### Review  Features

**Users can...**

- Visit album pages via pretty urls, like "/albums/malibu".
- Add a star rating to reviews (from 1-5) and see the star rating for each review of an album in star icons.
- See review content truncated to 400 characters max, with a link to view more on a album's page.
- See a relative published date, e.g. "2 days ago" on a album's page.

#### Commenting Features

**Users can...**

- Comment on individual reviews.
- See comment threads for a review.
- See the number of comments they've left on their public profile.
- Only add a comment when logged in.
- Only delete their own comments.

#### Validations & Authorization Features

**Users can...**

- View an error message when form validations fail, for the following validations:
  - Email is already in use.
  - Content for review must not be empty.
- View only the 10 most recent reviews on a album page (pagination).
- View a link/button to the "Next" 10 on the album page (pagination).
- View a link/button to the "Previous" 10 on the album page (pagination).

[scaffold]: https://drive.google.com/file/d/0B77MaJi8kPm1WEkwb3JyOXFtd2M/view?usp=sharing
