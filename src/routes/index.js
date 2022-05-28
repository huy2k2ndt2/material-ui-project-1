import { v4 as uuidv4 } from "uuid";
import Movies from "../pages/Movies";
import Series from "../pages/Series";
import Trending from "../pages/Trending";
import Search from "../pages/Search";
import routesConfig from "../config/routes";

export const publicRoutes = [
  {
    key: uuidv4(),
    path: routesConfig.trending,
    component: Trending,
  },
  {
    key: uuidv4(),
    path: routesConfig.movies,
    component: Movies,
  },
  {
    key: uuidv4(),
    path: routesConfig.series,
    component: Series,
  },
  {
    key: uuidv4(),
    path: routesConfig.search,
    component: Search,
  },
];
