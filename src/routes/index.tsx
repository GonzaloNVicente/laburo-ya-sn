import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  Hammer,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Send,
  Star,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobs, money, timings, trades, workers, zones } from "@/data/laburapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laburapp — Oficios en San Nicolás" },
      {
        name: "description",
        content: "Encontrá trabajadores de confianza o nuevos trabajos de oficio en San Nicolás.",
      },
      { property: "og:title", content: "Laburapp — Oficios en San Nicolás" },
      { property: "og:description", content: "Trabajadores y vecinos de San Nicolás, más cerca." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Laburapp,
});

type Role = "client" | "worker";
type Screen =
  | "welcome"
  | "phone"
  | "code"
  | "trade"
  | "photos"
  | "place"
  | "when"
  | "budget"
  | "published"
  | "applicants"
  | "chosen"
  | "rating"
  | "workerName"
  | "workerTrade"
  | "workerProfile"
  | "feed"
  | "job"
  | "offer"
  | "offered"
  | "myJobs";

function Laburapp() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [role, setRole] = useState<Role>("client");
  const [history, setHistory] = useState<Screen[]>([]);
  const [trade, setTrade] = useState("Electricidad");
  const [workerTrades, setWorkerTrades] = useState<string[]>(["Electricidad"]);
  const [zone, setZone] = useState("Centro");
  const [timing, setTiming] = useState("Esta semana");
  const [description, setDescription] = useState("Cambiar tres tomas y revisar la térmica");
  const [budget, setBudget] = useState("55000");
  const [phone, setPhone] = useState("4123456");
  const [code, setCode] = useState("");
  const [name, setName] = useState("Juan Pérez");
  const [invoice, setInvoice] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [jobId, setJobId] = useState(1);
  const [offer, setOffer] = useState("45000");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const currentJob = jobs.find((item) => item.id === jobId) ?? jobs[1];
  const go = (next: Screen) => {
    setHistory((old) => [...old, screen]);
    setScreen(next);
    window.scrollTo(0, 0);
  };
  const back = () => {
    const previous = history.at(-1);
    if (previous) {
      setHistory((old) => old.slice(0, -1));
      setScreen(previous);
    }
  };
  const start = (nextRole: Role) => {
    setRole(nextRole);
    go(nextRole === "client" ? "trade" : "phone");
  };
  const afterLogin = () => go(role === "client" ? "published" : "workerName");
  const examples: Record<string, string> = {
    Pintura: "Pintar el frente de casa",
    Electricidad: "Cambiar tres tomas y revisar la térmica",
    Plomería: "Arreglar una pérdida bajo la mesada",
    Gas: "Revisar la conexión de la cocina",
    Albañilería: "Reparar una pared con humedad",
    Carpintería: "Arreglar una puerta que no cierra",
    Herrería: "Reparar la reja del frente",
    Jardinería: "Cortar el pasto y podar plantas",
    Limpieza: "Hacer una limpieza profunda",
    Fletes: "Llevar un sillón dentro de la ciudad",
    Otro: "Contá brevemente qué necesitás",
  };
  const chooseClientTrade = (value: string) => {
    setTrade(value);
    setDescription(examples[value] ?? examples.Otro);
    go("photos");
  };
  const toggleWorkerTrade = (value: string) =>
    setWorkerTrades((old) =>
      old.includes(value)
        ? old.length > 1
          ? old.filter((item) => item !== value)
          : old
        : [...old, value],
    );
  const onPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? [])
      .slice(0, 3 - photos.length)
      .map(URL.createObjectURL);
    setPhotos((old) => [...old, ...selected].slice(0, 3));
  };
  const title = useMemo(
    () =>
      (
        ({
          phone: "Ingresá con tu celular",
          code: "Te mandamos un código",
          trade: "¿Qué trabajo necesitás?",
          photos: "Mostranos qué hay que hacer",
          place: "¿En qué zona?",
          when: "¿Para cuándo?",
          budget: "¿Cuánto ofrecés?",
          applicants: "3 trabajadores se postularon",
          rating: "¿Cómo trabajó Carlos?",
          workerName: "Contanos tu nombre",
          workerTrade: "¿Qué trabajo hacés?",
          workerProfile: "Completá tu perfil",
          feed: "Trabajos para vos",
          job: currentJob.title,
          offer: "¿Cuánto cobrás?",
          myJobs: "Mis trabajos",
        }) as Partial<Record<Screen, string>>
      )[screen],
    [screen, currentJob],
  );

  const content = (() => {
    if (screen === "welcome") return <Welcome onStart={start} />;
    if (screen === "phone")
      return (
        <FormScreen hint="Sin email ni contraseña.">
          <FieldLabel icon={<Phone />}>Tu número</FieldLabel>
          <div className="grid grid-cols-[88px_1fr] gap-3">
            <div className="input-static">+54 336</div>
            <Input
              aria-label="Número de celular"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 7))}
              className="h-16 text-xl"
            />
          </div>
          <BottomAction disabled={phone.length < 7} onClick={() => go("code")} icon={<Send />}>
            Mandar código
          </BottomAction>
        </FormScreen>
      );
    if (screen === "code")
      return (
        <FormScreen hint={`Lo enviamos al +54 336 ${phone}.`}>
          <FieldLabel icon={<MessageCircle />}>Código de 4 números</FieldLabel>
          <Input
            autoFocus
            aria-label="Código"
            inputMode="numeric"
            placeholder="• • • •"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="h-20 text-center text-3xl tracking-[.5em]"
          />
          <button className="text-link" onClick={() => setCode("1234")}>
            No me llegó · Usar 1234
          </button>
          <BottomAction disabled={code.length < 4} onClick={afterLogin} icon={<Check />}>
            Entrar
          </BottomAction>
        </FormScreen>
      );
    if (screen === "trade" || screen === "workerTrade")
      return (
        <FormScreen hint={screen === "trade" ? "Tocá una opción." : "Elegí tu oficio principal."}>
          {screen === "trade" ? (
            <TradeGrid selected={[trade]} onSelect={chooseClientTrade} />
          ) : (
            <>
              <TradeGrid selected={workerTrades} onSelect={toggleWorkerTrade} />
              <BottomAction onClick={() => go("workerProfile")} icon={<ChevronRight />}>
                Seguir
              </BottomAction>
            </>
          )}
        </FormScreen>
      );
    if (screen === "photos")
      return (
        <FormScreen hint="Una foto ayuda a recibir mejores ofertas.">
          <FieldLabel icon={<Camera />}>Fotos del trabajo</FieldLabel>
          <input
            ref={fileRef}
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={onPhotos}
          />
          <div className="photo-grid">
            {photos.map((src) => (
              <img key={src} src={src} alt="Trabajo elegido" />
            ))}
            {photos.length < 3 && (
              <button className="photo-add" onClick={() => fileRef.current?.click()}>
                <Camera />
                <span>Agregar foto</span>
              </button>
            )}
          </div>
          <FieldLabel icon={<FileText />}>Una frase corta</FieldLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            className="min-h-28 text-lg"
          />
          <BottomAction onClick={() => go("place")} icon={<ChevronRight />}>
            Seguir
          </BottomAction>
        </FormScreen>
      );
    if (screen === "place")
      return (
        <FormScreen>
          <FieldLabel icon={<MapPin />}>Zona</FieldLabel>
          <ChoiceList
            options={zones}
            value={zone}
            onSelect={(value) => {
              setZone(value);
              go("when");
            }}
          />
        </FormScreen>
      );
    if (screen === "when")
      return (
        <FormScreen>
          <FieldLabel icon={<Clock3 />}>¿Para cuándo?</FieldLabel>
          <ChoiceList
            options={timings}
            value={timing}
            onSelect={(value) => {
              setTiming(value);
              go("budget");
            }}
          />
        </FormScreen>
      );
    if (screen === "budget")
      return (
        <FormScreen hint="Es opcional. Los trabajadores igual pueden ofrecer otro precio.">
          <FieldLabel icon={<WalletCards />}>Precio en pesos</FieldLabel>
          <div className="money-input">
            <span>$</span>
            <Input
              aria-label="Precio ofrecido"
              inputMode="numeric"
              value={budget}
              onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))}
              placeholder="Por ejemplo: 50000"
            />
          </div>
          <Summary
            trade={trade}
            zone={zone}
            timing={timing}
            price={budget ? Number(budget) : undefined}
          />
          <BottomAction onClick={() => go("phone")} icon={<Send />}>
            Publicar trabajo
          </BottomAction>
        </FormScreen>
      );
    if (screen === "published")
      return (
        <Success
          icon={<Check />}
          title="¡Trabajo publicado!"
          text="Te avisamos por WhatsApp cuando alguien se postule."
          action="Ver postulaciones"
          onAction={() => go("applicants")}
        />
      );
    if (screen === "applicants")
      return (
        <div className="stack">
          <ApplicationSummary
            trade={trade}
            description={description}
            zone={zone}
            image={photos[0]}
          />
          {workers.map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              trade={trade}
              onChoose={() => go("chosen")}
            />
          ))}
        </div>
      );
    if (screen === "chosen")
      return (
        <Success
          icon={<BadgeCheck />}
          title={`Elegiste a ${workers[0].name.split(" ")[0]}`}
          text="Coordiná el día y los detalles directamente por WhatsApp."
          action="Hablar por WhatsApp"
          actionIcon={<MessageCircle />}
          whatsapp
          href={`https://wa.me/${workers[0].phone}?text=${encodeURIComponent(`Hola Carlos, te elegí para mi trabajo de ${trade.toLocaleLowerCase("es-AR")} en Laburapp.`)}`}
          secondary="Calificar trabajo terminado"
          onSecondary={() => go("rating")}
        />
      );
    if (screen === "rating")
      return (
        <FormScreen hint="Tu opinión ayuda a otros vecinos.">
          <div className="rating-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} aria-label={`${star} estrellas`} onClick={() => setRating(star)}>
                <Star className={star <= rating ? "star-filled" : ""} />
              </button>
            ))}
          </div>
          <FieldLabel icon={<FileText />}>Comentario opcional</FieldLabel>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Contanos en pocas palabras"
            className="min-h-28 text-lg"
          />
          <BottomAction disabled={!rating} onClick={() => setScreen("welcome")} icon={<Check />}>
            Enviar calificación
          </BottomAction>
        </FormScreen>
      );
    if (screen === "workerName")
      return (
        <FormScreen hint="Así te van a ver los vecinos.">
          <FieldLabel icon={<UserRound />}>Nombre y apellido</FieldLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} className="h-16 text-xl" />
          <BottomAction
            disabled={!name.trim()}
            onClick={() => go("workerTrade")}
            icon={<ChevronRight />}
          >
            Seguir
          </BottomAction>
        </FormScreen>
      );
    if (screen === "workerProfile")
      return (
        <FormScreen>
          <FieldLabel icon={<MapPin />}>¿En qué zona trabajás?</FieldLabel>
          <ChoiceList options={zones} value={zone} onSelect={setZone} />
          <FieldLabel icon={<Camera />}>Foto de perfil (opcional)</FieldLabel>
          <button className="profile-photo" onClick={() => fileRef.current?.click()}>
            <Camera />
            <span>Agregar mi foto</span>
          </button>
          <input ref={fileRef} className="hidden" type="file" accept="image/*" />
          <FieldLabel icon={<FileText />}>¿Hacés factura?</FieldLabel>
          <ChoiceList
            options={["Sí", "No"]}
            value={invoice ? "Sí" : "No"}
            onSelect={(value) => setInvoice(value === "Sí")}
          />
          <BottomAction onClick={() => go("feed")} icon={<Check />}>
            Terminar registro
          </BottomAction>
        </FormScreen>
      );
    if (screen === "feed")
      return (
        <div className="stack">
          <div className="welcome-strip">
            <div>
              <strong>Hola, {name.split(" ")[0]}</strong>
              <span>
                {workerTrades.join(", ")} · {zone}
              </span>
            </div>
            <BadgeCheck />
          </div>
          {jobs
            .filter((job) => job.id > 0 && workerTrades.includes(job.trade))
            .map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onOpen={() => {
                  setJobId(job.id);
                  go("job");
                }}
              />
            ))}
        </div>
      );
    if (screen === "job")
      return (
        <div className="job-detail">
          <img src={currentJob.image} alt={currentJob.title} width={1024} height={768} />
          <div className="detail-body">
            <div className="job-price">{money(currentJob.price)}</div>
            <div className="job-facts">
              <span>
                <MapPin />
                {currentJob.zone}
              </span>
              <span>
                <Clock3 />
                {currentJob.timing}
              </span>
            </div>
            <p>{currentJob.detail}</p>
            <div className="client-line">
              <UserRound />
              <span>
                Publicado por <strong>{currentJob.client}</strong>
              </span>
            </div>
          </div>
          <BottomAction onClick={() => go("offer")} icon={<BriefcaseBusiness />}>
            Me interesa
          </BottomAction>
        </div>
      );
    if (screen === "offer")
      return (
        <FormScreen hint={`El vecino ofreció ${money(currentJob.price)}.`}>
          <Button
            variant="action"
            size="lg"
            onClick={() => {
              setOffer(String(currentJob.price));
              go("offered");
            }}
          >
            <Check />
            Lo hago por {money(currentJob.price)}
          </Button>
          <FieldLabel icon={<WalletCards />}>Tu precio final</FieldLabel>
          <div className="money-input">
            <span>$</span>
            <Input
              autoFocus
              aria-label="Mi precio"
              inputMode="numeric"
              value={offer}
              onChange={(e) => setOffer(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <BottomAction disabled={!offer} onClick={() => go("offered")} icon={<Send />}>
            Mandar oferta
          </BottomAction>
        </FormScreen>
      );
    if (screen === "offered")
      return (
        <Success
          icon={<Check />}
          title="¡Oferta enviada!"
          text={`${currentJob.client} va a ver tu precio de ${money(Number(offer))}.`}
          action="Ver mis trabajos"
          onAction={() => go("myJobs")}
        />
      );
    if (screen === "myJobs")
      return (
        <div className="stack">
          <StatusCard status="Elegido" title="Pintar frente de casa" price={180000} />
          <a
            className="whatsapp-link"
            href={`https://wa.me/${jobs[1].phone}?text=${encodeURIComponent("Hola Roberto, soy el trabajador que elegiste en Laburapp.")}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle />
            Hablar con Roberto
          </a>
          <StatusCard status="Esperando respuesta" title={currentJob.title} price={Number(offer)} />
        </div>
      );
    return null;
  })();

  const workerNav = ["feed", "job", "offer", "offered", "myJobs"].includes(screen);
  return (
    <main className="app-shell">
      <div className="phone-shell">
        {screen !== "welcome" && (
          <header className="topbar">
            <button aria-label="Volver" onClick={back}>
              <ArrowLeft />
            </button>
            <div>
              <span className="brand-small">LABURAPP</span>
              {title && <h1>{title}</h1>}
            </div>
          </header>
        )}
        <section className={screen === "welcome" ? "welcome-content" : "screen-content"}>
          {content}
        </section>
        {workerNav && (
          <nav className="bottom-nav">
            <button className={screen !== "myJobs" ? "active" : ""} onClick={() => go("feed")}>
              <Search />
              <span>Buscar</span>
            </button>
            <button className={screen === "myJobs" ? "active" : ""} onClick={() => go("myJobs")}>
              <BriefcaseBusiness />
              <span>Mis trabajos</span>
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}

function Welcome({ onStart }: { onStart: (role: Role) => void }) {
  return (
    <>
      <div className="brand-block">
        <div className="logo-mark">
          <Hammer />
        </div>
        <span>LABURAPP</span>
        <h1>
          Una mano cerca,
          <br />
          cuando la necesitás.
        </h1>
        <p>Trabajos y trabajadores de San Nicolás.</p>
      </div>
      <div className="welcome-actions">
        <Button size="lg" variant="action" onClick={() => onStart("client")}>
          <UsersRound />
          Necesito un trabajador
        </Button>
        <Button size="lg" variant="outline" onClick={() => onStart("worker")}>
          <BriefcaseBusiness />
          Soy trabajador, busco trabajo
        </Button>
      </div>
      <div className="local-note">
        <MapPin />
        San Nicolás de los Arroyos
      </div>
    </>
  );
}
function FormScreen({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <div className="form-screen">
      {hint && <p className="hint">{hint}</p>}
      {children}
    </div>
  );
}
function FieldLabel({ children, icon }: { children: ReactNode; icon: ReactNode }) {
  return (
    <div className="field-label">
      {icon}
      {children}
    </div>
  );
}
function BottomAction({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: ReactNode;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="bottom-action">
      <Button variant="action" size="lg" onClick={onClick} disabled={disabled}>
        {icon}
        {children}
      </Button>
    </div>
  );
}
function TradeGrid({
  selected,
  onSelect,
}: {
  selected: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="trade-grid">
      {trades.map(({ name, icon: Icon, tone }) => (
        <button
          key={name}
          className={selected.includes(name) ? "selected" : ""}
          onClick={() => onSelect(name)}
        >
          <span className={tone}>
            <Icon />
          </span>
          <strong>{name}</strong>
          {selected.includes(name) && <Check className="trade-check" />}
        </button>
      ))}
    </div>
  );
}
function ChoiceList({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="choice-list">
      {options.map((option) => (
        <button
          key={option}
          className={value === option ? "selected" : ""}
          onClick={() => onSelect(option)}
        >
          <span>{option}</span>
          {value === option && <Check />}
        </button>
      ))}
    </div>
  );
}
function Summary({
  trade,
  zone,
  timing,
  price,
}: {
  trade: string;
  zone: string;
  timing: string;
  price: number | undefined;
}) {
  return (
    <div className="summary">
      <strong>{trade}</strong>
      <span>
        <MapPin />
        {zone}
      </span>
      <span>
        <Clock3 />
        {timing}
      </span>
      {price && <b>{money(price)}</b>}
    </div>
  );
}
function Success({
  icon,
  title,
  text,
  action,
  actionIcon,
  onAction,
  href,
  whatsapp,
  secondary,
  onSecondary,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  action: string;
  actionIcon?: ReactNode;
  onAction?: () => void;
  href?: string;
  whatsapp?: boolean;
  secondary?: string;
  onSecondary?: () => void;
}) {
  const button = href ? (
    <a className="whatsapp-link" href={href} target="_blank" rel="noreferrer">
      {actionIcon ?? <ChevronRight />}
      {action}
    </a>
  ) : (
    <Button variant={whatsapp ? "whatsapp" : "action"} size="lg" onClick={onAction}>
      {actionIcon ?? <ChevronRight />}
      {action}
    </Button>
  );
  return (
    <div className="success">
      <div className="success-icon">{icon}</div>
      <h1>{title}</h1>
      <p>{text}</p>
      <div className="success-actions">
        {button}
        {secondary && (
          <Button variant="outline" size="lg" onClick={onSecondary}>
            <Star />
            {secondary}
          </Button>
        )}
      </div>
    </div>
  );
}
function WorkerCard({
  worker,
  trade,
  onChoose,
}: {
  worker: (typeof workers)[number];
  trade: string;
  onChoose: () => void;
}) {
  return (
    <article className="worker-card">
      <img src={worker.image} alt={worker.name} width={1024} height={768} loading="lazy" />
      <div className="worker-info">
        <div className="worker-name">
          <h2>{worker.name}</h2>
          {worker.verified && <BadgeCheck />}
        </div>
        <span>{trade === "Otro" ? "Trabajador de oficio" : trade}</span>
        {worker.verified && (
          <span className="verified-label">
            <BadgeCheck />
            Verificado
          </span>
        )}
        <div className="worker-meta">
          <b>
            <Star />
            {worker.rating}
          </b>
          <span>{worker.jobs} trabajos</span>
          {worker.invoice && <span>Hace factura</span>}
        </div>
        <div className="worker-offer">
          <span>Ofrece hacerlo por</span>
          <strong>{money(worker.price)}</strong>
        </div>
        <Button variant="action" onClick={onChoose}>
          <Check />
          Elegir
        </Button>
      </div>
    </article>
  );
}
function ApplicationSummary({
  trade,
  description,
  zone,
  image,
}: {
  trade: string;
  description: string;
  zone: string;
  image: string | undefined;
}) {
  const matchingImage = jobs.find((job) => job.trade === trade)?.image ?? jobs[1].image;
  return (
    <article className="application-summary">
      <img src={image ?? matchingImage} alt={description} width={1024} height={768} />
      <div>
        <span className="trade-pill">{trade}</span>
        <strong>{description}</strong>
        <span>
          <MapPin />
          {zone}
        </span>
      </div>
    </article>
  );
}
function JobCard({ job, onOpen }: { job: (typeof jobs)[number]; onOpen: () => void }) {
  return (
    <article className="job-card" onClick={onOpen}>
      <img src={job.image} alt={job.title} width={1024} height={768} loading="lazy" />
      <div>
        <span className="trade-pill">{job.trade}</span>
        <h2>{job.title}</h2>
        <div className="job-facts">
          <span>
            <MapPin />
            {job.zone}
          </span>
          <span>
            <Clock3 />
            {job.timing}
          </span>
        </div>
        <strong>{money(job.price)}</strong>
      </div>
      <ChevronRight className="card-arrow" />
    </article>
  );
}
function StatusCard({ status, title, price }: { status: string; title: string; price: number }) {
  return (
    <article className="status-card">
      <span className={status === "Elegido" ? "status won" : "status"}>{status}</span>
      <h2>{title}</h2>
      <p>
        Tu oferta: <strong>{money(price)}</strong>
      </p>
    </article>
  );
}
