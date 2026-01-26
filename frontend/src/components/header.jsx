
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase";
import { useTheme } from "@/components/ThemeProvider";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, ChevronDown, Sun, Moon, Laptop, Home, LogIn } from "lucide-react"; 
import { Link } from "react-router-dom";

// Helper component for the Google Icon (same as in TrafficChart)
function GoogleIcon() {
  return (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function Header() {
  // 1. Destructure 'login' from useAuth
  const { user, logout, login } = useAuth();
  const { setTheme } = useTheme(); 
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [user]);

  const getInitial = () => {
    if (!user?.displayName) return "U";
    return user.displayName.charAt(0).toUpperCase();
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          BU Fitrec Traffic
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          Plan your workout around crowd density
        </p>
      </div>

      {/* 2. Conditional Rendering: Show Dropdown if User, else Show Login Button */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-auto rounded-full p-1 pr-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 border border-transparent hover:border-gray-200 transition-all">
              <div className="relative w-8 h-8 shrink-0">
                {!imageError && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full rounded-full border border-gray-200 object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                    <span className="text-xs font-bold text-indigo-700 select-none">
                      {getInitial()}
                    </span>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user.displayName ? user.displayName.split(" ")[0] : "Account"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56 dark:bg-gray-900 dark:border-gray-800" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none dark:text-white">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-gray-800" />
            
            <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-800">
              <Link to="/" className="flex items-center w-full">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-800">
              <Link to="/methodology" className="flex items-center w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Methodology</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="dark:bg-gray-800" />
            
            <DropdownMenuLabel className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">
              Theme
            </DropdownMenuLabel>
            
            <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-800">
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-800">
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-800">
              <Laptop className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="dark:bg-gray-800" />
            
            <DropdownMenuItem 
              onClick={logout} 
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        /* 3. New Sign In Button when user is not logged in */
        <Button 
          onClick={login}
          variant="outline"
          className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <GoogleIcon />
          Sign in
        </Button>
      )}
    </header>
  );
}