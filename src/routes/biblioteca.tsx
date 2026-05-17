import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Search, Library as LibIcon } from "lucide-react";
import { useState } from "react";
import { games } from "@/data/games";
import { useStore } from "@/store/useStore";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({ meta: [{ title: "Biblioteca · Steam Verde" }, { name: "description", content: "Tu biblioteca digital de videojuegos." }] }),
  component: Biblioteca,
});

function Biblioteca() {
  const { biblioteca } = useStore();
  const [q, setQ] = useState("");
  const owned = games.filter(g => biblioteca.includes(g.id) && g.titulo.toLowerCase().includes(q.toLowerCase()));

  return (
    <PageShell title="Mi biblioteca" subtitle={`${biblioteca.length} juegos adquiridos · sincronizada con tu cuenta`}
      action={
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar en biblioteca…"
            className="rounded-md border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-primary" />
        </div>
      }
    >
      {owned.length === 0 ? (
        <div className="rounded-xl bg-gradient-card p-16 text-center shadow-card">
          <LibIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl">Tu biblioteca está vacía</h2>
          <p className="mt-2 text-muted-foreground">Explora el catálogo y empieza tu colección.</p>
          <Link to="/catalogo" className="mt-6 inline-flex rounded-md bg-gradient-primary px-6 py-2.5 font-semibold text-primary-foreground glow-primary">Ir al catálogo</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {owned.map(g => (
            <div key={g.id} className="flex items-center gap-4 rounded-lg bg-gradient-card p-3 shadow-card transition-colors hover:bg-surface-2">
              <img src={g.imagen} alt={g.titulo} className="h-20 w-32 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <Link to="/juego/$id" params={{ id: g.id }} className="font-display text-lg font-semibold hover:text-primary">
                  {g.titulo}
                </Link>
                <p className="text-xs text-muted-foreground">{g.desarrollador} · {g.genero.join(" · ")}</p>
                <p className="mt-1 text-xs text-primary">Instalado · Última sesión hace 2 días</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary">
                <Download className="h-4 w-4" /> Jugar
              </button>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
