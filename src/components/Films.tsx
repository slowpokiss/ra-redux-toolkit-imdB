import { useDispatch, useSelector } from "react-redux";
import "./Films.css";
import { addToFavorite } from "../redux/filmsSlice";

interface filmsInterface {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  id?: number;
  favorite?: boolean;
}

export default function Films() {
  const dispatch = useDispatch();
  const films = useSelector((state: unknown) => state.films.films);
  const status = useSelector((state: unknown) => state.films.status);
  const error = useSelector((state: unknown) => state.films.error)

  return (
    <>
      {status === "loading" && <h2>Loading...</h2>}
      {status === "rejected" && <h2>{error}</h2>}
      {status === "done" && (
        <div className="films">
          {films.map((el: filmsInterface, ind: number) => {
            return (
              <div className="film" key={ind}>
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
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
