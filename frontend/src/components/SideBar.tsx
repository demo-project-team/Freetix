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
    <aside className="bg-black text-white w-64 min-h-screen p-4 border-r border-pink-500">
      <div className="mb-6">
        <Link href="/">
          <span className="text-2xl font-bold text-pink-500 neon-text">DreamApp</span>
        </Link>
      </div>
      <nav className="space-y-2">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-500 hover:text-black transition">
            Dashboard
          </Button>
        </Link>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-pink-500">
            <AccordionTrigger className="text-white hover:text-pink-500">Content</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-1 pl-4">
                <Link href="/content/posts">
                  <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-500 hover:text-black transition">
                    Posts
                  </Button>
                </Link>
                <Link href="/content/media">
                  <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-500 hover:text-black transition">
                    Media
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-pink-500">
            <AccordionTrigger className="text-white hover:text-pink-500">Settings</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-1 pl-4">
                <Link href="/settings/profile">
                  <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-500 hover:text-black transition">
                    Profile
                  </Button>
                </Link>
                <Link href="/settings/account">
                  <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-500 hover:text-black transition">
                    Account
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Link href="/analytics">
          <Button variant="ghost" className="w-full text-left text-white hover:bg-pink-500 hover:text-black transition">
            Analytics
          </Button>
        </Link>
      </nav>
      <div className="mt-auto pt-6">
        <Link href="/logout">
          <Button variant="outline" className="w-full text-pink-500 border-pink-500 hover:bg-pink-500 hover:text-black transition">
            Logout
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;