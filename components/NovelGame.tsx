'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { scenes, Choice } from '@/data/scenes';

const TYPING_SPEED = 45; // ms per character
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/$/, '');

export default function NovelGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [sceneId, setSceneId] = useState('scene1');
  const [lineIdx, setLineIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  // Refs to avoid stale closures in timer callbacks
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fullTextRef = useRef('');
  const charIdxRef = useRef(0);
  const sceneIdRef = useRef(sceneId);
  const lineIdxRef = useRef(lineIdx);

  useEffect(() => { sceneIdRef.current = sceneId; }, [sceneId]);
  useEffect(() => { lineIdxRef.current = lineIdx; }, [lineIdx]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onTypingDone = useCallback(() => {
    setIsTyping(false);
    const sc = scenes[sceneIdRef.current];
    if (!sc) return;
    const isLast = lineIdxRef.current >= sc.lines.length - 1;
    if (isLast && sc.choices) {
      setShowChoices(true);
    }
  }, []);

  const startTyping = useCallback((text: string) => {
    clearTimer();
    fullTextRef.current = text;
    charIdxRef.current = 0;
    setDisplayText('');
    setShowChoices(false);

    if (!text) {
      setIsTyping(false);
      onTypingDone();
      return;
    }

    setIsTyping(true);
    const tick = () => {
      charIdxRef.current++;
      setDisplayText(text.slice(0, charIdxRef.current));
      if (charIdxRef.current < text.length) {
        timerRef.current = setTimeout(tick, TYPING_SPEED);
      } else {
        onTypingDone();
      }
    };
    timerRef.current = setTimeout(tick, TYPING_SPEED);
  }, [clearTimer, onTypingDone]);

  // Start typing when scene/line changes
  useEffect(() => {
    if (!gameStarted) return;
    const sc = scenes[sceneId];
    if (!sc) return;
    const text = sc.lines[lineIdx] ?? '';
    startTyping(text);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, sceneId, lineIdx]);

  const transitionTo = useCallback((id: string) => {
    setOpacity(0);
    setTimeout(() => {
      setShowChoices(false);
      setSceneId(id);
      setLineIdx(0);
      setOpacity(1);
    }, 350);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;

    if (!gameStarted) {
      setGameStarted(true);
      return;
    }

    if (showChoices) return;

    if (isTyping) {
      clearTimer();
      setDisplayText(fullTextRef.current);
      setIsTyping(false);
      onTypingDone();
      return;
    }

    const sc = scenes[sceneIdRef.current];
    if (!sc) return;
    const isLast = lineIdxRef.current >= sc.lines.length - 1;

    if (!isLast) {
      setLineIdx(prev => prev + 1);
    } else if (sc.autoNext) {
      transitionTo(sc.autoNext);
    }
  }, [gameStarted, showChoices, isTyping, clearTimer, onTypingDone, transitionTo]);

  const restartGame = useCallback(() => {
    clearTimer();
    setDisplayText('');
    setShowChoices(false);
    setIsTyping(false);
    setSceneId('scene1');
    setLineIdx(0);
    setOpacity(1);
    setGameStarted(false);
  }, [clearTimer]);

  const scene = scenes[sceneId];
  const isLastLine = lineIdx >= (scene?.lines.length ?? 0) - 1;
  const isEnd = !!scene?.isEnd && isLastLine && !isTyping;
  const canAdvance = !isTyping && !showChoices && !scene?.isEnd && (
    !isLastLine || !!scene?.autoNext
  );

  return (
    <div
      className="relative w-full h-[100dvh] bg-black overflow-hidden cursor-pointer select-none touch-manipulation"
      style={{ opacity, transition: 'opacity 0.35s ease' }}
      onClick={handleClick}
    >
      {!gameStarted ? (
        <TitleScreen />
      ) : (
        <>
          {/* Background Image */}
          <div className="absolute inset-0">
            {scene?.image && !imgErrors.has(scene.image) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`${basePath}/images/${scene.image}.png`}
                alt=""
                className="w-full h-full object-cover object-center"
                onError={() =>
                  setImgErrors(prev => {
                    const next = new Set(prev);
                    next.add(scene.image);
                    return next;
                  })
                }
              />
            ) : (
              <div className="w-full h-full bg-gray-950" />
            )}
            {/* Gradient: bottom darkens for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Bottom Text/Choice Box */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/92 border-t border-gray-800 min-h-[34vh] sm:min-h-[38vh]">
            {!showChoices ? (
              <div className="flex h-full min-h-[34vh] flex-col justify-between p-5 sm:min-h-[38vh] sm:p-7">
                <p
                  className="whitespace-pre-line text-xl font-light leading-relaxed tracking-wide text-white sm:text-3xl sm:leading-loose lg:text-4xl"
                  style={{
                    fontFamily: "'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', Georgia, serif",
                    minHeight: '4.8em',
                  }}
                >
                  {displayText}
                  {isTyping && (
                    <span className="text-gray-400 animate-pulse"> |</span>
                  )}
                </p>
                <div className="flex justify-between items-end mt-3 min-h-[2.5rem]">
                  {isEnd ? (
                    <button
                      className="border border-gray-700 px-5 py-2 text-xs tracking-[0.25em] text-gray-500 transition-all duration-300 hover:border-gray-400 hover:text-gray-300 sm:px-8 sm:py-2.5 sm:text-sm sm:tracking-[0.3em]"
                      style={{ fontFamily: "'Yu Mincho', serif" }}
                      onClick={(e) => { e.stopPropagation(); restartGame(); }}
                    >
                      もう一度プレイする
                    </button>
                  ) : (
                    <span />
                  )}
                  {canAdvance && (
                    <span className="text-gray-600 text-sm animate-bounce">▼</span>
                  )}
                </div>
              </div>
            ) : (
              /* Choices */
              <div className="flex min-h-[34vh] flex-col justify-center gap-3 p-5 sm:min-h-[38vh] sm:gap-4 sm:p-7">
                {scene?.choices?.map((c: Choice) => (
                  <button
                    key={c.nextScene}
                    className="w-full border border-gray-600 bg-transparent px-5 py-3 text-left text-sm tracking-[0.2em] text-white transition-all duration-200 hover:border-gray-300 hover:bg-white/8 sm:px-7 sm:py-4 sm:text-base sm:tracking-widest"
                    style={{ fontFamily: "'Yu Mincho', 'Hiragino Mincho ProN', serif" }}
                    onClick={(e) => { e.stopPropagation(); transitionTo(c.nextScene); }}
                  >
                    ▶　{c.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function TitleScreen() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-black px-6">
      <div className="space-y-6 text-center">
        <h1
          className="text-4xl font-thin leading-tight tracking-[0.25em] text-white sm:text-5xl sm:tracking-[0.35em] lg:text-6xl lg:tracking-[0.4em]"
          style={{
            fontFamily: "'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif",
            textShadow: '0 0 60px rgba(220, 50, 50, 0.5), 0 0 120px rgba(180, 0, 0, 0.2)',
          }}
        >
          愚かなあきと
        </h1>
        <p
          className="text-xs tracking-[0.35em] text-gray-600 sm:text-sm sm:tracking-[0.6em]"
          style={{ fontFamily: "'Yu Mincho', serif" }}
        >
          ある社会人の末路
        </p>
        <div className="pt-10">
          <p
            className="animate-pulse text-[11px] tracking-[0.3em] text-gray-700 sm:text-xs sm:tracking-[0.5em]"
            style={{ fontFamily: "'Yu Mincho', serif" }}
          >
            クリックしてはじめる
          </p>
        </div>
      </div>
    </div>
  );
}
