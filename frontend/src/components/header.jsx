import { useState, useEffect } from "react";
import { useAuth } from "@/lib/firebase";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, ChevronDown } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();
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
      {/* Left Side: Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          BU Fitrec Traffic
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Plan your workout around crowd density
        </p>
      </div>

      {/* Right Side: User Dropdown (Only if logged in) */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-auto rounded-full p-1 pr-3 hover:bg-gray-100 flex items-center gap-2 border border-transparent hover:border-gray-200 transition-all">
              
              {/* Avatar Circle */}
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

              {/* Name & Arrow */}
              <span className="text-sm font-medium text-gray-700">
                {user.displayName ? user.displayName.split(" ")[0] : "Account"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* 1. Methodology Item */}
            <DropdownMenuItem onClick={() => alert("Open Methodology Modal here!")} className="cursor-pointer">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Methodology</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {/* 2. Sign Out Item (Red) */}
            <DropdownMenuItem 
              onClick={logout} 
              className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
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