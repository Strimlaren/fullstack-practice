import Footer from "./components/Footer";
import Header from "./components/Header";

import { useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <Header isLoggedIn={isLoggedIn} />
      <div className="p-4">
        <p className="text-3xl">APP</p>
      </div>
      <Footer />
    </div>
  );
};

export default App;
