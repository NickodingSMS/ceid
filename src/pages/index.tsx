import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SECTIONS = [
  { id: 1, title: 'Blount Centre', folder: '1', imageCount: 7 },
  { id: 2, title: 'Events', folder: '2', imageCount: 2 },
  { id: 3, title: 'Offices', folder: '3', imageCount: 6 },
  { id: 4, title: 'Mentors', folder: '4', imageCount: 2 },
  { id: 5, title: 'Calendar', folder: '5', imageCount: 3 },
  { id: 6, title: 'Conference', folder: '6', imageCount: 6 },
];

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const [currentImage, setCurrentImage] = useState('');
  const [prevImage, setPrevImage] = useState('');
  const [fadeKey, setFadeKey] = useState(0);

  // Detect visible section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveSectionIndex(index);
              setImageIndex(0);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Set initial image and prevImage to avoid blink
  useEffect(() => {
    const initialImage = `/images/${SECTIONS[0].folder}/1.jpg`;
    setCurrentImage(initialImage);
    setPrevImage(initialImage);
  }, []);

  // Cycle images in active section
  useEffect(() => {
    const imageCount = SECTIONS[activeSectionIndex].imageCount;
    const isFirstFirst = activeSectionIndex === 0 && imageIndex === 0;
    const delay = isFirstFirst ? 5000 : 6000;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % imageCount);
    }, delay);

    return () => clearInterval(interval);
  }, [activeSectionIndex, imageIndex]);

  // Update current image with fade
  useEffect(() => {
    if (!currentImage) return;
    const newImage = `/images/${SECTIONS[activeSectionIndex].folder}/${imageIndex + 1}.jpg`;
    setPrevImage(currentImage);
    setCurrentImage(newImage);
    setFadeKey((k) => k + 1);
  }, [activeSectionIndex, imageIndex]);

  const isFirstFirst = activeSectionIndex === 0 && imageIndex === 0;

  return (
    <>
      <header className="topbar">CIED</header>

      <main style={{ paddingTop: '10vh' }}>
        {/* Background Layers */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          {prevImage && (
            <div
              key={`prev-${fadeKey}`}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${prevImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 1,
                animation: `fadeOut 6.5s ease forwards`,
              }}
            />
          )}
          {currentImage && (
            <div
              key={`curr-${fadeKey}`}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${currentImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isFirstFirst ? 1 : 0,
                animation: isFirstFirst ? 'none' : `fadeIn 6.5s ease forwards`,
              }}
            />
          )}
        </div>

        {SECTIONS.map((section, i) => {
          const sectionContent = (
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '2rem',
                borderRadius: '8px',
                color: 'black',
                fontSize: '2rem',
                fontWeight: 'bold',
                cursor: section.id === 5 ? 'pointer' : 'default',
              }}
            >
              {section.title}
            </div>
          );

          return (
            <section
              key={section.id}
              ref={(el) => void (sectionRefs.current[i] = el)}
              style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {section.id === 5 ? (
                <Link href="/calendar" style={{ textDecoration: 'none' }}>
                  {sectionContent}
                </Link>
              ) : (
                sectionContent
              )}
            </section>
          );
        })}
      </main>

      {/* Inline animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </>
  );
}
