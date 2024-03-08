import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../redux/filmsSlice";


export default function Form() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.films);

  const onSubmit = async(ev: FormEvent) => {
    ev.preventDefault();

    if (ev.target.film.value.trim().length) {
      let film = ev.target.film.value.trim();
      try {
        await dispatch(fetchAPI(film)).unwrap();
      } catch (error) {
        console.log(error);
      }
      //ev.target.film.value = '';
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="film" type="text" />
      <input type="submit" value={"Поиск"} />
    </form>
  );
}
