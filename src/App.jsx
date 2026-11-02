import { useState } from "react";
import Carousel from "./components/Carousel/Carousel.jsx";
import RecipesCarousel from "./components/RecipesCarousel/RecipesCarousel.jsx";
import "./App.css";

const demoImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
];

function App() {
  const [showRecipes, setShowRecipes] = useState(false);

  return (
    <main className="app">
      <header className="app-header">
        <span className="eyebrow">תרגיל 5 · React</span>
        <h1>קרוסלת תמונות ומתכונים</h1>
        <p>
          תרגול של <code>useEffect</code>, טיימרים וקריאות שרת עם אפשרות לבטל
          בקשה.
        </p>
      </header>

      <section className="demo-section" aria-labelledby="gallery-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">01 · קרוסלה מקומית</span>
            <h2 id="gallery-title">רגעים של טבע</h2>
          </div>
          <span className="section-note">החלפה אוטומטית כל 3 שניות</span>
        </div>
        <Carousel images={demoImages} />
      </section>

      <section className="demo-section recipes-section" aria-labelledby="recipes-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">02 · קריאה מהשרת</span>
            <h2 id="recipes-title">מתכונים מהעולם</h2>
          </div>
          <span className="section-note">DummyJSON · 6 מתכונים</span>
        </div>
        <p className="section-description">
          אפשר להסתיר את הקרוסלה בזמן הטעינה כדי לבטל את בקשת הרשת.
        </p>
        <button
          className="toggle-button"
          type="button"
          aria-expanded={showRecipes}
          aria-controls="recipes-carousel"
          onClick={() => setShowRecipes((visible) => !visible)}
        >
          {showRecipes ? "הסתרת המתכונים" : "הצגת המתכונים"}
          <span aria-hidden="true">{showRecipes ? "−" : "+"}</span>
        </button>
        {showRecipes && (
          <div id="recipes-carousel" className="recipes-carousel">
            <RecipesCarousel />
          </div>
        )}
      </section>

      <footer className="app-footer">נבנה לתרגול React ו־useEffect</footer>
    </main>
  );
}

export default App;
