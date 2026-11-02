import { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel.jsx";

const RECIPES_URL = "https://dummyjson.com/recipes?limit=6&select=name,image";

function RecipesCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRecipes() {
      try {
        const response = await fetch(RECIPES_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`שגיאה בטעינת המתכונים (${response.status})`);
        }

        const data = await response.json();
        setImages(data.recipes.map((recipe) => recipe.image));
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        setError(err.message);
        setLoading(false);
      }
    }

    loadRecipes();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="carousel-message">טוען מתכונים...</div>;
  }

  if (error) {
    return <div className="carousel-message error">{error}</div>;
  }

  return <Carousel images={images} intervalSeconds={4} />;
}

export default RecipesCarousel;
