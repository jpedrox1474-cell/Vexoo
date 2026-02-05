import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import ProtectedRoute from '@/lib/ProtectedRoute';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

// List of internal pages that require authentication
const PROTECTED_PAGES = ['ModulesDashboard', 'VetSystem', 'BarberSystem', 'EliteSystem', 'VidracariaSystem', 'Settings'];

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  // Render the main app
  return (
    <>
      {(isLoadingPublicSettings || isLoadingAuth) && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Handle critical authentication errors */}
      {authError && (authError.type === 'user_not_registered' || authError.type === 'auth_required') ? (
        authError.type === 'user_not_registered' ? <UserNotRegisteredError /> : (navigateToLogin(), null)
      ) : (
        <Routes>
          <Route path="/" element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          } />
          {Object.entries(Pages).map(([path, Page]) => {
            const isProtected = PROTECTED_PAGES.includes(path);
            const pageElement = (
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            );

            return (
              <Route
                key={path}
                path={`/${path}`}
                element={isProtected ? <ProtectedRoute>{pageElement}</ProtectedRoute> : pageElement}
              />
            );
          })}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
