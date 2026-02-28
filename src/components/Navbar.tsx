import { NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, User } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Bosh sahifa" },
  { to: "/calendar", icon: Calendar, label: "Kalendar" },
  { to: "/profile", icon: User, label: "Profil" },
];

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
