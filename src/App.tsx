import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "@/pages/login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />

      <ReactQueryDevtools
        buttonPosition="bottom-left"
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}

export default App;
