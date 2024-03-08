import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateInterface {
  films: filmsInterface[];
  favorites: filmsInterface[];
  status: string;
  error: null | string | unknown;
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

const filmsSlice = createSlice({
  name: "filmsSlice",
  initialState: {
    status: "done",
    error: null,
    films: [],
    favorites: [],
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    addToFavorite(state, action) {
      state.films[action.payload.index].favorite = !state.films[action.payload.index].favorite
      //!state.films[action.payload.index].favorite;

      if (state.favorites.find((el: filmsInterface) => el.imdbID === action.payload.item.imdbID) !== undefined) {
        state.favorites.push(action.payload.item);
      }
    },

    removeFromFavorite(state, action) {
      
      
      
      //console.log(state.favorites.find((el: filmsInterface) => el.imdbID === action.payload.item.imdbID) !== undefined);
      //state.favorites.push(action.payload.item);
      // console.log(action.payload.item);
      
    
      
      //action.payload.item.favorite = !action.payload.item.favorite
      //state.favorites[action.payload.item].favorite = !state.favorites[action.payload.item].favorite;
      //console.log(action.payload.item);
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
  },
});

export const { setFindedFilms, addToFavorite, removeFromFavorite } =
  filmsSlice.actions;
export default filmsSlice.reducer;
