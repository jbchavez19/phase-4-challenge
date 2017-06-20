# Vinyl

A community for record enthusiasts to review their favorite albums.

## Getting Started

Follow these instructions to set up Vinyl

```sh
# Clone repository to your machine
git clone https://github.com/jbchavez19/phase-4-challenge.git

# Navigate to project directory
cd phase-4-challenge

# Install dependencies
npm install

# Setup database (make sure postgres is running)
npm run db:create
npm run db:schema
npm run db:seed

# Setup Environment file
touch .env
# Open .env for editing, add the following, and save
SESSION_KEY=WRITE_A_SESSION_KEY_HERE

# Start server
npm run start

# Vinyl should be running on http://localhost:3000/
```
