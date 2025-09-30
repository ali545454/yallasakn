import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Search,
  Plus,
  LogIn,
  LogOut,
  Menu,
  Building,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "../context/UserContext";
const API_URL = import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

// روابط التنقل الرئيسية التي ستظهر في الهيدر
const navLinks = [
  { name: "الرئيسية", path: "/" },
  { name: "بحث", path: "/search" },
];

const Header = () => {
  const { user, logout } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

const handleLogout = async () => {
  try {
    await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    logout();
    navigate("/login");
  } catch (error) {
    console.error("خطأ أثناء تسجيل الخروج:", error);
  }
};


  const getInitials = (name) => {
    if (!name) return <User className="h-5 w-5" />;
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* === الجزء الأيسر: الشعار وقائمة التنقل === */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/yallasakn.png"
              alt="YallaSakn Logo"
              className="h-8 object-contain"
            />
          </Link>

          {/* --- القائمة المنسدلة الجديدة للتنقل --- */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                القائمة
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 text-right" align="start">
              {navLinks.map((link) => (
                <DropdownMenuItem key={link.path} asChild>
                  <Link to={link.path} className="justify-end cursor-pointer">
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* === الجزء الأوسط: شريط البحث === */}
        <div className="flex-1 flex justify-center px-4">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex w-full max-w-sm items-center"
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="ابحث عن منطقتك..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 rounded-full border bg-gray-50 px-4 text-sm focus:ring-1 focus:ring-primary focus:outline-none text-right pr-10"
              />
              <button
                type="submit"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-primary-foreground rounded-full"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* === الجزء الأيمن: زر إضافة عقار + قائمة المستخدم === */}
        <div className="hidden md:flex items-center gap-3">
          {/* إظهار فقط لأصحاب العقارات */}
          {isLoggedIn && user.role === "owner" && (
            <Link to="/add-apartment">
              <Button variant="ghost" size="sm">
                أضف عقارك
              </Button>
            </Link>
          )}

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={user?.avatar || ""}
                      alt={user?.full_name}
                    />
                    <AvatarFallback className="bg-primary/10">
                      {getInitials(user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 text-right"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 text-right">
                    <p className="text-sm font-medium leading-none">
                      {user?.full_name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* إظهار فقط لأصحاب العقارات */}
                {user.role === "owner" && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-2 justify-end cursor-pointer"
                    >
                      لوحة التحكم <Building className="h-4 w-4" />
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 justify-end cursor-pointer"
                  >
                    حسابي <User className="h-4 w-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 cursor-pointer flex justify-end gap-2"
                >
                  تسجيل الخروج <LogOut className="h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  دخول
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">حساب جديد</Button>
              </Link>
            </div>
          )}
        </div>

{/* === قائمة الموبايل === */}
<div className="md:hidden flex items-center w-full justify-between">
  <Link to="/" className="flex items-center gap-2">
    <img
      src="/yallasakn.png"
      alt="YallaSakn Logo"
      className="h-7 object-contain"
    />
  </Link>
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" className="w-72 flex flex-col">
      <SheetHeader className="text-right p-4 pt-6">
        <SheetTitle className="pl-4">القائمة</SheetTitle> {/* padding left لتباعد عن X */}
      </SheetHeader>

      <div className="flex-1 flex flex-col gap-4 text-right overflow-y-auto">
        {/* معلومات المستخدم */}
        {isLoggedIn ? (
          <div className="flex flex-col items-end border-b pb-4">
            <Avatar className="h-12 w-12 mb-2">
              <AvatarImage src={user?.avatar || ""} />
              <AvatarFallback className="bg-primary/10 text-lg">
                {getInitials(user?.full_name)}
              </AvatarFallback>
            </Avatar>
            <p className="font-semibold">{user?.full_name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 border-b pb-4">
            <Link to="/signup">
              <Button className="w-full">حساب جديد</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                دخول
              </Button>
            </Link>
          </div>
        )}

        {/* روابط التنقل */}
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center justify-end gap-3 px-3 py-2 rounded-md hover:bg-muted"
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn && user?.role === "owner" && (
            <Link
              to="/dashboard"
              className="flex items-center justify-end gap-3 px-3 py-2 rounded-md hover:bg-muted"
            >
              لوحة التحكم
            </Link>
          )}

          {isLoggedIn && (
            <Link
              to="/profile"
              className="flex items-center justify-end gap-3 px-3 py-2 rounded-md hover:bg-muted"
            >
              حسابي
            </Link>
          )}
        </nav>
      </div>

      {/* أزرار أسفل القائمة دائمًا */}
      <div className="flex flex-col gap-2 p-4 border-t">
        {isLoggedIn && user?.role?.toLowerCase() === "owner" && (
          <Link to="/dashboard/add-apartment">
            <Button className="w-full">
              <Plus className="h-4 w-4 ml-2" />
              أضف عقارك
            </Button>
          </Link>
        )}

        {isLoggedIn && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            تسجيل الخروج
          </Button>
        )}
      </div>
    </SheetContent>
  </Sheet>
</div>


      </div>
    </header>
  );
};

export default Header;
