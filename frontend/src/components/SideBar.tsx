// components/Sidebar.js
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const Sidebar = () => {
  return (
    <aside className="bg-black/70 backdrop-blur-md text-white w-64 min-h-screen p-4 border-r border-pink-500 shadow-xl transition-all duration-300">
  {/* Logo */}
  <div className="mb-8">
    <Link href="/">
      <span className="text-3xl font-extrabold text-pink-500 drop-shadow-pink neon-text tracking-wide hover:text-fuchsia-400 transition duration-300 cursor-pointer">
        DreamApp
      </span>
    </Link>
  </div>

  {/* Navigation */}
  <nav className="space-y-3">
    <Link href="/dashboard">
      <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-600/20 hover:text-pink-400 hover:translate-x-1 transition-all duration-300">
        Dashboard
      </Button>
    </Link>

    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1" className="border-b border-pink-500">
        <AccordionTrigger className="text-white hover:text-pink-400 transition">Content</AccordionTrigger>
        <AccordionContent className="pl-3 space-y-2">
          <Link href="/content/posts">
            <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-600/20 hover:text-pink-400 transition-all">
              Posts
            </Button>
          </Link>
          <Link href="/content/media">
            <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-600/20 hover:text-pink-400 transition-all">
              Media
            </Button>
          </Link>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="border-b border-pink-500">
        <AccordionTrigger className="text-white hover:text-pink-400 transition">Settings</AccordionTrigger>
        <AccordionContent className="pl-3 space-y-2">
          <Link href="/settings/profile">
            <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-600/20 hover:text-pink-400 transition-all">
              Profile
            </Button>
          </Link>
          <Link href="/settings/account">
            <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-600/20 hover:text-pink-400 transition-all">
              Account
            </Button>
          </Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    <Link href="/analytics">
      <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-600/20 hover:text-pink-400 hover:translate-x-1 transition-all duration-300">
        Analytics
      </Button>
    </Link>
  </nav>

  {/* Logout */}
  <div className="mt-auto pt-6">
    <Link href="/logout">
      <Button variant="outline" className="w-full border-pink-500 text-pink-500 hover:bg-pink-600 hover:text-black transition-all duration-300">
        Logout
      </Button>
    </Link>
  </div>
</aside>
);
}


export default Sidebar;