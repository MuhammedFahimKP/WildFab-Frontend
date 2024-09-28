import { useContext, lazy, Suspense } from "react";
import { useOutlet } from "react-router-dom";
import { NotFoundContext } from "../../context";

import ScreenContainer from "../../ui/user/ScreenContainer";

const Navbar = lazy(() => import("@/components/admin/Navbar"));
const SideBar = lazy(() => import("@/components/admin/SideBar"));
const DashBoard = lazy(() => import("@/components/admin/DashBoard"));
const PageNotFound = lazy(() => import("@/components/NotFound"));

function Home() {
  const outlet = useOutlet();

  const notFound = useContext(NotFoundContext);

  return (
    <ScreenContainer>
      {notFound?.notFoundItem ? (
        <Suspense>
          <PageNotFound />
        </Suspense>
      ) : (
        <>
          <Suspense>
            <Navbar />
          </Suspense>

          <div className="flex font-roboto">
            <SideBar />
            <div className="lg:ml-64 w-full mt-20 overflow-hidden">
              {outlet ? (
                outlet
              ) : (
                <Suspense>
                  <DashBoard />
                </Suspense>
              )}
            </div>
          </div>
        </>
      )}
    </ScreenContainer>
  );
}

export default Home;
