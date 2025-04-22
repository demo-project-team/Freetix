// pages/index.js

import { Powerful } from '@/components/Powerful';
import { SearchUp } from '@/components/Search';
import { Stats } from '@/components/Stats';
import { UsersSay } from '@/components/UsersSay';


export default function Home() {
  return (
       <div>
          <main className="flex-1 p-6">
            <SearchUp/>
            <Powerful/>
            <Stats/>
            <UsersSay/>
          </main>
        </div>
  );
}