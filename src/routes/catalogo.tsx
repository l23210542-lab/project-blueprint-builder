import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { games, finalPrice } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo · Steam Verde" },
      { name: "description", content: "Explora todo el catálogo de videojuegos con filtros por género, precio, popularidad y descuento." },
    ],
  }),
  component: Catalogo,
});

const generos = Array.from(new Set(games.flatMap(g => g.genero)));

function Catalogo() {
  const [q, setQ] = useState("");
  const [genero, setGenero] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState(60);
  const [soloOferta, setSoloOferta] = useState(false);
  const [orden, setOrden] = useState<"popular" | "precio" | "descuento" | "fecha">("popular");

  const result = useMemo(() => {
    let r = games.filter(g =>
      g.titulo.toLowerCase().includes(q.toLowerCase()) &&
      (!genero || g.genero.includes(genero)) &&
      finalPrice(g) <= maxPrice &&
      (!soloOferta || g.descuento > 0)
    );
    r = [...r].sort((a, b) => {
      if (orden === "precio") return finalPrice(a) - finalPrice(b);
      if (orden === "descuento") return b.descuento - a.descuento;
      if (orden === "fecha") return b.fechaLanzamiento.localeCompare(a.fechaLanzamiento);
      return b.reseñas - a.reseñas;
    });
    return r;
  }, [q, genero, maxPrice, soloOferta, orden]);

  return (
    <PageShell title="Catálogo" subtitle="Busca y filtra entre miles de videojuegos digitales.">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filtros */}
        <aside className="space-y-6 rounded-lg bg-gradient-card p-5 shadow-card">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Búsqueda</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar título…"
                className="w-full rounded-md border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Género</label>
            <select value={genero} onChange={e => setGenero(e.target.value)}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary">
              <option value="">Todos</option>
              {generos.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 flex justify-between text-xs font-semibold uppercase text-muted-foreground">
              Precio máx <span className="text-primary">${maxPrice}</span>
            </label>
            <input type="range" min={5} max={60} value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
              className="w-full accent-primary" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase text-muted-foreground">Ordenar</label>
            <select value={orden} onChange={e => setOrden(e.target.value as typeof orden)}
              className="w-full rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary">
              <option value="popular">Popularidad</option>
              <option value="precio">Precio</option>
              <option value="descuento">Descuento</option>
              <option value="fecha">Fecha</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={soloOferta} onChange={e => setSoloOferta(e.target.checked)} className="accent-primary" />
            Solo con descuento
          </label>
        </aside>

        {/* Grid */}
        <div>
          <p className="mb-4 text-sm text-muted-foreground">{result.length} resultados</p>
          {result.length === 0 ? (
            <div className="rounded-lg bg-surface p-12 text-center text-muted-foreground">Sin resultados</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {result.map(g => <GameCard key={g.id} game={g} />)}
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
