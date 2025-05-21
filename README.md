## appointment-poc-calendly
This project is a Next.js application that features an admin panel for managing entries and a user page for displaying those entries in a card format.

## Features

- **Admin Panel**: A form to enter multiple entries including name, calendar link, and description.
- **User Page**: Displays the entries in a visually appealing card format.
- **TypeScript Support**: The application is built using TypeScript for better type safety and developer experience.

## Project Structure

```
nextjs-admin-user-app
├── src
│   ├── pages
│   │   ├── admin.tsx        # Admin panel component
│   │   ├── index.tsx        # User page component
│   │   └── _app.tsx         # Custom App component
│   ├── components
│   │   ├── AdminForm.tsx    # Form for entering entries
│   │   └── UserCard.tsx      # Card component for displaying entries
│   ├── types
│   │   └── Entry.ts          # Type definition for entries
│   └── utils
│       └── storage.ts        # Utility functions for storage
├── public                     # Static files
├── package.json               # NPM dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nextjs-admin-user-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Navigate to the `/admin` route to access the admin panel and add new entries.
- Visit the home page to see the entries displayed in card format.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.