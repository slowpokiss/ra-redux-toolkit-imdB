import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  films: filmsInterface[];
  favorites: filmsInterface[];
  status: string;
  error: null | string | unknown;
  currFilm: Partial<currFilmsInterface>;
}

interface currFilmsInterface {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

interface filmsInterface {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  id?: number;
  favorite?: boolean;
}

export const fetchAPI = createAsyncThunk(
  "filmsSlice/fetchAPI",
  async function (film, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://omdbapi.com/?s=${film}&apikey=f89af6cf`
      );
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error("No film finded");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrFilmAPI = createAsyncThunk(
  "filmsSlice/fetchCurrFilmAPI",
  async function (id, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=64405bd2&i=${id}`
      );
      if (!response.ok) {
        throw new Error("Server Error!");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error("No film finded");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); 

const filmsSlice = createSlice({
  name: "filmsSlice",
  initialState: {
    status: "done",
    error: null,
    films: [],
    favorites: [],
    currFilm: {},
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    addToFavorite(state, action) {
      const favoriteFilm = state.favorites.find(
        (el: filmsInterface) => el.imdbID === action.payload.item.imdbID
      );
      if (favoriteFilm === undefined) {
        //action.payload.item.favorite = true
        state.films[action.payload.index].favorite = true;
        state.favorites.push(action.payload.item);
      } else {
        state.favorites = state.favorites.filter(
          (el: filmsInterface) => el.imdbID !== action.payload.item.imdbID
        );
        state.films[action.payload.index].favorite = false;
      }
    },

    removeFromFavorite(state, action) {
      //state.favorites = state.favorites.filter((el: filmsInterface) => el.imdbID !== action.payload.item.imdbID)
      //state.films[action.payload.index].favorite = false;
    },

    // getFilm(state, action) {},
    setFindedFilms(
      state,
      action: PayloadAction<{ findedFilms: filmsInterface }>
    ) {
      state.films = action.map((film: filmsInterface, ind: number) => ({
        ...film,
        id: ind,
        favorite: false,
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAPI.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAPI.fulfilled, (state, action) => {
      state.status = "done";
      const findedFilms = action.payload.Search;
      filmsSlice.caseReducers.setFindedFilms(state, findedFilms);
    });
    builder.addCase(fetchAPI.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    });

    builder.addCase(fetchCurrFilmAPI.fulfilled, (state, action) => {
      ///const findedFilms = action.payload.Search;
      //const currFilm = action.payload
      console.log(action.payload);
      //filmsSlice.caseReducers.setFindedFilms(state, findedFilms);
    });

  },
});

export const { setFindedFilms, addToFavorite, removeFromFavorite } =
  filmsSlice.actions;
export default filmsSlice.reducer;
