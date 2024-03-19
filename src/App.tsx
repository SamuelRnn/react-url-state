import { Link, Route, Switch } from "wouter";
import { createQueryState } from "./query-state";

const App = () => (
  <>
    <Link href="/" asChild>
      <button>home</button>
    </Link>
    <Link href="/inbox" asChild>
      <button>inbox</button>
    </Link>

    <Route path="/about">About Us</Route>

    <Switch>
      <Route path="/" component={Home} />
      <Route path="/inbox" component={InboxPage} />

      {/* Default route in a switch */}
      <Route>404: No such page!</Route>
    </Switch>
  </>
);

export default App;

const useQueryState = createQueryState({
  count: 0,
  page: 1,
  play_index: 0,
  is_playing: false,
  id: "",
});

function InboxPage() {
  return (
    <div>
      <Filters />
      <Playing />
      <Count />
    </div>
  );
}
function Playing() {
  const [state, query] = useQueryState((s) => s.is_playing);
  return (
    <div>
      is_playing: {state.toString()}
      <input type="checkbox" onChange={() => query.set({ is_playing: !state })} checked={state} />
    </div>
  );
}
function Count() {
  const [state, query] = useQueryState((s) => s.count);
  return (
    <div>
      count: {state}
      <button onClick={() => query.set({ count: state + 1 })}>setcount +1</button>
    </div>
  );
}

function Filters() {
  const [state] = useQueryState();
  return (
    <div>
      <h1>filters</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

function Home() {
  return <div>hola soy la casa</div>;
}
