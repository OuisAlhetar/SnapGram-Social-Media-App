# SnapGram - Modern Social Media Application 🌟

![SnapGram Logo](insert_logo_path_here)

## 📱 Overview

SnapGram is a feature-rich social media platform built with React and Appwrite, offering a modern and responsive user experience. The application supports multiple languages (English and Arabic) and implements comprehensive RTL (Right-to-Left) support.

## ✨ Key Features

- **User Authentication & Authorization** 🔐
  - Secure sign-up and login
  - Social media authentication
  - Protected routes and user sessions

- **Profile Management** 👤
  - Customizable user profiles
  - Profile picture and bio updates
  - Activity tracking and statistics

- **Story Features** 📸
  - Create and share stories
  - View stories with expiration tracking
  - Interactive story viewer modal
  - Grid layout for story collections

- **Internationalization (i18n)** 🌍
  - Complete English and Arabic language support
  - RTL layout support for Arabic
  - Dynamic text direction switching

- **Responsive Design** 📱
  - Mobile-first approach
  - Adaptive layouts for all screen sizes
  - Touch-friendly interactions

## 🛠️ Technical Stack

- **Frontend**
  - React.js with TypeScript
  - Tailwind CSS for styling
  - ShadcnUI for beautiful, accessible components
  - React Router v6 for navigation
  - React Query for data fetching
  - i18next for internationalization
  - Lucide Icons for beautiful iconography

- **Backend & Services** ⚡
  - Appwrite Backend-as-a-Service
  - Real-time data synchronization
  - Secure file storage
  - User authentication services

## 🎨 UI Components

The project utilizes [shadcn/ui](https://ui.shadcn.com/), a collection of beautifully designed, accessible, and customizable React components built with:
- Radix UI for accessibility
- Tailwind CSS for styling
- TypeScript for type safety
- Class Variance Authority for component variants

Key components used:
- Dialog for modals
- Tabs for navigation
- Button variants
- Form components
- Toast notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Appwrite instance (local or cloud)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/snapgram.git
   cd snapgram
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_URL=your_appwrite_url
   VITE_APPWRITE_STORAGE_ID=your_storage_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
snapgram/
├── src/
│   ├── _auth/          # Authentication related components
│   ├── _root/          # Main application routes and pages
│   ├── components/     # Reusable UI components
│   ├── lib/           # Utility functions and API calls
│   ├── i18n/          # Internationalization configurations
│   └── styles/        # Global styles and Tailwind config
├── public/            # Static assets
└── ...configuration files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run preview` - Preview production build locally

## Internationalization

The application supports multiple languages through i18next:

- English (default)
- Arabic (with RTL support)

To add a new language:
1. Create a new translation file in `src/i18n/locales/`
2. Add the language option in the language switcher
3. Update the i18next configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- [@OuisAlhetar](https://github.com/OuisAlhetar)

## Acknowledgments

- Appwrite team for the excellent backend service
- React community for the amazing ecosystem
- All contributors who have helped shape this project

## Contact

For any queries or support, please reach out to:
- Email: ouis.alhetar@gmail.com
- Twitter: [@OuisAlhetar](https://x.com/ouis_alhetar?s=35)

---

Made with ❤️ by Ouis AL-Hetar
