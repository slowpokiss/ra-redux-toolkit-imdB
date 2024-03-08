import Navigation from "./Navigation";
import { useSelector, useDispatch,} from "react-redux";
import { addToFavorite, removeFromFavorite } from "../redux/filmsSlice";
import { useEffect } from "react";

interface filmsInterface {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  id?: number;
  favorite?: boolean;
}

export default function Favorite() {
  const dispatch = useDispatch();
  //let favorites = useSelector((state: unknown) => state.films.favorites);
  const  films = useSelector((state: unknown) => state.films.films);
  const favorites = films.filter((el: filmsInterface) => el.favorite === true);
  
  
  return (
    <>
      <Navigation />
      {favorites.map((el: filmsInterface, ind: number) => {
        if (el.favorite) {
          return (
            <div className="film" key={ind}>
              <img src={el.Poster} className="film-image" />
              <div className="film-id">{el.Type}</div>
              <div className="film-text">{el.Title}</div>
              <div className="actions">
                <div
                  className={
                    el.favorite
                      ? "actions-favorite actions-favorite-active"
                      : "actions-favorite"
                  }
                  onClick={() => {
                    dispatch(addToFavorite({ item: el, index: ind }));
                  }}
                >
                  &#10084;
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
