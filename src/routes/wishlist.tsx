import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import { games, finalPrice } from "@/data/games";
import { store, useStore } from "@/store/useStore";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Lista de deseos · Steam Verde" }, { name: "description", content: "Juegos que quieres comprar más adelante." }] }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist } = useStore();
  const items = games.filter(g => wishlist.includes(g.id));

  return (
    <PageShell title="Lista de deseos" subtitle={`${items.length} juegos guardados. Recibirás avisos cuando bajen de precio.`}>
      {items.length === 0 ? (
        <div className="rounded-xl bg-gradient-card p-16 text-center shadow-card">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl">Aún no guardaste juegos</h2>
          <Link to="/catalogo" className="mt-4 inline-flex rounded-md bg-gradient-primary px-6 py-2.5 font-semibold text-primary-foreground glow-primary">Explorar catálogo</Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map(g => (
            <div key={g.id} className="flex items-center gap-4 rounded-lg bg-gradient-card p-3 shadow-card">
              <img src={g.imagen} alt={g.titulo} className="h-20 w-32 rounded object-cover" />
              <div className="flex-1">
                <Link to="/juego/$id" params={{ id: g.id }} className="font-display text-lg font-semibold hover:text-primary">{g.titulo}</Link>
                <p className="text-xs text-muted-foreground">{g.genero.join(" · ")}</p>
              </div>
              <div className="text-right">
                {g.descuento > 0 && <span className="mr-2 rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">-{g.descuento}%</span>}
                <span className="font-display text-lg font-bold text-primary">${finalPrice(g)}</span>
              </div>
              <button onClick={() => { store.add("carrito", g.id); store.remove("wishlist", g.id); }}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground glow-primary">
                <ShoppingCart className="h-4 w-4" /> Al carrito
              </button>
              <button onClick={() => store.remove("wishlist", g.id)} className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-destructive/20 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
