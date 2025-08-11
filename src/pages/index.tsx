import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 1, title: 'Welcome', folder: '1', imageCount: 3 },
  { id: 2, title: 'Events', folder: '2', imageCount: 2 },
  { id: 3, title: 'Offices', folder: '3', imageCount: 2 },
  { id: 4, title: 'Mentors', folder: '4', imageCount: 2 },
   { id: 5, title: 'Calendar', folder: '5', imageCount: 3 },
  { id: 6, title: 'Conference', folder: '6', imageCount: 3 },
];

export default function Home() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const [currentImage, setCurrentImage] = useState('');
  const [prevImage, setPrevImage] = useState('');
  const [fadeKey, setFadeKey] = useState(0); // triggers fade animation

  // Detect visible section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target);
            if (index !== -1) {
              setActiveSectionIndex(index);
              setImageIndex(0); // Reset image when section changes
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

  // Cycle images in active section
  useEffect(() => {
    const imageCount = SECTIONS[activeSectionIndex].imageCount;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % imageCount);
    }, 10000);
    return () => clearInterval(interval);
  }, [activeSectionIndex]);

  // Update current image with fade
  useEffect(() => {
    const newImage = `/images/${SECTIONS[activeSectionIndex].folder}/${imageIndex + 1}.jpg`;
    setPrevImage(currentImage); // Store old image
    setCurrentImage(newImage);  // Store new image
    setFadeKey((k) => k + 1);   // Trigger animation
  }, [activeSectionIndex, imageIndex]);

  return (
    <>
      <header className="topbar">CIED</header>

      <main style={{ paddingTop: '10vh' }}>
        {/* Background Layers */}
        <div className="background-container">
          {prevImage && (
            <div
              key={`prev-${fadeKey}`}
              className="bg-layer fade-out"
              style={{ backgroundImage: `url(${prevImage})` }}
            />
          )}
          {currentImage && (
            <div
              key={`curr-${fadeKey}`}
              className="bg-layer fade-in"
              style={{ backgroundImage: `url(${currentImage})` }}
            />
          )}
        </div>

        {SECTIONS.map((section, i) => (
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
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '2rem',
                borderRadius: '8px',
                color: 'black',
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {section.title}
            </div>
          </section>
        ))}
      </main>

      <style jsx>{`
        .background-container {
          position: fixed;
          inset: 0;
          z-index: 0;
          
          overflow: hidden;
        }
        .bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
        }
        .fade-in {
          animation: fadeIn 2s ease forwards;
        }
        .fade-out {
          animation: fadeOut 2s ease forwards;
        }
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
