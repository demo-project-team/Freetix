// pages/index.js
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '@/components/SideBar';


export default function Home() {
  return (
    <div className="bg-black min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Footer />
      </div>
    </div>
  );
}