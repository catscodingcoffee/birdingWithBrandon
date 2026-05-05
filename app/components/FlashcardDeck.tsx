"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Hotspot {
  locId: string;
  locName: string;
  lat: number;
  lng: number;
  numSpeciesAllTime: number;
  subnational2Name?: string;
}

interface Bird {
  speciesCode: string;
  comName: string;
  sciName: string;
  imageUrl: string | null;
  description: string | null;
  wikiUrl: string | null;
}

type Step = "location" | "hotspots" | "studying";

function BirdPlaceholder() {
  return (
    <div className="flex-1 flex items-center justify-center bg-sky-50 dark:bg-sky-950/40">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-24 h-24 text-sky-200 dark:text-sky-800" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c0 0-4 2-4 7 0 2 1 3.5 2 4.5L5 21h14l-5-6.5c1-1 2-2.5 2-4.5 0-5-4-7-4-7z" />
        <path d="M8 10c-2-1-4 0-4 0s1 3 4 4" />
        <path d="M16 10c2-1 4 0 4 0s-1 3-4 4" />
      </svg>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex justify-center py-12">
      <svg className="w-8 h-8 animate-spin text-sky-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
    </div>
  );
}

export default function FlashcardDeck() {
  const [step, setStep] = useState<Step>("location");
  const [locationInput, setLocationInput] = useState("");
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [birds, setBirds] = useState<Bird[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results,setResults] = useState<Record<string, "got_it" | "not_yet">>({});


  async function fetchHotspots(lat: number, lng: number) {
    const res = await fetch(`/api/hotspots?lat=${lat}&lng=${lng}`);
    if (!res.ok) throw new Error("Failed to fetch hotspots");
    const data: Hotspot[] = await res.json();
    if (data.length === 0) throw new Error("No hotspots found within 25 miles");
    setHotspots(data);
    setStep("hotspots");
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!locationInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(`/api/geocode?q=${encodeURIComponent(locationInput)}`);
      if (!geoRes.ok) throw new Error("Location not found");
      const { lat, lng } = await geoRes.json();
      await fetchHotspots(lat, lng);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleUseLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lng } }) => {
        try {
          await fetchHotspots(lat, lng);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Unable to access your location");
        setLoading(false);
      }
    );
  }

  async function handleSelectHotspot(hotspot: Hotspot) {
    setSelectedHotspot(hotspot);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/birds?locId=${hotspot.locId}`);
      if (!res.ok) throw new Error("Failed to fetch birds");
      const data: Bird[] = await res.json();
      if (data.length === 0) throw new Error("No recent observations at this hotspot");
      setBirds(data);
      setCurrentIndex(0);
      setIsFlipped(false);
      setStep("studying");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function recordResult(speciesCode: string, result: "got_it" | "not_yet") {
    setResults((r) => ({ ...r, [speciesCode]: result }));
    next();
    console.log(speciesCode, result); 
  }

  function next() {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((i) => Math.min(i + 1, birds.length - 1)), 150);
  }

  function prev() {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((i) => Math.max(i - 1, 0)), 150);
  }

  useEffect(() => {
    if (step !== "studying") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " || e.key === "Enter") setIsFlipped((f) => !f);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, currentIndex, birds.length]);

  function reset() {
    setStep("location");
    setLocationInput("");
    setHotspots([]);
    setSelectedHotspot(null);
    setBirds([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setError(null);
  }

  const bird = birds[currentIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Step: location */}
      {step === "location" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Find a Hotspot</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter a city, zip code, or address to find nearby eBird hotspots.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="e.g. Portland, OR"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-600 placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={loading || !locationInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
          </div>

          <button
            onClick={handleUseLocation}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            </svg>
            Use my location
          </button>

          {loading && <Spinner />}
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}
        </div>
      )}

      {/* Step: hotspot picker */}
      {step === "hotspots" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Choose a Hotspot</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {hotspots.length} hotspots within 25 miles
              </p>
            </div>
            <button
              onClick={reset}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              &larr; Back
            </button>
          </div>

          {loading && <Spinner />}
          {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {hotspots.map((h) => (
              <button
                key={h.locId}
                onClick={() => handleSelectHotspot(h)}
                disabled={loading}
                className="w-full text-left flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-sky-300 dark:hover:border-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                    {h.locName}
                  </p>
                  {h.subnational2Name && (
                    <p className="text-xs text-gray-400 mt-0.5">{h.subnational2Name}</p>
                  )}
                </div>
                <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500 font-medium">
                  {h.numSpeciesAllTime > 0 ? `${h.numSpeciesAllTime} spp` : ""}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step: flashcard deck */}
      {step === "studying" && bird && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold leading-tight">{selectedHotspot?.locName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {currentIndex + 1} of {birds.length} species
              </p>
            </div>
            <button
              onClick={() => setStep("hotspots")}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors shrink-0"
            >
              &larr; Hotspots
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / birds.length) * 100}%` }}
            />
          </div>

          {/* Flip card */}
          <div style={{ perspective: "1200px" }} className="w-full">
            <div
              className="relative w-full cursor-pointer select-none"
              style={{
                height: "380px",
                transformStyle: "preserve-3d",
                transition: "transform 0.55s cubic-bezier(0.4,0.2,0.2,1)",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
              onClick={() => setIsFlipped((f) => !f)}
              role="button"
              tabIndex={0}
              aria-label={isFlipped ? "Show front of card" : "Reveal bird information"}
              onKeyDown={(e) => e.key === "Enter" && setIsFlipped((f) => !f)}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col"
                style={{ backfaceVisibility: "hidden" }}
              >
                {bird.imageUrl ? (
                  <div className="relative flex-1 bg-black">
                    <Image
                      src={bird.imageUrl}
                      alt="Bird"
                      fill
                      className="object-contain"
                      sizes="(max-width: 672px) 100vw, 672px"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs text-white/70">Tap to reveal</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <BirdPlaceholder />
                    <div className="p-5 bg-white dark:bg-gray-900">
                      <p className="text-xs text-gray-400">Tap to reveal</p>
                    </div>
                  </>
                )}
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold">{bird.comName}</h3>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-0.5">
                      {bird.sciName}
                    </p>
                  </div>
                  {bird.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed overflow-y-auto max-h-32">
                      {bird.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button className = "px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
                  onClick={(e)=>{
                    e.stopPropagation(); 
                    recordResult(bird.speciesCode,"got_it")}}>
                    Not yet!
                  </button>
                  <button className = "px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                  onClick={(e)=>{
                  e.stopPropagation(); 
                  recordResult(bird.speciesCode,"not_yet")}}>
                    Got it!
                  </button>
                </div>
                <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {bird.wikiUrl && (
                    <a
                      href={bird.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Wikipedia
                    </a>
                  )}
                  <a
                    href={`https://ebird.org/species/${bird.speciesCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    eBird
                  </a>
                  <a
                    href={`https://merlin.allaboutbirds.org/photo-ID-learn-birds/?species=${encodeURIComponent(bird.comName)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Merlin
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Prev
            </button>

            <button
              onClick={() => { setCurrentIndex(0); setIsFlipped(false); }}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Restart
            </button>

            <button
              onClick={next}
              disabled={currentIndex === birds.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            Tap the card to flip &middot; Keyboard: Enter to flip, &larr; &rarr; to navigate
          </p>
        </div>
      )}
    </div>
  );
}
