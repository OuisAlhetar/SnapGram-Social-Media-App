import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import {
  EditPost,
  Home,
  Explore,
  AllUsers,
  CreatePost,
  PostDetails,
  Profile,
  UpdateProfile,
  Saved,
  CreateStory,
} from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import "./globals.css";
import { Routes, Route } from "react-router-dom";

// Toast:
import { Toaster } from "./components/ui/toaster";
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { useEffect } from "react";

export const App = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    // Update body class for RTL styling
    document.body.classList.toggle('rtl', isRTL);
    return () => {
      document.body.classList.remove('rtl');
    };
  }, [isRTL]);

  return (
    <ThemeProvider>
      <main className={`flex h-screen ${isRTL ? 'font-ibm-plex-arabic rtl' : 'font-inter ltr'}`}>
        <Routes>
          {/* Public Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route>

          {/* Private Routes */}
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/create-story" element={<CreateStory />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Routes>

        {/* Toast */}
        <Toaster />
      </main>
    </ThemeProvider>
  );
};

export default App;
