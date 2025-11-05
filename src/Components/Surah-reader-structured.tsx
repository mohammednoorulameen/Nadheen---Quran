



"use client";
import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  BookText,
  BookOpen,
  Copy,
  Bookmark,
  Play,
  MessageCircleMore,
  MoreHorizontal,
  LinkIcon,
  List,
  Columns3,
  Pause,
} from "lucide-react";
// import AudioPlayerBar from "@/Components/Audio-player-bar";
import { useUserSettings } from "@/Hook/useUserSettings";
import { Link } from "react-router-dom";

type Ayah = {
  number: number;
  arabic: string;
  translation?: string;
  page?: number;
  global?: number;
};

export type SurahReaderStructuredProps = {
  surahNumber: number;
  surahName?: string;
  centered?: boolean;
  verses?: Ayah[];
  translatorName?: string;
  startAtTop?: boolean; // new prop to force start at top
};

const STORAGE_KEY = "quran:continue-reading";

function saveProgress(surah: number, ayah: number) {
  try {
    const payload = { surah, ayah, ts: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    console.log("sura-reader-structure");
  }
}

function loadProgress(): { surah: number; ayah: number; ts: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function SurahReaderStructured({
  surahNumber,
  surahName = "Al-Baqarah",
  centered,
  verses,
  translatorName,
  startAtTop, // new prop
}: SurahReaderStructuredProps) {
  const data = useMemo<Ayah[]>(
    () =>
      verses && verses.length
        ? verses
        : Array.from({ length: 10 }).map((_, i) => ({
            number: i + 1,
            arabic:
              i === 1
                ? "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ"
                : "بِسْمِ ٱللَّـهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
            page: 1,
            global: i + 1,
          })),
    [verses]
  );

  const defaultCentered = centered ?? surahNumber === 2;
  const [mode, setMode] = useState<"translation" | "reading">(
    defaultCentered ? "reading" : "translation"
  );
  const [isCentered, setIsCentered] = useState<boolean>(defaultCentered);
  const [layout, setLayout] = useState<"line" | "page">("line"); // local mirror

  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const currentAyahRef = useRef<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentIndexRef = useRef<number>(0);
  const playNextRef = useRef<(() => void) | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    resumeReadingEnabled,
    ayahLayout,
    setAyahLayoutLine,
    setAyahLayoutPage,
    centeredReading,
    arabicFontScale,
    translationFontScale,
  } = useUserSettings();

  useEffect(() => {
    setLayout(ayahLayout);
  }, [ayahLayout]);

  useEffect(() => {
    currentAyahRef.current = 1;
    if (startAtTop) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [surahNumber, startAtTop]);

  useEffect(() => {
    if (startAtTop || !resumeReadingEnabled) return;
    const saved = loadProgress();
    if (!saved || saved.surah !== surahNumber) return;
    const el = ayahRefs.current[saved.ayah];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [surahNumber, startAtTop, resumeReadingEnabled]);

  useEffect(() => {
    if (mode === "reading") {
      setIsCentered(Boolean(centeredReading));
    } else {
      setIsCentered(false);
    }
  }, [mode, centeredReading]);

  const observer = new IntersectionObserver(
    (entries) => {
      const vis = entries
        .filter((e) => e.isIntersecting)
        .map((e) => {
          const id = e.target.getAttribute("data-ayah");
          const rect = e.target.getBoundingClientRect();
          const viewport = Math.max(1, window.innerHeight);
          const visible =
            Math.max(
              0,
              Math.min(rect.bottom, viewport) - Math.max(rect.top, 0)
            ) / Math.max(1, rect.height);
          return { id: Number(id), visible };
        })
        .sort((a, b) => b.visible - a.visible)[0];
      if (vis && vis.id && vis.visible > 0.3) {
        currentAyahRef.current = vis.id;
        saveProgress(surahNumber, vis.id);
      }
    },
    { rootMargin: "0px 0px -50% 0px", threshold: [0.25, 0.5, 0.75] }
  );

  useEffect(() => {
    for (const a of data) {
      const el = ayahRefs.current[a.number];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [data]);

  const scrollToAyah = useCallback((n: number) => {
    const el = ayahRefs.current[n];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const handleJumpPrev = () => {
    const prev = Math.max(1, currentAyahRef.current - 1);
    scrollToAyah(prev);
  };

  const handleJumpNext = () => {
    const next = Math.min(data.length, currentAyahRef.current + 1);
    scrollToAyah(next);
  };

  const handleSaveManual = () => {
    saveProgress(surahNumber, currentAyahRef.current);
  };

  // const audioItems = useMemo(
  //   () =>
  //     data
  //       .filter((a) => typeof a.global === "number")
  //       .map((a) => ({
  //         id: String(a.global),
  //         title: `Ayah ${a.number}`,
  //         // url: `https://cdn.islamic.network/quran/audio/64/ar.alafasy/${a.global}.mp3`,
  //         url: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.global}.mp3`,
  //         ayahLabel: `${surahNumber}:${a.number}`,
  //       })),
  //   [data, surahNumber]
  // );

//   const audioItems = useMemo(
//   () =>
//     data.map((a, index) => ({
//       id: String(a.global ?? index + 1),
//       title: `Ayah ${a.number}`,
//       url: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3`,
//       ayahLabel: `${surahNumber}:${a.number}`,
//     })),
//   [data, surahNumber]
// );

  const audioItems = useMemo(
    () =>
      data
        .filter((a) => typeof a.global === "number")
        .map((a) => ({
          id: String(a.global),
          title: `Ayah ${a.number}`,
          url: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.global}.mp3`,
          ayahLabel: `${surahNumber}:${a.number}`,
          ayahNumber: a.number,
        })),
    [data, surahNumber]
  );

  // Drive bottom AudioPlayerBar
  // const [audioPlayIndex, setAudioPlayIndex] = useState<number | null>(null);
  // const [playTrigger, setPlayTrigger] = useState(0);

  // Removed bottom AudioPlayerBar; using inline audio controls instead

  // Reset audio when surah changes
  useEffect(() => {
    setIsPlaying(false);
    // Clean up audio when surah changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    currentIndexRef.current = 0;
    playNextRef.current = null;
  }, [surahNumber]);
  
  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAllAyahs = () => {
    if (!audioItems || audioItems.length === 0) return;
    
    // If already playing, pause it
    if (isPlaying && audioRef.current) {
      pauseAudio();
      return;
    }
    
    // If paused, resume from current position
    if (audioRef.current && !isPlaying) {
      resumeAudio();
      return;
    }
    
    // Start fresh playback
    currentIndexRef.current = 0;
    
    // Clean up existing audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Create new audio instance
    const audio = new Audio(audioItems[currentIndexRef.current].url);
    audioRef.current = audio;
    
    const playNext = () => {
      currentIndexRef.current++;
      if (currentIndexRef.current < audioItems.length) {
        audio.src = audioItems[currentIndexRef.current].url;
        audio.play().catch((err) => {
          console.error("Audio play error:", err);
          setIsPlaying(false);
        });
      } else {
        // Reached the end
        setIsPlaying(false);
      }
    };
    
    playNextRef.current = playNext;
    audio.addEventListener("ended", playNext);
    
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Audio play error:", err);
        setIsPlaying(false);
      });
  };

  const pauseAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resumeAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio play error:", err);
          setIsPlaying(false);
        });
    }
  };

  const playSpecificAyah = (ayahNumber: number) => {
    if (!audioItems || audioItems.length === 0) return;
    const ayah = data.find((a) => a.number === ayahNumber && typeof a.global === "number");
    if (ayah && ayah.global) {
      const index = audioItems.findIndex((item) => item.id === String(ayah.global));
      if (index >= 0) {
        // If same ayah is playing, toggle pause/resume
        if (audioRef.current && currentIndexRef.current === index) {
          if (isPlaying) {
            pauseAudio();
          } else {
            resumeAudio();
          }
          return;
        }
        
        // Set the starting index
        currentIndexRef.current = index;
        
        // Clean up existing audio if any
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        
        // Create new audio instance starting from this ayah
        const audio = new Audio(audioItems[currentIndexRef.current].url);
        audioRef.current = audio;
        
        const playNext = () => {
          currentIndexRef.current++;
          if (currentIndexRef.current < audioItems.length) {
            audio.src = audioItems[currentIndexRef.current].url;
            audio.play().catch((err) => {
              console.error("Audio play error:", err);
              setIsPlaying(false);
            });
          } else {
            // Reached the end
            setIsPlaying(false);
          }
        };
        
        playNextRef.current = playNext;
        audio.addEventListener("ended", playNext);
        
        audio.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Audio play error:", err);
            setIsPlaying(false);
          });
      }
    }
  };


  const pages = useMemo(() => {
    const groups = new Map<number, Ayah[]>();
    for (const a of data) {
      const p = a.page ?? 1;
      if (!groups.has(p)) groups.set(p, []);
      groups.get(p)!.push(a);
    }
    return Array.from(groups.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([pageNo, ayahs]) => ({ pageNo, ayahs }));
  }, [data]);

  return (
    <div className="w-full">
      {/* Top toolbar */}
      <div className="sticky top-14 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between gap-3">
          {/* Translation/Reading */}
          <div className="inline-flex rounded-full border border-border bg-muted text-foreground">
            <button
              className={cn(
                "px-4 py-2 text-sm rounded-full transition-colors inline-flex items-center gap-2",
                mode === "translation"
                  ? "bg-background"
                  : "hover:bg-background/40"
              )}
              onClick={() => {
                setMode("translation");
                setIsCentered(false);
              }}
              aria-pressed={mode === "translation"}
            >
              <BookText className="h-4 w-4" aria-hidden />
              <span>Translation</span>
            </button>
            <button
              className={cn(
                "px-4 py-2 text-sm rounded-full transition-colors inline-flex items-center gap-2",
                mode === "reading" ? "bg-background" : "hover:bg-background/40"
              )}
              onClick={() => {
                setMode("reading");
                setIsCentered(true);
              }}
              aria-pressed={mode === "reading"}
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              <span>Reading</span>
            </button>
          </div>

          <div className="inline-flex rounded-full border border-border bg-muted text-foreground">
            <button
              className={cn(
                "px-3 py-2 text-sm rounded-full transition-colors inline-flex items-center gap-2",
                layout === "line" ? "bg-background" : "hover:bg-background/40"
              )}
              onClick={() => {
                setLayout("line");
                setAyahLayoutLine();
              }}
              aria-pressed={layout === "line"}
              aria-label="Line by line"
              title="Line by line"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Line</span>
            </button>
            <button
              className={cn(
                "px-3 py-2 text-sm rounded-full transition-colors inline-flex items-center gap-2",
                layout === "page" ? "bg-background" : "hover:bg-background/40"
              )}
              onClick={() => {
                setLayout("page");
                setAyahLayoutPage();
              }}
              aria-pressed={layout === "page"}
              aria-label="Page paragraphs"
              title="Page paragraphs"
            >
              <Columns3 className="h-4 w-4" />
              <span className="hidden sm:inline">Page</span>
            </button>
          </div>
        </div>
      </div>

      {/* Title + basmala + actions */}
      <div className="mx-auto max-w-3xl px-4 pt-8 text-center">
        <h1 className="font-serif text-2xl tracking-wide text-foreground text-pretty">
          {surahName}
        </h1>
        <p className="mt-6 font-serif text-xl text-foreground/90">
          {"بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ"}
        </p>
        {mode === "translation" && translatorName ? (
          <p className="mt-4 text-sm text-foreground/70">
            Translation by {translatorName}{" "}
            <button
              type="button"
              className="underline underline-offset-4 hover:text-foreground"
            >
              (Change)
            </button>
          </p>
        ) : null}
        <div className="mt-6 flex items-center justify-center gap-6">
          <Link
            to={`/surah/${surahNumber}/info`}
            className="text-sm text-foreground/80 hover:text-foreground"
            aria-label="Surah info"
          >
            • Surah Info
          </Link>
          {/* <button
            className="text-sm text-primary hover:text-primary/80"
            type="button"
            aria-label="Play audio"
          >
            ► Play Audio
          </button> */}
          {/* <button
            className="text-sm text-primary hover:text-primary/80"
            type="button"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            onClick={playAllAyahs}
          >
            {isPlaying ? "⏸ Pause Audio" : "► Play Audio"}
          </button> */}
          <button
  className="text-white hover:text-white/80"
  type="button"
  aria-label={isPlaying ? "Pause audio" : "Play audio"}
  onClick={isPlaying ? pauseAudio : playAllAyahs}
>
{isPlaying ? (
  <>
    <Pause size={15} className="inline mr-1" /> Pause Audio
  </>
) : (
  <>
    <Play size={15} className="inline mr-1" /> Play Audio
  </>
)}

</button>

          <button
            className="text-sm text-foreground/80 hover:text-foreground"
            type="button"
            onClick={handleSaveManual}
            aria-label="Save progress"
          >
            ⌁ Save Progress
          </button>
        </div>
      </div>

      {layout === "line" ? (
        <div
          className={cn(
            "mx-auto max-w-3xl px-3 md:px-4 pb-24 md:pb-28",
            isCentered ? "text-center" : "text-left"
          )}
        >
          {data.map((a) => (
            <section
              key={a.number}
              id={`ayah-${a.number}`}
              data-ayah={a.number}
              ref={(el) => {
                ayahRefs.current[a.number] = el as HTMLDivElement | null;
              }}
              className="scroll-mt-28 py-4 md:py-6 border-b border-border/60"
            >
              <div className="flex items-start gap-3">
                {mode === "translation" && !isCentered ? (
                  <div className="hidden sm:flex sm:flex-col sm:items-center sm:gap-2 text-foreground/60">
                    <button
                      aria-label="Copy ayah"
                      className="hover:text-foreground"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Bookmark ayah"
                      className="hover:text-foreground"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Play ayah audio"
                      className="hover:text-foreground"
                      onClick={() => playSpecificAyah(a.number)}
                    >
                      <Play className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Commentary"
                      className="hover:text-foreground"
                    >
                      <MessageCircleMore className="h-4 w-4" />
                    </button>
                    <button aria-label="More" className="hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-xs text-foreground/60 mb-2 md:mb-3">
                    <div className="inline-flex items-center gap-2">
                      <span>{`${surahNumber}:${a.number}`}</span>
                      <a
                        href={`#ayah-${a.number}`}
                        className="hover:text-primary underline-offset-4 hover:underline"
                      >
                        <LinkIcon className="h-3.5 w-3.5" aria-hidden />
                        <span className="sr-only">Link to ayah {a.number}</span>
                      </a>
                    </div>
                    <div className="hidden sm:block">
                      <span>—</span>
                    </div>
                  </div>

                  <p
                    className={cn(
                      "font-serif leading-relaxed md:leading-loose text-foreground",
                      isCentered ? "mx-auto" : ""
                    )}
                    dir="rtl"
                    lang="ar"
                    style={{
                      fontSize: `calc(${arabicFontScale ?? 1} * 1.25rem)`,
                    }}
                  >
                    {a.arabic}
                    <span className="ms-2 text-foreground/60 text-base align-middle">{`﴿${a.number}﴾`}</span>
                  </p>

                  {mode === "translation" && a.translation && (
                    <p
                      className="mt-2 md:mt-3 leading-relaxed text-foreground/80"
                      style={{
                        fontSize: `calc(${
                          translationFontScale ?? 1
                        } * 0.95rem)`,
                      }}
                    >
                      {a.translation}
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-foreground/60 sm:hidden">
                    <button
                      aria-label="Copy ayah"
                      className="hover:text-foreground"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Bookmark ayah"
                      className="hover:text-foreground"
                    >
                      <Bookmark className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Play ayah audio"
                      className="hover:text-foreground"
                      onClick={() => playSpecificAyah(a.number)}
                    >
                      <Play className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Commentary"
                      className="hover:text-foreground"
                    >
                      <MessageCircleMore className="h-5 w-5" />
                    </button>
                    <button aria-label="More" className="hover:text-foreground">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 md:mt-6 flex items-center justify-center">
                <div className="h-px w-16 md:w-24 bg-border" aria-hidden />
              </div>
            </section>
          ))}
        </div>
      ) : (

        // surah ayah structure
        <div className="mx-auto max-w-3xl px-3 md:px-4 pb-24 md:pb-28">

          {pages.map(({ pageNo, ayahs }) => (
            <section
              key={pageNo}
              className="py-6 md:py-8 border-b border-border/60"
            >
              <div className="mb-2 md:mb-3 text-center text-xs text-foreground/60">
                Page {pageNo}
              </div>
              {mode === "reading" ? (
                <p
                  dir="rtl"
                  lang="ar"
                  className={cn(
                    "mx-auto w-full font-serif leading-relaxed md:leading-loose text-foreground",
                    isCentered ? "text-center" : "text-left"
                  )}
                  style={{
                    fontSize: `calc(${arabicFontScale ?? 1} * 1.25rem)`,
                  }}
                >
                  {ayahs.map((a, idx) => (
                    <span key={a.number}>
                      {a.arabic}
                      <span className="ms-2 text-foreground/60 text-base align-middle">{`﴿${a.number}﴾`}</span>
                      {idx < ayahs.length - 1 ? " " : null}
                    </span>
                  ))}
                </p>
              ) : (
                <div className="mx-auto max-w-prose text-left">
                  <p
                    className="leading-relaxed text-foreground/85 whitespace-pre-wrap"
                    style={{
                      fontSize: `calc(${translationFontScale ?? 1} * 0.95rem)`,
                    }}
                  >
                    {ayahs
                      .map((a) => a.translation)
                      .filter(Boolean)
                      .join(" ")}
                  </p>
                </div>
              )}
            </section>
          ))}

        </div>
      )}

      {/* Floating up/down */}
      <div className="fixed right-4 bottom-20 z-40 flex flex-col gap-2">
        <button
          aria-label="Previous ayah"
          className="rounded-md border border-border bg-background/80 backdrop-blur px-2 py-2 shadow hover:bg-background"
          onClick={handleJumpPrev}
        >
          <span className="block rotate-180">➤</span>
        </button>
        <button
          aria-label="Next ayah"
          className="rounded-md border border-border bg-background/80 backdrop-blur px-2 py-2 shadow hover:bg-background"
          onClick={handleJumpNext}
        >
          <span className="block">➤</span>
        </button>
      </div>

      {/* {audioItems.length > 0 && (
        <AudioPlayerBar 
          items={audioItems} 
          showTimeline={false}
          playIndex={audioPlayIndex} 
          playTrigger={playTrigger} 
          onIndexChange={(index: number) => {
            const item: any = audioItems[index]
            const ayahNo = item?.ayahNumber
            if (typeof ayahNo === "number") {
              const el = ayahRefs.current[ayahNo]
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          }}
        />
      )} */}

      {/* Bottom bar */}
      <div className="sticky bottom-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between text-sm">
          <Link
            to={`/surah/${Math.max(1, surahNumber - 1)}?start=top`}
            className="text-foreground hover:text-primary transition-colors"
          >
            ← Previous Surah
          </Link>
          <Link
            to={`/surah/${Math.min(114, surahNumber + 1)}?start=top`}
            className="text-foreground hover:text-primary transition-colors"
          >
            Next Surah →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SurahReaderStructured;


