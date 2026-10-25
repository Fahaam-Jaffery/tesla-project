import { useEffect, useRef, useState } from 'react';
import { Maximize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { MODEL_Y_FILMS, type ModelYVariant } from './modelYFilms';

type ModelYMediaPlayerProps = {
  variant: ModelYVariant;
  variantName: string;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainder}`;
}

export default function ModelYMediaPlayer({ variant, variantName }: ModelYMediaPlayerProps) {
  const films = MODEL_Y_FILMS[variant];
  const [activeFilmId, setActiveFilmId] = useState(films[0].id);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeFilm = films.find((film) => film.id === activeFilmId) ?? films[0];

  useEffect(() => {
    setActiveFilmId(MODEL_Y_FILMS[variant][0].id);
    setIsPlaying(true);
    setIsMuted(true);
    setCurrentTime(0);
    setDuration(0);
  }, [variant]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    if (isPlaying) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying, isMuted, activeFilmId, variant]);

  const togglePlayback = () => setIsPlaying((playing) => !playing);
  const toggleSound = () => setIsMuted((muted) => !muted);

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void player.requestFullscreen();
    }
  };

  return (
    <section className="my-film-section" id="interior" aria-labelledby="my-film-heading">
      <div className="my-container my-film-inner">
        <div className="my-film-intro">
          <div>
            <p className="my-kicker my-dark-eyebrow">THE MODEL Y FILM COLLECTION</p>
            <h2 id="my-film-heading" className="my-heading my-film-heading">
              See it in <span>motion.</span>
            </h2>
          </div>
          <p className="my-body-copy my-dark-body my-film-description">
            One vehicle. Different perspectives. Explore the details of {variantName} through its own collection of films.
          </p>
        </div>

        <div className="my-film-player-shell">
          <div className="my-film-player" ref={playerRef}>
            <video
              key={`${variant}-${activeFilm.id}`}
              ref={videoRef}
              className="my-film-video"
              src={activeFilm.src}
              autoPlay
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              aria-label={`${variantName}: ${activeFilm.title} film`}
            />
            <div className="my-film-vignette" aria-hidden="true" />
            <div className="my-film-topline">
              <div className="my-film-brand">
                <span className="my-film-live-dot" />
                <span>{variantName.toUpperCase()}</span>
                <span className="my-film-divider">/</span>
                <span>{String(films.findIndex((film) => film.id === activeFilm.id) + 1).padStart(2, '0')} — {String(films.length).padStart(2, '0')}</span>
              </div>
              <button className="my-film-icon-button" type="button" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
                <Maximize size={17} strokeWidth={1.7} />
              </button>
            </div>

            <div className="my-film-caption">
              <p className="my-film-eyebrow">A CLOSER LOOK</p>
              <h3>{activeFilm.title}<span>.</span></h3>
              <p>{activeFilm.subtitle}</p>
            </div>

            <div className="my-film-controls">
              <button className="my-film-play-button" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause film' : 'Play film'}>
                {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
              </button>
              <span className="my-film-time">{formatTime(currentTime)}</span>
              <input
                className="my-film-seek"
                type="range"
                min={0}
                max={duration || 1}
                step="0.1"
                value={Math.min(currentTime, duration || 1)}
                aria-label="Seek through film"
                style={{ '--film-progress': `${duration ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
                onChange={(event) => {
                  const nextTime = Number(event.target.value);
                  if (videoRef.current) videoRef.current.currentTime = nextTime;
                  setCurrentTime(nextTime);
                }}
              />
              <span className="my-film-time">{formatTime(duration)}</span>
              <button className="my-film-icon-button my-film-sound-button" type="button" onClick={toggleSound} aria-label={isMuted ? 'Turn sound on' : 'Mute film'}>
                {isMuted ? <VolumeX size={18} strokeWidth={1.7} /> : <Volume2 size={18} strokeWidth={1.7} />}
                <span>{isMuted ? 'SOUND OFF' : 'SOUND ON'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="my-film-playlist-heading">
          <div>
            <p className="my-kicker my-dark-eyebrow">SELECT A FILM</p>
            <p className="my-film-playlist-title">The details make the difference.</p>
          </div>
          <span className="my-film-count">{films.length} FILMS</span>
        </div>
        <div className="my-film-playlist" role="group" aria-label={`${variantName} film playlist`}>
          {films.map((film, index) => {
            const selected = film.id === activeFilm.id;
            return (
              <button
                key={film.id}
                type="button"
                className={`my-film-item ${selected ? 'my-film-item-active' : ''}`}
                onClick={() => {
                  setActiveFilmId(film.id);
                  setCurrentTime(0);
                  setDuration(0);
                  setIsPlaying(true);
                  setIsMuted(true);
                }}
                aria-pressed={selected}
              >
                <span className="my-film-item-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="my-film-item-copy">
                  <strong>{film.title}</strong>
                  <span>{film.subtitle}</span>
                </span>
                <span className="my-film-item-action">{selected ? <Pause size={15} /> : <Play size={15} />}</span>
              </button>
            );
          })}
        </div>
        <p className="my-film-note">Films play silently by default. Turn sound on whenever you want to take in the full experience.</p>
      </div>
    </section>
  );
}
