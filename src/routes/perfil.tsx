import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit3, Library, Heart, Users, Trophy } from "lucide-react";
import { useStore } from "@/store/useStore";
import { PageShell } from "@/components/PageShell";
import { amigos, games } from "@/data/games";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Perfil · Steam Verde" }, { name: "description", content: "Gestiona tu perfil, biblioteca y comunidad." }] }),
  component: Perfil,
});

function Perfil() {
  const { biblioteca, wishlist } = useStore();
  const recientes = games.filter(g => biblioteca.includes(g.id)).slice(0, 3);

  const stats = [
    { label: "Juegos", value: biblioteca.length, icon: Library },
    { label: "Wishlist", value: wishlist.length, icon: Heart },
    { label: "Amigos", value: amigos.length, icon: Users },
    { label: "Logros", value: 47, icon: Trophy },
  ];

  return (
    <PageShell title="Mi perfil" subtitle="Información de cuenta, estadísticas y actividad reciente.">
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {/* Card perfil */}
          <div className="overflow-hidden rounded-xl bg-gradient-card shadow-card">
            <div className="h-32 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/20" />
            <div className="p-6 pt-0">
              <div className="-mt-12 flex items-end justify-between">
                <div className="grid h-24 w-24 place-items-center rounded-xl bg-gradient-primary text-3xl font-black text-primary-foreground ring-4 ring-background glow-primary">
                  AG
                </div>
                <button className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm hover:bg-surface-2">
                  <Edit3 className="h-4 w-4" /> Editar perfil
                </button>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold">Alex Gamer</h2>
              <p className="text-sm text-muted-foreground">@alexgamer · Miembro desde 2024</p>
              <p className="mt-3 max-w-2xl text-sm text-foreground/80">
                Fan de RPGs y juegos de mechas. Coleccionista de logros y completista compulsivo.
              </p>
              <div className="mt-6 grid grid-cols-4 gap-4">
                {stats.map(s => (
                  <div key={s.label} className="rounded-lg bg-surface p-4 text-center">
                    <s.icon className="mx-auto h-5 w-5 text-primary" />
                    <div className="mt-2 font-display text-xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="rounded-xl bg-gradient-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-xl font-bold">Actividad reciente</h3>
            {recientes.length === 0 ? (
              <p className="text-muted-foreground">Sin actividad. <Link to="/catalogo" className="text-primary hover:underline">Empieza a jugar.</Link></p>
            ) : (
              <div className="space-y-3">
                {recientes.map(g => (
                  <Link key={g.id} to="/juego/$id" params={{ id: g.id }} className="flex items-center gap-3 rounded-lg bg-surface p-3 hover:bg-surface-2">
                    <img src={g.imagen} alt={g.titulo} className="h-14 w-20 rounded object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold">{g.titulo}</div>
                      <div className="text-xs text-muted-foreground">Última sesión: hace 2 días · 12h jugadas</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar amigos */}
        <aside className="rounded-xl bg-gradient-card p-6 shadow-card h-fit">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold">Amigos</h3>
            <Link to="/amigos" className="text-sm text-primary hover:underline">Ver todos →</Link>
          </div>
          <div className="space-y-3">
            {amigos.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="relative">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary">{a.avatar}</div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-card ${
                    a.estado === "desconectado" ? "bg-muted-foreground" : "bg-success"
                  }`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{a.username}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {a.estado === "jugando" ? `Jugando: ${a.juego}` : a.estado}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
