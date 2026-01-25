
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase";
import { useTheme } from "@/components/ThemeProvider"; // <--- Import Hook
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuSub,           // Optional: for cleaner UI if supported by your UI lib
  DropdownMenuSubTrigger,    // Optional
  DropdownMenuSubContent     // Optional
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, ChevronDown, Sun, Moon, Laptop } from "lucide-react"; // <--- Import Icons

export function Header() {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme(); // <--- Get setter
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
        {/* Added dark:text-white */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          BU Fitrec Traffic
        </h1>
        {/* Added dark:text-gray-400 */}
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          Plan your workout around crowd density
        </p>
      </div>

      {user && (
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
            
            <DropdownMenuItem onClick={() => alert("Open Methodology Modal")} className="cursor-pointer dark:text-gray-200 dark:focus:bg-gray-800">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Methodology</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="dark:bg-gray-800" />
            
            {/* --- NEW THEME SECTION --- */}
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
            {/* ------------------------- */}
            
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
      )}
    </header>
  );
}