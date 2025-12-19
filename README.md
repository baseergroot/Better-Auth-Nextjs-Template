# Better Auth - Next.js Template

 <!-- Optional: Add a screenshot of your app -->

A production-ready, feature-rich authentication template for Next.js 14 (App Router). Built with the powerful `better-auth` library, Tailwind CSS, and Shadcn/UI to provide a seamless and secure user experience out of the box.

## ✨ Features

- **Full Authentication Flow**: Secure sign-up, sign-in, and sign-out functionality.
- **Social Login**: One-click sign-in with Google.
- **Credentials Login**: Traditional email and password authentication with validation.
- **Database Integration**: Uses the official `better-auth` **MongoDB adapter** for persistent user data.
- **Modern UI/UX**: Beautifully designed, responsive, and accessible components from **Shadcn/UI**.
- **Server-Side Logic**: Leverages Next.js Server Actions for robust and secure form submissions.
- **Personalized Experience**: Displays user profile information (avatar, name, email) upon login.
- **Type-Safe**: Written in TypeScript for a better developer experience.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: better-auth
- **Database Adapter**: `better-auth/adapters/mongodb`
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide React
- **Database**: MongoDB

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.17 or later)
- A MongoDB database and its connection string.
- Google OAuth credentials (Client ID and Client Secret).

### 1. Clone the Repository

```bash
git clone https://github.com/baseergroot/Better-Auth-Nextjs-Template.git
cd Better-Auth-Nextjs-Template
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following variables. You can get the Google credentials from the Google Cloud Console.

```env
BETTER_AUTH_SECRET= # generate using `openssl rand -base64 32`
BETTER_AUTH_URL= # e.g., http://localhost:3000

MONGODB_URI= # your mongodb connection string

# google secret
GOOGLE_CLIENT_ID= # your google client id
GOOGLE_CLIENT_SECRET= # your google client secret

# resend api key
RESEND_API_KEY= # your resend api key
EMAIL_FROM= # e.g no-reply@yourdomain.com
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<!-- ## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. -->
