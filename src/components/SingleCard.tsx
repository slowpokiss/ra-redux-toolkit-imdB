import Navigation from "./Navigation"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrFilmAPI } from "../redux/filmsSlice";





export default function SingleCard() {
  const {id} = useParams();

  const dispatch = useDispatch();
  async function getCurrFilm(id: string | undefined) {
    try {
      await dispatch(fetchCurrFilmAPI(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  const films = useSelector((state) => state.films.currFilm);
  
  

  return (
    <>
      <Navigation />
    </>
  )
}