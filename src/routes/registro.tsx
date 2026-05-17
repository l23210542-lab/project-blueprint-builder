import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/registro")({
  head: () => ({ meta: [{ title: "Crear cuenta · Steam Verde" }, { name: "description", content: "Regístrate en Steam Verde y empieza a coleccionar juegos." }] }),
  component: Registro,
});

function Registro() {
  return (
    <main className="mx-auto grid min-h-[80vh] max-w-md place-items-center px-6 py-10">
      <div className="w-full rounded-2xl bg-gradient-card p-8 shadow-card">
        <div className="mb-6 text-center">
          <h1 className="font-display text-3xl font-bold">Crear cuenta</h1>
          <p className="mt-1 text-sm text-muted-foreground">Únete a la comunidad Steam Verde.</p>
        </div>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Nombre de usuario</span>
            <input className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 outline-none focus:border-primary" placeholder="tu_usuario" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Correo electrónico</span>
            <input type="email" className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 outline-none focus:border-primary" placeholder="email@dominio.com" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Contraseña</span>
              <input type="password" className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Fecha nac.</span>
              <input type="date" className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 outline-none focus:border-primary" />
            </label>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" className="mt-0.5 accent-primary" />
            Acepto los términos y la política de privacidad de Steam Verde.
          </label>
          <Link to="/" className="block w-full rounded-md bg-gradient-primary py-2.5 text-center font-semibold text-primary-foreground glow-primary">
            Crear cuenta
          </Link>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta? <Link to="/login" className="font-semibold text-primary hover:underline">Iniciar sesión</Link>
        </p>
      </div>
    </main>
  );
}
