import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards/auth.guard";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  authGuard(to, from, next);
});

export default router;
