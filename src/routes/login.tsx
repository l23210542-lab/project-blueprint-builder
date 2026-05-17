import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión · Steam Verde" }, { name: "description", content: "Accede a tu cuenta Steam Verde." }] }),
  component: Login,
});

function Login() {
  return (
    <main className="mx-auto grid min-h-[80vh] max-w-md place-items-center px-6">
      <div className="w-full rounded-2xl bg-gradient-card p-8 shadow-card">
        <div className="mb-6 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-primary glow-primary">
            <span className="text-2xl font-black text-primary-foreground">V</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-muted-foreground">Bienvenido de vuelta a Steam Verde.</p>
        </div>
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Email o usuario</span>
            <input type="text" className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 outline-none focus:border-primary" placeholder="usuario@verde.com" />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Contraseña</span>
            <input type="password" className="mt-1 w-full rounded-md border border-border bg-input px-3 py-2 outline-none focus:border-primary" placeholder="••••••••" />
          </label>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="accent-primary" /> Recordarme</label>
            <a href="#" className="text-primary hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          <Link to="/" className="block w-full rounded-md bg-gradient-primary py-2.5 text-center font-semibold text-primary-foreground glow-primary">
            Iniciar sesión
          </Link>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tienes cuenta? <Link to="/registro" className="font-semibold text-primary hover:underline">Crear cuenta</Link>
        </p>
      </div>
    </main>
  );
}
