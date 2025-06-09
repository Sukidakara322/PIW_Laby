import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const STORAGE_KEY = "appleworm_favorites";

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return state.some((b) => b.id === action.book.id)
        ? state
        : [...state, action.book];

    case "REMOVE":
      return state.filter((b) => b.id !== action.id);

    default:
      return state;
  }
};

const loadInitialFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    loadInitialFavorites
  );

  const addFavorite = (book) => dispatch({ type: "ADD", book });
  const removeFavorite = (id) => dispatch({ type: "REMOVE", id });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};
