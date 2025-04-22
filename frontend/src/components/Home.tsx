
import { SearchUp } from "./Search";
import { Powerful } from "./Powerful";
import { Stats } from "./Stats";
import { UsersSay } from "./UsersSay";

export const HomeUp = () => {
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
};
