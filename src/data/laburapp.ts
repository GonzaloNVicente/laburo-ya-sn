import { Brush, Zap, Wrench, Flame, BrickWall, Hammer, Anvil, Flower2, Sparkles, Truck, CircleEllipsis } from "lucide-react";
import electricidad from "@/assets/trabajo-electricidad.jpg";
import pintura from "@/assets/trabajo-pintura.jpg";
import plomeria from "@/assets/trabajo-plomeria.jpg";

export const zones = ["Centro", "Zona Norte", "Zona Sur", "Zona Oeste", "Costanera"];
export const timings = ["Hoy", "Esta semana", "Sin apuro"];
export const trades = [
  { name: "Pintura", icon: Brush, tone: "bg-trade-yellow" },
  { name: "Electricidad", icon: Zap, tone: "bg-trade-blue" },
  { name: "Plomería", icon: Wrench, tone: "bg-trade-cyan" },
  { name: "Gas", icon: Flame, tone: "bg-trade-orange" },
  { name: "Albañilería", icon: BrickWall, tone: "bg-trade-red" },
  { name: "Carpintería", icon: Hammer, tone: "bg-trade-wood" },
  { name: "Herrería", icon: Anvil, tone: "bg-trade-gray" },
  { name: "Jardinería", icon: Flower2, tone: "bg-trade-green" },
  { name: "Limpieza", icon: Sparkles, tone: "bg-trade-pink" },
  { name: "Fletes", icon: Truck, tone: "bg-trade-violet" },
  { name: "Otro", icon: CircleEllipsis, tone: "bg-trade-neutral" },
];
export const workers = [
  { id: 1, name: "Carlos Gómez", trade: "Electricista", rating: 4.9, jobs: 87, price: 45000, verified: true, phone: "5493364123456", image: electricidad, invoice: true },
  { id: 2, name: "Martín Acosta", trade: "Electricista", rating: 4.8, jobs: 52, price: 38000, verified: true, phone: "5493364234567", image: pintura, invoice: false },
  { id: 3, name: "Lucas Pereyra", trade: "Electricista", rating: 4.7, jobs: 34, price: 42000, verified: true, phone: "5493364345678", image: plomeria, invoice: true },
];
export const jobs = [
  { id: 1, title: "Cambiar tomas y revisar térmica", trade: "Electricidad", zone: "Centro", timing: "Hoy", price: 55000, image: electricidad, client: "Mariana", phone: "5493364456789", detail: "Necesito cambiar tres tomas y revisar la térmica que salta." },
  { id: 2, title: "Pintar frente de casa", trade: "Pintura", zone: "Zona Norte", timing: "Esta semana", price: 180000, image: pintura, client: "Roberto", phone: "5493364567890", detail: "Frente de una planta. Ya tengo parte de la pintura." },
  { id: 3, title: "Arreglar pérdida bajo mesada", trade: "Plomería", zone: "Costanera", timing: "Hoy", price: 40000, image: plomeria, client: "Laura", phone: "5493364678901", detail: "Pierde agua cuando usamos la pileta de la cocina." },
];
export const applications = [
  { jobId: 1, workerId: 1, status: "Postulado" },
  { jobId: 2, workerId: 2, status: "Elegido" },
];
export const money = (value: number) => `$ ${new Intl.NumberFormat("es-AR").format(value)}`;
