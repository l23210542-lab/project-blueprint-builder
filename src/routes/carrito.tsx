import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, ShoppingCart, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { games, finalPrice } from "@/data/games";
import { store, useStore } from "@/store/useStore";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/carrito")({
  head: () => ({ meta: [{ title: "Carrito · Steam Verde" }, { name: "description", content: "Revisa y completa tu compra." }] }),
  component: Carrito,
});

function Carrito() {
  const { carrito } = useStore();
  const [done, setDone] = useState(false);
  const items = games.filter(g => carrito.includes(g.id));
  const subtotal = items.reduce((s, g) => s + finalPrice(g), 0);
  const impuestos = +(subtotal * 0.12).toFixed(2);
  const total = +(subtotal + impuestos).toFixed(2);

  const checkout = () => {
    items.forEach(g => { store.remove("carrito", g.id); store.add("biblioteca", g.id); });
    setDone(true);
  };

  if (done) {
    return (
      <PageShell title="¡Compra confirmada!" subtitle="Los juegos se añadieron a tu biblioteca y se generó tu comprobante.">
        <div className="rounded-xl bg-gradient-card p-10 text-center shadow-card">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/20 text-success">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <p className="mt-4 text-muted-foreground">Transacción #SV-{Math.floor(Math.random() * 99999)}</p>
          <Link to="/biblioteca" className="mt-6 inline-flex rounded-md bg-gradient-primary px-6 py-2.5 font-semibold text-primary-foreground glow-primary">
            Ir a biblioteca
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Carrito de compras" subtitle="Revisa los juegos seleccionados antes de finalizar la compra.">
      {items.length === 0 ? (
        <div className="rounded-xl bg-gradient-card p-16 text-center shadow-card">
          <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 font-display text-2xl">Tu carrito está vacío</h2>
          <Link to="/catalogo" className="mt-4 inline-flex rounded-md bg-gradient-primary px-6 py-2.5 font-semibold text-primary-foreground glow-primary">Explorar catálogo</Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-3">
            {items.map(g => (
              <div key={g.id} className="flex items-center gap-4 rounded-lg bg-gradient-card p-3 shadow-card">
                <img src={g.imagen} alt={g.titulo} className="h-20 w-32 rounded object-cover" />
                <div className="flex-1">
                  <Link to="/juego/$id" params={{ id: g.id }} className="font-display text-lg font-semibold hover:text-primary">{g.titulo}</Link>
                  <p className="text-xs text-muted-foreground">{g.desarrollador}</p>
                </div>
                <div className="text-right">
                  {g.descuento > 0 && <div className="text-xs text-muted-foreground line-through">${g.precio}</div>}
                  <div className="font-display text-lg font-bold text-primary">${finalPrice(g)}</div>
                </div>
                <button onClick={() => store.remove("carrito", g.id)} className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground hover:bg-destructive/20 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <aside className="rounded-xl bg-gradient-card p-6 shadow-card h-fit">
            <h3 className="font-display text-xl font-bold">Resumen</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Impuestos (12%)</dt><dd>${impuestos}</dd></div>
              <div className="my-3 border-t border-border" />
              <div className="flex justify-between text-base"><dt className="font-semibold">Total</dt><dd className="font-display text-2xl font-bold text-primary">${total}</dd></div>
            </dl>
            <button onClick={checkout} className="mt-6 w-full rounded-md bg-gradient-primary py-3 font-semibold text-primary-foreground glow-primary hover:scale-[1.02] transition-transform">
              Finalizar compra
            </button>
            <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3 w-3" /> Pago simulado · transacción segura
            </p>
          </aside>
        </div>
      )}
    </PageShell>
  );
}
