import { Link } from "@tanstack/react-router";
import { Heart, Plus, Check } from "lucide-react";
import type { Game } from "@/data/games";
import { finalPrice } from "@/data/games";
import { store, useStore } from "@/store/useStore";

export function GameCard({ game }: { game: Game }) {
  const s = useStore();
  const inCart = s.carrito.includes(game.id);
  const inWish = s.wishlist.includes(game.id);
  const price = finalPrice(game);

  return (
    <article className="group relative overflow-hidden rounded-lg bg-gradient-card shadow-card transition-all hover:-translate-y-1 hover:glow-primary">
      <Link to="/juego/$id" params={{ id: game.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img src={game.imagen} alt={game.titulo} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          {game.descuento > 0 && (
            <div className="absolute top-2 left-2 rounded bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
              -{game.descuento}%
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="line-clamp-1 font-display text-base font-semibold">{game.titulo}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{game.genero.join(" · ")}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {game.descuento > 0 && <span className="text-xs text-muted-foreground line-through">${game.precio}</span>}
              <span className="font-display text-lg font-bold text-primary">${price}</span>
            </div>
            <span className="text-xs text-muted-foreground">★ {game.rating}</span>
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={(e) => { e.preventDefault(); inWish ? store.remove("wishlist", game.id) : store.add("wishlist", game.id); }}
          className={`grid h-8 w-8 place-items-center rounded-md backdrop-blur ${inWish ? "bg-primary text-primary-foreground" : "bg-background/70 hover:bg-surface"}`}
          aria-label="Wishlist"
        >
          <Heart className="h-4 w-4" fill={inWish ? "currentColor" : "none"} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); if (!inCart) store.add("carrito", game.id); }}
          className={`grid h-8 w-8 place-items-center rounded-md backdrop-blur ${inCart ? "bg-success text-success-foreground" : "bg-background/70 hover:bg-surface"}`}
          aria-label="Carrito"
        >
          {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>
    </article>
  );
}
