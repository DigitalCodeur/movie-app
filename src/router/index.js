import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Genre from "../views/Genre.vue";
import Detail from "../views/Detail.vue";
import Search from "../views/Search.vue";
import Upcoming from "../views/Upcoming.vue";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Upcoming",
    path: "/upcoming",
    component: Upcoming,
  },
  {
    name: "Genre",
    path: "/genre/:genre",
    component: Genre,
    props: true,
  },
  {
    name: "Detail",
    path: "/detail/:media/:id",
    component: Detail,
    props: true,
  },
  {
    name: "Search",
    path: "/search/:search",
    component: Search,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
