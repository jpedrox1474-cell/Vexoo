/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import BarberProInfo from './pages/BarberProInfo';
import EliteTrainingInfo from './pages/EliteTrainingInfo';
import Home from './pages/Home';
import ModulesDashboard from './pages/ModulesDashboard';
import VetProInfo from './pages/VetProInfo';
import BarbeariaInfo from './pages/BarbeariaInfo';
import AcademiaInfo from './pages/AcademiaInfo';
import VeterinariaInfo from './pages/VeterinariaInfo';
import VidracariaInfo from './pages/VidracariaInfo';
import Login from './pages/Login';
import Register from './pages/Register';
import VetSystem from './pages/VetSystem';
import BarberSystem from './pages/BarberSystem';
import EliteSystem from './pages/EliteSystem';
import VidracariaSystem from './pages/VidracariaSystem';
import Settings from './pages/Settings';


export const PAGES = {
    "BarberProInfo": BarberProInfo,
    "EliteTrainingInfo": EliteTrainingInfo,
    "Home": Home,
    "ModulesDashboard": ModulesDashboard,
    "VetProInfo": VetProInfo,
    "BarbeariaInfo": BarbeariaInfo,
    "AcademiaInfo": AcademiaInfo,
    "VeterinariaInfo": VeterinariaInfo,
    "VidracariaInfo": VidracariaInfo,
    "Login": Login,
    "Register": Register,
    "VetSystem": VetSystem,
    "BarberSystem": BarberSystem,
    "EliteSystem": EliteSystem,
    "VidracariaSystem": VidracariaSystem,
    "Settings": Settings,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
};