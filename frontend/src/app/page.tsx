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
        <main className="flex-1 p-4">
          <h1 className="text-4xl text-[#c77dff] neon-text">Welcome to Freetix</h1>
        </main>
        <Footer />
      </div>
    </div>
  );
}