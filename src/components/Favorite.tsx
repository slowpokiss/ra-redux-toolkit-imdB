import Navigation from "./Navigation";
import { useSelector, useDispatch,} from "react-redux";
import { addToFavorite, removeFromFavorite } from "../redux/filmsSlice";
import { Link } from "react-router-dom";

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
  const favorites = useSelector((state: unknown) => state.films.favorites);
  //redirect(`/card/${el.imdbID}`)
  return (
    <>
      <Navigation />
      <div className="films">
      {favorites.map((el: filmsInterface, ind: number) => {
          return (
            <Link to={`/card/${el.imdbID}`} className="film" key={ind}>
              <img src={el.Poster} className="film-image" />
              <div className="film-data">
                <div className="film-text">Название: {el.Title}</div>
                <div className="film-year">Год: {el.Year}</div>
                <div className="film-type">Тип: {el.Type}</div>
                <div className="actions">
                  <div
                    className={
                      el.favorite
                        ? "actions-favorite actions-favorite-active"
                        : "actions-favorite"
                    }
                    onClick={() => {
                      dispatch(addToFavorite({ index: ind, item: el }));
                    }}
                  >
                    &#10084;
                  </div>
                </div>
              </div>
            </Link>
          );
      })}
      </div>
    </>
  );
}
