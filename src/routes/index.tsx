import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Tag } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { games, finalPrice } from "@/data/games";
import { GameCard } from "@/components/GameCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inicio · Steam Verde" },
      { name: "description", content: "Descubre los videojuegos más vendidos, ofertas y novedades en Steam Verde." },
    ],
  }),
  component: Index,
});

function Index() {
  const destacados = games.filter(g => g.destacado);
  const ofertas = games.filter(g => g.descuento > 0).sort((a, b) => b.descuento - a.descuento);
  const hero = destacados[0];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" width={1920} height={1024} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Lanzamiento destacado
            </span>
            <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">
              Tu universo <span className="text-primary text-glow">gamer</span> en una sola plataforma
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Explora un catálogo dinámico, compra al instante, gestiona tu biblioteca digital y conecta con tu comunidad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalogo" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-6 py-3 font-semibold text-primary-foreground glow-primary transition-transform hover:scale-105">
                Explorar catálogo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/biblioteca" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-6 py-3 font-semibold backdrop-blur hover:bg-surface">
                Mi biblioteca
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-center">
              {[["12K+", "Juegos"], ["850K", "Usuarios"], ["4.8★", "Rating"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-bold text-primary">{n}</div>
                  <div className="text-xs text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {hero && (
            <Link to="/juego/$id" params={{ id: hero.id }} className="group relative overflow-hidden rounded-xl shadow-card">
              <img src={hero.imagen} alt={hero.titulo} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 inline-flex items-center gap-1 rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  -{hero.descuento}%
                </div>
                <h2 className="font-display text-3xl font-bold">{hero.titulo}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{hero.genero.join(" · ")}</p>
                <div className="mt-3 font-display text-2xl font-bold text-primary">${finalPrice(hero)}</div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* OFERTAS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Tag className="h-4 w-4" /> <span className="text-sm font-semibold uppercase tracking-wider">Ofertas activas</span>
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold">Descuentos de la semana</h2>
          </div>
          <Link to="/catalogo" className="text-sm text-primary hover:underline">Ver todo →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {ofertas.slice(0, 4).map(g => <GameCard key={g.id} game={g} />)}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Flame className="h-4 w-4" /> <span className="text-sm font-semibold uppercase tracking-wider">Tendencia</span>
            </div>
            <h2 className="mt-1 font-display text-3xl font-bold">Recomendados para ti</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {games.map(g => <GameCard key={g.id} game={g} />)}
        </div>
      </section>
    </main>
  );
}
