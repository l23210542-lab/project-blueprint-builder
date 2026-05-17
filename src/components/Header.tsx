import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingCart, Heart, Library, Users, User, ShieldCheck } from "lucide-react";
import { useStore } from "@/store/useStore";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/biblioteca", label: "Biblioteca", icon: Library },
  { to: "/amigos", label: "Amigos", icon: Users },
  { to: "/wishlist", label: "Lista de deseos", icon: Heart },
  { to: "/admin", label: "Admin", icon: ShieldCheck },
] as const;

export function Header() {
  const { carrito } = useStore();
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-gradient-primary glow-primary">
            <span className="text-lg font-black text-primary-foreground">V</span>
          </div>
          <div className="font-display text-xl font-bold tracking-wide">
            STEAM <span className="text-primary text-glow">VERDE</span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {navItems.map(item => {
            const active = location.pathname === item.to || (item.to !== "/" && location.pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active ? "bg-surface text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/catalogo" className="hidden items-center gap-2 rounded-md bg-surface px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground md:flex">
            <Search className="h-4 w-4" /> Buscar juegos…
          </Link>
          <Link to="/carrito" className="relative grid h-9 w-9 place-items-center rounded-md bg-surface hover:bg-surface-2">
            <ShoppingCart className="h-4 w-4" />
            {carrito.length > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {carrito.length}
              </span>
            )}
          </Link>
          <Link to="/perfil" className="grid h-9 w-9 place-items-center rounded-md bg-surface hover:bg-surface-2">
            <User className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
