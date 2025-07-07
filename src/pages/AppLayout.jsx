import { Outlet } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import BackToTopButton from '../components/BackToTopButton';

function AppLayout() {
  return (
    <div className="relative mx-auto w-full">
      <PageNav />

      <main>
        <Outlet />
      </main>
      <BackToTopButton />

      <Footer />
    </div>
  );
}

export default AppLayout;
