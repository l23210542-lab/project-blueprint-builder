import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Heart, ShoppingCart, Check, Calendar, Code2, Star } from "lucide-react";
import { getGame, finalPrice, reseñas as allReseñas, games } from "@/data/games";
import { store, useStore } from "@/store/useStore";
import { GameCard } from "@/components/GameCard";

export const Route = createFileRoute("/juego/$id")({
  head: ({ params }) => {
    const g = getGame(params.id);
    return {
      meta: [
        { title: g ? `${g.titulo} · Steam Verde` : "Juego" },
        { name: "description", content: g?.descripcion ?? "Detalles del videojuego." },
        { property: "og:image", content: g?.imagen ?? "" },
      ],
    };
  },
  component: JuegoDetalle,
});

function JuegoDetalle() {
  const { id } = useParams({ from: "/juego/$id" });
  const g = getGame(id);
  const s = useStore();

  if (!g) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl">Juego no encontrado</h1>
        <Link to="/catalogo" className="mt-4 inline-block text-primary hover:underline">← Volver al catálogo</Link>
      </div>
    );
  }

  const inCart = s.carrito.includes(g.id);
  const inWish = s.wishlist.includes(g.id);
  const owned = s.biblioteca.includes(g.id);
  const reviews = allReseñas.filter(r => r.juegoId === g.id);
  const relacionados = games.filter(x => x.id !== g.id && x.genero.some(ge => g.genero.includes(ge))).slice(0, 4);

  return (
    <main>
      {/* Banner */}
      <section className="relative h-72 overflow-hidden md:h-96">
        <img src={g.imagen} alt="" className="h-full w-full object-cover blur-xl opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </section>

      <div className="mx-auto -mt-44 max-w-7xl px-6 pb-16">
        <div className="grid gap-8 md:grid-cols-[360px_1fr]">
          <div className="space-y-4">
            <img src={g.imagen} alt={g.titulo} className="w-full rounded-xl shadow-card ring-1 ring-border" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-primary">{g.genero.join(" · ")}</p>
            <h1 className="mt-1 font-display text-5xl font-bold">{g.titulo}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Code2 className="h-4 w-4 text-primary" /> {g.desarrollador}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-primary" /> {g.fechaLanzamiento}</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-primary" fill="currentColor" /> {g.rating} ({g.reseñas.toLocaleString()} reseñas)</span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-foreground/90">{g.descripcion}</p>

            {/* Compra */}
            <div className="mt-8 rounded-xl bg-gradient-card p-5 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  {g.descuento > 0 && (
                    <span className="rounded bg-primary px-2 py-1 text-sm font-bold text-primary-foreground">-{g.descuento}%</span>
                  )}
                  {g.descuento > 0 && <span className="text-muted-foreground line-through">${g.precio}</span>}
                  <span className="font-display text-3xl font-bold text-primary">${finalPrice(g)}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => inWish ? store.remove("wishlist", g.id) : store.add("wishlist", g.id)}
                    className={`inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium ${inWish ? "bg-primary/10 text-primary" : "hover:bg-surface"}`}
                  >
                    <Heart className="h-4 w-4" fill={inWish ? "currentColor" : "none"} /> Wishlist
                  </button>
                  {owned ? (
                    <Link to="/biblioteca" className="inline-flex items-center gap-2 rounded-md bg-success px-5 py-2.5 font-semibold text-success-foreground">
                      <Check className="h-4 w-4" /> En tu biblioteca
                    </Link>
                  ) : inCart ? (
                    <Link to="/carrito" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 font-semibold text-primary-foreground glow-primary">
                      Ver carrito
                    </Link>
                  ) : (
                    <button onClick={() => store.add("carrito", g.id)}
                      className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 font-semibold text-primary-foreground glow-primary hover:scale-[1.02] transition-transform">
                      <ShoppingCart className="h-4 w-4" /> Añadir al carrito
                    </button>
                  )}
                </div>
              </div>
            </div>

            {g.requisitos && (
              <div className="mt-6 rounded-lg bg-surface p-4">
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Requisitos mínimos</h3>
                <p className="text-sm">{g.requisitos}</p>
              </div>
            )}
          </div>
        </div>

        {/* Reseñas */}
        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-3xl font-bold">Reseñas de la comunidad</h2>
            {owned && (
              <button className="rounded-md border border-primary/50 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10">
                Escribir reseña
              </button>
            )}
          </div>
          {reviews.length === 0 ? (
            <p className="rounded-lg bg-surface p-8 text-center text-muted-foreground">Aún no hay reseñas para este juego.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map(r => (
                <article key={r.id} className="rounded-lg bg-gradient-card p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                        {r.usuario.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{r.usuario}</div>
                        <div className="text-xs text-muted-foreground">{r.horas}h jugadas</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3" fill={i < r.puntuacion ? "currentColor" : "none"} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/90">{r.comentario}</p>
                  <div className="mt-3 text-xs text-muted-foreground">{r.fecha}</div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Relacionados */}
        {relacionados.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-3xl font-bold">Te puede gustar</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {relacionados.map(x => <GameCard key={x.id} game={x} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
