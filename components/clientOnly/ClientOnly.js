import { useEffect, useState } from "react";

const ClientOnly = ({ children }) => {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  return showChild && children;
};

export default ClientOnly;
