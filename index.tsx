import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import heroImg from "@/assets/hero-hantaran.jpg";
import { Button } from "@/components/ui/button";
import { PAGES } from "@/lib/pages";
import { isStepComplete, markVisited, useProgress } from "@/lib/progress";
import { play } from "@/lib/sound";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JOM HANTAR TEPAT! | Laman Utama" },
      {
        name: "description",
        content: "Selamat datang! Belajar menghantar bola tepat ke sasaran — Pendidikan Jasmani Tahun 5.",
      },
      { property: "og:title", content: "JOM HANTAR TEPAT! | Laman Utama" },
      {
        property: "og:description",
        content: "Belajar, main dan uji kemahiran menghantar bola ke sasaran. Pendidikan Jasmani Tahun 5.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const progress = useProgress();
  useEffect(() => markVisited("/"), []);

  return (
    <main>
      <section className="bg-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:py-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="animate-pop">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-bold text-primary shadow-card">
              ⚽ Permainan Kategori Serangan
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] text-primary-deep sm:text-7xl">
              JOM HANTAR
              <span className="block text-primary">TEPAT!</span>
            </h1>
            <p className="mt-3 inline-block rounded-xl bg-sunny px-3 py-1 font-display text-xl font-bold text-sunny-foreground sm:text-2xl">
              Pendidikan Jasmani Tahun 5
            </p>
            <p className="mt-5 max-w-lg text-lg text-foreground">
              Selamat datang, juara! 👋 Hari ini kita akan belajar <strong>menghantar bola ke sasaran</strong> dengan
              betul. Tonton, main, jawab kuiz dan kumpul mata!
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button asChild variant="sunny" size="xl" onClick={() => play("click")}>
                <Link to="/pengenalan">
                  MULA BELAJAR <ArrowRight />
                </Link>
              </Button>
              <span className="text-sm font-semibold text-muted-foreground">7 langkah · ± 40 minit</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 right-6 z-10 rotate-6 rounded-2xl bg-primary px-4 py-2 font-display text-lg font-extrabold text-primary-foreground shadow-chunky">
              Tepat Itu Hebat!
            </div>
            <img
              src={heroImg}
              alt="Murid sekolah rendah menghantar bola ke arah papan sasaran di padang sekolah"
              width={1536}
              height={1024}
              className="relative w-full rounded-3xl border-4 border-card shadow-card"
            />
            <span
              className="absolute -bottom-5 left-4 grid size-16 place-items-center rounded-full bg-card text-4xl shadow-card animate-ball"
              aria-hidden
            >
              🏐
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl font-bold text-primary-deep">Laluan pembelajaran kamu</h2>
        <p className="mt-1 text-muted-foreground">Ikut langkah satu demi satu. Tanda ✓ muncul apabila kamu selesai.</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAGES.slice(1).map((p) => {
            const done = isStepComplete(progress, p.path);
            return (
              <li key={p.path}>
                <Link
                  to={p.path}
                  className="card-fun group flex h-full items-center gap-4 p-4 transition-transform hover:-translate-y-1"
                >
                  <span
                    className={cn(
                      "grid size-14 shrink-0 place-items-center rounded-2xl text-3xl",
                      done ? "bg-mint" : "bg-secondary",
                    )}
                    aria-hidden
                  >
                    {p.emoji}
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-muted-foreground">Langkah {p.no}</span>
                    <span className="block font-display text-lg font-bold leading-tight text-primary-deep">{p.title}</span>
                    {done && <span className="text-sm font-bold text-success">✓ Selesai</span>}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="flex items-center justify-center rounded-3xl border-2 border-dashed border-sky-strong p-4 text-center font-display text-lg font-bold text-primary">
            Jom Bergerak Bersama! 🏃
          </li>
        </ol>
      </section>
    </main>
  );
}
