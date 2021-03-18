import React, { useEffect } from "react";

import useIntersect from "../../hooks/useIntersect";
import Container from "./Container";

const Section = ({
  root,
  setSelectedSectionIndex,
  id,
  section,
  highlightedSectionIndex,
  setHighlightedSectionIndex,
  currentSectionIndex,
}) => {
  const [ref, entry] = useIntersect({
    threshold: 0.8,
    root: root.current,
    rootMargin: "0px 50px 0px 50px",
  });

  /*  useEffect(() => {
      if (currentLocationIndex === -1) return;

      if (
        currentLocationIndex >= section.indices[0] &&
        currentLocationIndex < section.indices[1]
      ) {
        const index = currentLocationIndex - section.indices[0];
        const currentLocation = section.coordinates[index];
        const marker = { x: index, y: currentLocation[2] };

        setSelectedSectionIndex(id);

        setMarkers([marker]);
      } else {
        setMarkers([]);
      }
    }, [currentLocationIndex, section, setSelectedSectionIndex, id]);*/

  useEffect(() => {
    if (entry.intersectionRatio > 0.8) setHighlightedSectionIndex(id);
  }, [entry.intersectionRatio, setHighlightedSectionIndex, id]);

  return (
    <Container
      onClick={() => {
        setSelectedSectionIndex(id);
      }}
      ref={ref}
    >
      <div className={`detail ${currentSectionIndex === id ? "current" : ""}`}>
        {id}
      </div>
    </Container>
  );
};

export default Section;
