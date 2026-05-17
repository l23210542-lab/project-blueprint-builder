import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus, Check, X, Search } from "lucide-react";
import { amigos as initial, solicitudes as initialReq } from "@/data/games";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/amigos")({
  head: () => ({ meta: [{ title: "Amigos · Steam Verde" }, { name: "description", content: "Gestiona tu lista de amigos y solicitudes." }] }),
  component: Amigos,
});

function Amigos() {
  const [list, setList] = useState(initial);
  const [req, setReq] = useState(initialReq);
  const [q, setQ] = useState("");

  const filtered = list.filter(a => a.username.toLowerCase().includes(q.toLowerCase()));
  const accept = (id: string) => {
    const r = req.find(x => x.id === id);
    if (r) {
      setList([...list, { id: r.id, username: r.username, estado: "en línea", avatar: r.avatar }]);
      setReq(req.filter(x => x.id !== id));
    }
  };

  return (
    <PageShell title="Comunidad" subtitle="Tu red de jugadores · invita, acepta y descubre nuevos amigos.">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold">Amigos ({list.length})</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar amigo…"
                className="rounded-md border border-border bg-input py-2 pl-9 pr-3 text-sm outline-none focus:border-primary" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map(a => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg bg-gradient-card p-4 shadow-card">
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/20 font-bold text-primary">{a.avatar}</div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ring-2 ring-card ${
                    a.estado === "desconectado" ? "bg-muted-foreground" : "bg-success"
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{a.username}</div>
                  <div className="text-xs text-muted-foreground">
                    {a.estado === "jugando" ? `Jugando: ${a.juego}` : a.estado === "en línea" ? "En línea" : "Desconectado"}
                  </div>
                </div>
                <button className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-surface">Mensaje</button>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl bg-gradient-card p-5 shadow-card">
            <h3 className="font-display text-lg font-bold">Solicitudes ({req.length})</h3>
            <div className="mt-3 space-y-2">
              {req.length === 0 && <p className="text-sm text-muted-foreground">Sin solicitudes pendientes.</p>}
              {req.map(r => (
                <div key={r.id} className="flex items-center gap-3 rounded-md bg-surface p-2">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary">{r.avatar}</div>
                  <div className="flex-1 text-sm font-medium">{r.username}</div>
                  <button onClick={() => accept(r.id)} className="grid h-8 w-8 place-items-center rounded-md bg-success text-success-foreground hover:opacity-90">
                    <Check className="h-4 w-4" />
                  </button>
                  <button onClick={() => setReq(req.filter(x => x.id !== r.id))} className="grid h-8 w-8 place-items-center rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-gradient-card p-5 shadow-card">
            <h3 className="font-display text-lg font-bold">Añadir amigo</h3>
            <p className="mt-1 text-xs text-muted-foreground">Envía una solicitud por nombre de usuario.</p>
            <div className="mt-3 flex gap-2">
              <input placeholder="usuario#1234" className="flex-1 rounded-md border border-border bg-input px-3 py-2 text-sm outline-none focus:border-primary" />
              <button className="inline-flex items-center gap-1 rounded-md bg-gradient-primary px-3 py-2 text-sm font-semibold text-primary-foreground glow-primary">
                <UserPlus className="h-4 w-4" /> Enviar
              </button>
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
