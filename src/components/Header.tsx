import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Search, Plus, LogOut, Menu, Building, HelpCircle, Shield , ChevronDown } from "lucide-react";
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
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

const API_URL =
  import.meta.env.VITE_API_URL || `https://web-production-33f69.up.railway.app/`;

  
  const Header = () => {
    const { user, logout } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!user;
  const { t } = useTranslation();
  const navLinks = [
    { name: t('header.home'), path: "/" },
    { name: t('header.search'), path: "/search" },
    { name: t('header.contact'), path: "/contact" },
    { name: t('header.help'), path: "/help" },
  ];

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

  const getInitials = (name) =>
    name ? name.charAt(0).toUpperCase() : <User className="h-5 w-5" />;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* === الشعار === */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/yallasakn.png"
            alt="YallaSakn Logo"
            className="h-8 object-contain"
          />
        </Link>

<div className="hidden md:flex items-center">
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="sm" className="flex items-center gap-1">
        {t('header.quickMenu')} <ChevronDown className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="text-right">
      <DropdownMenuItem asChild>
        <Link to="/search" className="flex items-center gap-2">
          <Search className="h-4 w-4" /> {t('header.search')}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/support" className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" /> {t('header.support')}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link to="/privacy" className="flex items-center gap-2">
          <Shield className="h-4 w-4" /> {t('header.privacy')}
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>

        {/* === شريط البحث (للديسكتوب فقط) === */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex w-full max-w-sm items-center justify-center"
        >
          <div className="relative w-full">
            <input
              type="search"
              placeholder={t('header.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 rounded-full border bg-gray-50 px-4 text-sm text-right pr-10 focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-primary-foreground rounded-full"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* === قائمة المستخدم (ديسكتوب) === */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          {isLoggedIn && user.role === "owner" && (
            <Link to="/add-apartment">
              <Button variant="ghost" size="sm">
                {t('header.addApartment')}
              </Button>
            </Link>
          )}

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar || ""} />
                    <AvatarFallback className="bg-primary/10">
                      {getInitials(user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 text-right">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col text-right">
                    <p className="text-sm font-medium">{user?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "owner" && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center justify-end gap-2"
                    >
                      {t('header.dashboard')} <Building className="h-4 w-4" />
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center justify-end gap-2"
                  >
                    {t('header.profile')} <User className="h-4 w-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 flex justify-end gap-2 cursor-pointer"
                >
                  {t('header.logout')} <LogOut className="h-4 w-4" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  {t('header.login')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">{t('header.signup')}</Button>
              </Link>
            </div>
          )}
        </div>

        {/* === قائمة الموبايل === */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 flex flex-col text-right items-end"
            >
              <SheetHeader className="p-4 pt-6 w-full flex flex-col items-end">
                <SheetTitle className="text-lg font-semibold">{t('header.menu')}</SheetTitle>
              </SheetHeader>

              <div className="flex-1 flex flex-col gap-4 w-full items-start overflow-y-auto">
                {isLoggedIn ? (
                  <div className="flex flex-col items-end border-b pb-4 w-full text-right">
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
                  <div className="grid grid-cols-2 gap-2 border-b pb-4 w-full">
                    <Link to="/signup" className="w-full">
                      <Button className="w-full">{t('header.signup')}</Button>
                    </Link>
                    <Link to="/login" className="w-full">
                      <Button variant="outline" className="w-full">
                        {t('header.login')}
                      </Button>
                    </Link>
                  </div>
                )}

                {/* روابط القائمة */}
                <nav className="flex flex-col gap-1 w-full flex-start">
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
                      {t('header.dashboard')}
                    </Link>
                  )}
                  {isLoggedIn && (
                    <Link
                      to="/profile"
                      className="flex items-center justify-end gap-3 px-3 py-2 rounded-md hover:bg-muted"
                    >
                      {t('header.profile')}
                    </Link>
                  )}
                </nav>
              </div>

              {/* الأزرار السفلية */}
              <div className="flex flex-col gap-2 p-4 border-t w-full flex-center">
                {isLoggedIn && user?.role?.toLowerCase() === "owner" && (
                  <Link to="/add-apartment">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 ml-2" />
                      {t('header.addApartment')}
                    </Button>
                  </Link>
                )}
                {isLoggedIn && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    {t('header.logout')}
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
