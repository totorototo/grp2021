import { Chrome } from "../../index";
import LeftSide from "../leftSide/LeftSide";
import RightSide from "../rightSide/RightSide";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Main from "../main/Main";

const MENU_ITEMS = {
  "ultra 220": {
    label: "ultra 220",
    href: "/races/grp_2021_220",
  },
  "ultra 160": {
    label: "ultra 160",
    href: "/races/grp_2021_160",
  },
  "tour des cirques": {
    label: "tour des cirques",
    href: "/races/grp_2021_120",
  },
  "tour des lacs": {
    label: "tour des lacs",
    href: "/races/grp_2021_80",
  },
  "tour du Moudang": {
    label: "tour du Moudang",
    href: "/races/grp_2021_60",
  },
  "tour de la gela": {
    label: "tour de la gela",
    href: "/races/grp_2021_40",
  },
  "tour du neouvielle": {
    label: "tour du neouvielle",
    href: "/races/grp_2021_20",
  },
};

// const MENU_ITEMS = {
//   "ultra 220": {
//     label: "220",
//     href: "/races/grp_2021_220",
//     subItems: {
//       profile: {
//         href: "/races/grp_2021_220/profile",
//       },
//       map: {
//         href: "/races/grp_2021_220/map",
//       },
//       analytics: {
//         href: "/races/grp_2021_220/analytics",
//       },
//     },
//   },
//   "ultra 160": {
//     label: "160",
//     href: "/races/grp_2021_220",
//     subItems: {
//       profile: {
//         href: "/races/grp_2021_220/profile",
//       },
//       map: {
//         href: "/races/grp_2021_220/map",
//       },
//       analytics: {
//         href: "/races/grp_2021_220/analytics",
//       },
//     },
//   },
//   "tour des cirques": {
//     label: "tour des cirques",
//     href: "/races/grp_2021_220",
//     subItems: {
//       profile: {
//         href: "/races/grp_2021_220/profile",
//       },
//       map: {
//         href: "/races/grp_2021_220/map",
//       },
//       analytics: {
//         href: "/races/grp_2021_220/analytics",
//       },
//     },
//   },
//   "tour des lacs": {
//     label: "tour des lacs",
//     href: "/races/grp_2021_220",
//     subItems: {
//       profile: {
//         href: "/races/grp_2021_220/profile",
//       },
//       map: {
//         href: "/races/grp_2021_220/map",
//       },
//       analytics: {
//         href: "/races/grp_2021_220/analytics",
//       },
//     },
//   },
//   "tour du Moudang": {
//     label: "tour du Moudang",
//     href: "/races/grp_2021_220",
//     subItems: {
//       profile: {
//         href: "/races/grp_2021_220/profile",
//       },
//       map: {
//         href: "/races/grp_2021_220/map",
//       },
//       analytics: {
//         href: "/races/grp_2021_220/analytics",
//       },
//     },
//   },
//   "tour de la Géla": {
//     label: "tour de la Géla",
//     href: "/races/grp_2021_220",
//     subItems: {
//       profile: {
//         href: "/races/grp_2021_220/profile",
//       },
//       map: {
//         href: "/races/grp_2021_220/map",
//       },
//       analytics: {
//         href: "/races/grp_2021_220/analytics",
//       },
//     },
//   },
//   "tour du néouvielle": {
//     label: "tour du néouvielle",
//     href: "/races/grp_2021_220",
//     subItems: {
//       profile: {
//         href: "/races/grp_2021_220/profile",
//       },
//       map: {
//         href: "/races/grp_2021_220/map",
//       },
//       analytics: {
//         href: "/races/grp_2021_220/analytics",
//       },
//     },
//   },
// };

const Layout = ({ children }) => {
  return (
    <Chrome
      renderHeader={() => <Header items={MENU_ITEMS} />}
      renderFooter={() => <Footer />}
      renderMain={() => <Main>{children}</Main>}
      renderLeftSide={() => <LeftSide />}
      renderRightSide={() => <RightSide />}
    />
  );
};

export default Layout;
