import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import { Suspense } from "react";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <main>
      <section className="">
        <PageNav />
      </section>
      <section className="h-[calc(100vh-12vh)]  bg-violet-300">
        <main className="p-2 flex h-full gap-2">
          {/* Sidebar */}
          <div className="max-lg:hidden">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="h-full max-lg:w-full  w-[80vw] overflow-y-scroll scrollbar-hide">
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </section>
    </main>
  );
}

export default AppLayout;
