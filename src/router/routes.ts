// @ts-nocheck
export const routes = [
  {
    path: "/",
    component: () => import("../components/ui/layouts/PublicLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../views/home/Home.vue")
      },
      {
        path: "login",
        name: "login",
        component: () => import("../views/home/HomeLogin.vue")
      }
    ]
  },
  {
    path: "/lk",
    component: () => import("../components/ui/layouts/PrivateLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: { name: "lkBase" }
      },
      {
        path: "events",
        redirect: { name: "lkBase" }
      },
      {
        path: "base",
        name: "lkBase",
        component: () => import("../views/events/LkBase.vue")
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/events/UserProfile.vue")
      },
      {
        path: "events/create",
        name: "eventCreate",
        component: () => import("../views/events/EventCreate.vue")
      },
      {
        path: "events/list",
        name: "eventList",
        component: () => import("../views/events/EventList.vue")
      },
      {
        path: "events/:eventId",
        name: "EventCard",
        component: () => import("../views/events/EventCard.vue"),
        children: [
          {
            path: "main",
            name: "EventCardMain",
            component: () => import("../views/events/EventCardMain.vue")
          },
          {
            path: "gift/:userId?",
            name: "EventCardGift",
            component: () => import("../views/events/EventCardGift.vue")
          },
          {
            path: "wish",
            name: "EventCardWish",
            component: () => import("../views/events/EventCardWish.vue")
          },
          {
            path: "admin",
            name: "EventCardAdmin",
            component: () => import("../views/events/EventCardAdmin.vue")
          },
          {
            path: "game",
            name: "game",
            component: () => import("../views/game/Game.vue")
          }
        ]
      }
    ]
  }
];
