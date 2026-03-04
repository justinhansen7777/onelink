'use client';

import { useEffect, useRef } from 'react';

const ORGANISATIONS = [
  'Bluehive',
  'Trust.com',
  'Cameranu.nl',
  'De Wild',
  'Studioqast',
  'Avia',
  'RSC Anderlecht',
  'uminds.nl',
  'sportheroes.nl',
  'One Productivity Group',
  'kultlab.nl',
  'luxortheater.nl',
  'Workflow Alchemy',
  'Borgesius',
  'API Consultores',
  'Projects Amsterdam',
  'Installatie Manager',
  'Almeerse Scholen Groep',
  'Dopharma',
  'Fluidz Engineering',
  'Orange Capital Partners',
  'Somos Grupo',
  'Split Vision',
  'Bernardvs',
];

export function CompanyCarousel() {
  const topTrackRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);
  const topListRef = useRef<HTMLDivElement>(null);
  const bottomListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const topTrack = topTrackRef.current;
    const bottomTrack = bottomTrackRef.current;
    const topList = topListRef.current;
    const bottomList = bottomListRef.current;

    if (!topTrack || !bottomTrack || !topList || !bottomList) {
      return;
    }

    let topListWidth = topList.scrollWidth;
    let bottomListWidth = bottomList.scrollWidth;
    let topOffset = 0;
    let bottomPosition = 0;
    let rafId: number | null = null;
    const speedFactor = 0.7;

    const normalizeOffset = (offset: number, width: number) => {
      if (width <= 0) {
        return offset;
      }

      let normalizedOffset = offset;

      while (normalizedOffset <= -width) {
        normalizedOffset += width;
      }

      while (normalizedOffset > 0) {
        normalizedOffset -= width;
      }

      return normalizedOffset;
    };

    const render = () => {
      topOffset = normalizeOffset(topOffset, topListWidth);
      if (bottomListWidth > 0) {
        while (bottomPosition >= bottomListWidth) {
          bottomPosition -= bottomListWidth;
        }

        while (bottomPosition < 0) {
          bottomPosition += bottomListWidth;
        }
      }

      topTrack.style.transform = `translate3d(${topOffset}px, 0, 0)`;
      bottomTrack.style.transform = `translate3d(${bottomPosition - bottomListWidth}px, 0, 0)`;
      rafId = null;
    };

    const scheduleRender = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(render);
    };

    const syncWithScrollPosition = (scrollY: number) => {
      if (topListWidth > 0) {
        topOffset = normalizeOffset(-(scrollY * speedFactor), topListWidth);
      }

      if (bottomListWidth > 0) {
        bottomPosition = (scrollY * speedFactor) % bottomListWidth;
      }

      scheduleRender();
    };

    const updateListWidth = () => {
      topListWidth = topList.scrollWidth;
      bottomListWidth = bottomList.scrollWidth;
      syncWithScrollPosition(window.scrollY);
    };

    const handleScroll = () => {
      syncWithScrollPosition(window.scrollY);
    };

    const listResizeObserver = new ResizeObserver(updateListWidth);
    listResizeObserver.observe(topList);
    listResizeObserver.observe(bottomList);

    const fontSet = document.fonts;
    const handleFontLoad = () => updateListWidth();

    fontSet?.addEventListener('loadingdone', handleFontLoad);
    fontSet?.ready.then(updateListWidth).catch(() => {
      // Ignore font loading failures and keep the current widths.
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateListWidth);
    syncWithScrollPosition(window.scrollY);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateListWidth);
      fontSet?.removeEventListener('loadingdone', handleFontLoad);
      listResizeObserver.disconnect();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const midpoint = Math.ceil(ORGANISATIONS.length / 2);
  const topOrganisations = ORGANISATIONS.slice(0, midpoint);
  const bottomOrganisations = ORGANISATIONS.slice(midpoint);

  return (
    <>
      <div className="company-carousel">
        <div ref={topTrackRef} className="company-carousel__track" aria-hidden="true">
          <div ref={topListRef} className="company-carousel__list">
            {topOrganisations.map((name) => (
              <span key={name} className="company-carousel__item">
                {name}
              </span>
            ))}
          </div>
          <div className="company-carousel__list" aria-hidden="true">
            {topOrganisations.map((name) => (
              <span key={`dup-top-${name}`} className="company-carousel__item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="company-carousel company-carousel--bottom">
        <div ref={bottomTrackRef} className="company-carousel__track" aria-hidden="true">
          <div className="company-carousel__list" aria-hidden="true">
            {bottomOrganisations.map((name) => (
              <span key={`dup-bottom-${name}`} className="company-carousel__item">
                {name}
              </span>
            ))}
          </div>
          <div ref={bottomListRef} className="company-carousel__list">
            {bottomOrganisations.map((name) => (
              <span key={name} className="company-carousel__item">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
