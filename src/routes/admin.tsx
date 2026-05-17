import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, DollarSign, Users, Gamepad2, Plus, Edit, Trash2, Tag } from "lucide-react";
import { games, finalPrice } from "@/data/games";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Panel administrativo · Steam Verde" }, { name: "description", content: "Gestión de videojuegos, usuarios y estadísticas." }] }),
  component: Admin,
});

const tabs = ["Dashboard", "Videojuegos", "Usuarios", "Ofertas"] as const;
type Tab = typeof tabs[number];

const mockUsers = [
  { id: "u1", username: "alexgamer", email: "alex@verde.com", rol: "Usuario", estado: "Activo", registro: "2024-08-12" },
  { id: "u2", username: "novaknight", email: "nova@verde.com", rol: "Usuario", estado: "Activo", registro: "2024-09-04" },
  { id: "u3", username: "admin_root", email: "root@verde.com", rol: "Administrador", estado: "Activo", registro: "2024-01-01" },
  { id: "u4", username: "devstudio", email: "dev@verdant.com", rol: "Desarrollador", estado: "Activo", registro: "2025-02-18" },
  { id: "u5", username: "ghostbyte", email: "ghost@verde.com", rol: "Usuario", estado: "Suspendido", registro: "2025-03-22" },
];

function Admin() {
  const [tab, setTab] = useState<Tab>("Dashboard");

  return (
    <PageShell title="Panel administrativo" subtitle="Control total del catálogo, usuarios y promociones.">
      <nav className="mb-6 flex gap-1 overflow-x-auto rounded-lg bg-surface p-1">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              tab === t ? "bg-gradient-primary text-primary-foreground glow-primary" : "text-muted-foreground hover:text-foreground"
            }`}>
            {t}
          </button>
        ))}
      </nav>

      {tab === "Dashboard" && <Dashboard />}
      {tab === "Videojuegos" && <VideojuegosCrud />}
      {tab === "Usuarios" && <UsuariosCrud />}
      {tab === "Ofertas" && <OfertasCrud />}
    </PageShell>
  );
}

function Dashboard() {
  const ingresos = games.reduce((s, g) => s + finalPrice(g) * g.reseñas * 0.1, 0);
  const stats = [
    { label: "Ingresos", value: `$${(ingresos / 1000).toFixed(1)}K`, icon: DollarSign, delta: "+12.4%" },
    { label: "Usuarios activos", value: "8,420", icon: Users, delta: "+5.1%" },
    { label: "Juegos vendidos", value: "24,310", icon: Gamepad2, delta: "+18.2%" },
    { label: "Reseñas nuevas", value: "1,128", icon: TrendingUp, delta: "+9.0%" },
  ];

  const topVendidos = [...games].sort((a, b) => b.reseñas - a.reseñas).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-xl bg-gradient-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-semibold text-success">{s.delta}</span>
            </div>
            <div className="mt-3 font-display text-3xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-gradient-card p-6 shadow-card">
          <h3 className="mb-4 font-display text-xl font-bold">Juegos más vendidos</h3>
          <div className="space-y-3">
            {topVendidos.map((g, i) => (
              <div key={g.id} className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/20 text-sm font-bold text-primary">#{i + 1}</span>
                <img src={g.imagen} alt={g.titulo} className="h-10 w-14 rounded object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{g.titulo}</div>
                  <div className="text-xs text-muted-foreground">{g.reseñas.toLocaleString()} unidades</div>
                </div>
                <div className="font-display font-bold text-primary">${(finalPrice(g) * g.reseñas * 0.1 / 1000).toFixed(1)}K</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-card p-6 shadow-card">
          <h3 className="mb-4 font-display text-xl font-bold">Ingresos últimos 7 días</h3>
          <div className="flex h-48 items-end justify-between gap-2">
            {[42, 65, 38, 78, 91, 58, 84].map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t bg-gradient-primary" style={{ height: `${v}%` }} />
                <span className="text-xs text-muted-foreground">{["L", "M", "X", "J", "V", "S", "D"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideojuegosCrud() {
  return (
    <div className="rounded-xl bg-gradient-card shadow-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-display text-lg font-bold">CRUD Videojuegos ({games.length})</h3>
        <button className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary">
          <Plus className="h-4 w-4" /> Nuevo juego
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase text-muted-foreground">
          <tr className="border-b border-border">
            <th className="p-3">Juego</th>
            <th className="p-3">Desarrollador</th>
            <th className="p-3">Género</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Descuento</th>
            <th className="p-3">Lanzamiento</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {games.map(g => (
            <tr key={g.id} className="border-b border-border/60 hover:bg-surface/50">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img src={g.imagen} alt={g.titulo} className="h-10 w-14 rounded object-cover" />
                  <span className="font-medium">{g.titulo}</span>
                </div>
              </td>
              <td className="p-3 text-muted-foreground">{g.desarrollador}</td>
              <td className="p-3 text-muted-foreground">{g.genero.join(", ")}</td>
              <td className="p-3">${g.precio}</td>
              <td className="p-3">{g.descuento > 0 ? <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">-{g.descuento}%</span> : "—"}</td>
              <td className="p-3 text-muted-foreground">{g.fechaLanzamiento}</td>
              <td className="p-3">
                <div className="flex justify-end gap-1">
                  <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-surface"><Edit className="h-4 w-4" /></button>
                  <button className="grid h-8 w-8 place-items-center rounded-md text-destructive hover:bg-destructive/20"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UsuariosCrud() {
  return (
    <div className="rounded-xl bg-gradient-card shadow-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h3 className="font-display text-lg font-bold">CRUD Usuarios ({mockUsers.length})</h3>
        <button className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary">
          <Plus className="h-4 w-4" /> Nuevo usuario
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase text-muted-foreground">
          <tr className="border-b border-border">
            <th className="p-3">Usuario</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rol</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Registro</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map(u => (
            <tr key={u.id} className="border-b border-border/60 hover:bg-surface/50">
              <td className="p-3 font-medium">{u.username}</td>
              <td className="p-3 text-muted-foreground">{u.email}</td>
              <td className="p-3">
                <span className={`rounded px-2 py-0.5 text-xs font-medium ${
                  u.rol === "Administrador" ? "bg-primary/20 text-primary" :
                  u.rol === "Desarrollador" ? "bg-accent/20 text-accent" :
                  "bg-surface text-muted-foreground"
                }`}>{u.rol}</span>
              </td>
              <td className="p-3">
                <span className={`text-xs font-medium ${u.estado === "Activo" ? "text-success" : "text-destructive"}`}>{u.estado}</span>
              </td>
              <td className="p-3 text-muted-foreground">{u.registro}</td>
              <td className="p-3">
                <div className="flex justify-end gap-1">
                  <button className="grid h-8 w-8 place-items-center rounded-md hover:bg-surface"><Edit className="h-4 w-4" /></button>
                  <button className="grid h-8 w-8 place-items-center rounded-md text-destructive hover:bg-destructive/20"><Trash2 className="h-4 w-4" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OfertasCrud() {
  const ofertas = games.filter(g => g.descuento > 0);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <button className="grid place-items-center rounded-xl border-2 border-dashed border-border bg-surface/30 p-8 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
        <Plus className="h-8 w-8" />
        <span className="mt-2 font-medium">Crear nueva oferta</span>
      </button>
      {ofertas.map(g => (
        <div key={g.id} className="rounded-xl bg-gradient-card p-5 shadow-card">
          <div className="flex items-start gap-3">
            <img src={g.imagen} alt={g.titulo} className="h-20 w-16 rounded object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="truncate font-display text-lg font-bold">{g.titulo}</h4>
              <div className="mt-1 flex items-center gap-2">
                <Tag className="h-3 w-3 text-primary" />
                <span className="text-2xl font-bold text-primary">-{g.descuento}%</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                ${g.precio} → <span className="font-bold text-foreground">${finalPrice(g)}</span>
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 rounded-md border border-border py-1.5 text-xs hover:bg-surface">Editar</button>
            <button className="flex-1 rounded-md bg-destructive/20 py-1.5 text-xs text-destructive hover:bg-destructive/30">Finalizar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
