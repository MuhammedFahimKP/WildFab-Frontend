import { lazy, Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

import AddVaraitonPage from "../pages/admin/AddVaraitonPage";
import EditProduct from "../pages/admin/EditProduct";
import ProductViewPage from "../pages/admin/ProductViewPage";
import VariationViewPage from "../pages/admin/VariationViewPage";
import CreateProduct from "../pages/admin/CreateProduct.tsx";
import Orders from "../pages/admin/Orders.tsx";
import SingleOrderView from "../pages/admin/SingleOrderView.tsx";
import { NotFoundProvider } from "../context";

const AdminHome = lazy(() => import("../pages/admin/Home.tsx"));
const Product = lazy(() => import("../pages/admin/Product.tsx"));
const Brand = lazy(() => import("../pages/admin/Brand.tsx"));
const Category = lazy(() => import("../pages/admin/Category.tsx"));
const Color = lazy(() => import("../pages/admin/Color.tsx"));
const Size = lazy(() => import("../pages/admin/Size.tsx"));
const User = lazy(() => import("../pages/admin/User.tsx"));

// Routs
const routes: RouteObject[] = [
  {
    id: "admin-home",
    path: "admin/",
    element: (
      <Suspense>
        <NotFoundProvider>
          <AdminHome />
        </NotFoundProvider>
      </Suspense>
    ),
    children: [
      {
        path: "product/",
        element: (
          <Suspense>
            <Product />
          </Suspense>
        ),
        children: [
          { path: "add/", element: <CreateProduct /> },
          {
            path: "view/:id/",
            element: <ProductViewPage />,
          },
          { path: "edit/:id", element: <EditProduct /> },

          { path: "varaition/:varid/", element: <VariationViewPage /> },

          { path: "variation/:pid/add/", element: <AddVaraitonPage /> },
        ],
      },
      {
        path: "orders/",
        element: <Orders />,

        children: [{ path: ":id/", element: <SingleOrderView /> }],
      },
      {
        path: "brand/",
        element: (
          <Suspense>
            <Brand />
          </Suspense>
        ),
      },

      {
        path: "category",
        element: (
          <Suspense>
            <Category />
          </Suspense>
        ),
      },

      {
        path: "size",
        element: (
          <Suspense>
            <Size />
          </Suspense>
        ),
      },
      {
        path: "color",
        element: (
          <Suspense>
            <Color />
          </Suspense>
        ),
      },

      {
        path: "user",
        element: (
          <Suspense>
            <User />
          </Suspense>
        ),
      },
    ],
  },
];

export default createBrowserRouter(routes);
