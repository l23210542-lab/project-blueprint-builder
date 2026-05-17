import g1 from "@/assets/game-1.jpg";
import g2 from "@/assets/game-2.jpg";
import g3 from "@/assets/game-3.jpg";
import g4 from "@/assets/game-4.jpg";
import g5 from "@/assets/game-5.jpg";
import g6 from "@/assets/game-6.jpg";

export type Game = {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  descuento: number;
  genero: string[];
  desarrollador: string;
  fechaLanzamiento: string;
  rating: number;
  reseñas: number;
  imagen: string;
  requisitos?: string;
  trailer?: string;
  destacado?: boolean;
};

export const games: Game[] = [
  { id: "1", titulo: "Mech Ascension", descripcion: "Combate táctico de mechas en un bosque tóxico. Desbloquea más de 40 chasis y domina batallas multijugador 6v6.", precio: 59.99, descuento: 25, genero: ["Acción", "Sci-Fi"], desarrollador: "Verdant Studios", fechaLanzamiento: "2025-03-12", rating: 4.7, reseñas: 12480, imagen: g1, requisitos: "Windows 10 · 16 GB RAM · GTX 1660", destacado: true },
  { id: "2", titulo: "Wasteland Echo", descripcion: "Aventura post-apocalíptica de mundo abierto con decisiones morales que alteran el ecosistema verde.", precio: 49.99, descuento: 40, genero: ["RPG", "Aventura"], desarrollador: "Pale Horse Games", fechaLanzamiento: "2024-11-04", rating: 4.5, reseñas: 8721, imagen: g2, requisitos: "Windows 10 · 12 GB RAM · GTX 1060", destacado: true },
  { id: "3", titulo: "Emerald Archer", desarrollador: "Mythvein", descripcion: "RPG de fantasía con magia esmeralda, raids cooperativos y un sistema de elementos profundo.", precio: 39.99, descuento: 0, genero: ["RPG", "Fantasía"], fechaLanzamiento: "2025-01-22", rating: 4.8, reseñas: 21034, imagen: g3, requisitos: "Windows 10 · 8 GB RAM · GTX 1050", destacado: true },
  { id: "4", titulo: "Neon Drift 2088", descripcion: "Carreras arcade futuristas a través de nebulosas. 60+ pistas y editor de vehículos.", precio: 29.99, descuento: 50, genero: ["Carreras", "Arcade"], desarrollador: "ChromaWorks", fechaLanzamiento: "2024-08-18", rating: 4.4, reseñas: 6402, imagen: g4, requisitos: "Windows 10 · 8 GB RAM · GTX 970" },
  { id: "5", titulo: "Shadow Katana", descripcion: "Stealth-action en una ciudad cyberpunk. Sigilo, parkour y combate quirúrgico.", precio: 44.99, descuento: 15, genero: ["Sigilo", "Acción"], desarrollador: "Black Petal", fechaLanzamiento: "2025-02-09", rating: 4.6, reseñas: 9870, imagen: g5 },
  { id: "6", titulo: "Greenfields Online", descripcion: "Vida en granja cooperativa multijugador. Cultiva, pesca y construye tu aldea.", precio: 24.99, descuento: 0, genero: ["Simulación", "Cozy"], desarrollador: "Sunbloom Labs", fechaLanzamiento: "2024-06-01", rating: 4.9, reseñas: 34201, imagen: g6 },
];

export const getGame = (id: string) => games.find(g => g.id === id);
export const finalPrice = (g: Game) => +(g.precio * (1 - g.descuento / 100)).toFixed(2);

export type Amigo = { id: string; username: string; estado: "en línea" | "jugando" | "desconectado"; juego?: string; avatar: string };
export const amigos: Amigo[] = [
  { id: "a1", username: "NovaKnight", estado: "jugando", juego: "Mech Ascension", avatar: "NK" },
  { id: "a2", username: "PixelSage", estado: "en línea", avatar: "PS" },
  { id: "a3", username: "VerdeRunner", estado: "jugando", juego: "Emerald Archer", avatar: "VR" },
  { id: "a4", username: "GhostByte", estado: "desconectado", avatar: "GB" },
  { id: "a5", username: "LumenWolf", estado: "en línea", avatar: "LW" },
];

export const solicitudes = [
  { id: "s1", username: "ZeroCipher", avatar: "ZC" },
  { id: "s2", username: "MossGuardian", avatar: "MG" },
];

export type Reseña = { id: string; juegoId: string; usuario: string; puntuacion: number; fecha: string; comentario: string; horas: number };
export const reseñas: Reseña[] = [
  { id: "r1", juegoId: "1", usuario: "NovaKnight", puntuacion: 5, fecha: "2025-04-12", horas: 124, comentario: "Las batallas 6v6 son adictivas. La progresión de chasis tiene profundidad real." },
  { id: "r2", juegoId: "1", usuario: "PixelSage", puntuacion: 4, fecha: "2025-04-02", horas: 56, comentario: "Excelente gameplay, aunque el matchmaking puede mejorar en horas pico." },
  { id: "r3", juegoId: "1", usuario: "VerdeRunner", puntuacion: 5, fecha: "2025-03-28", horas: 88, comentario: "El mejor juego de mechas de los últimos años." },
];
