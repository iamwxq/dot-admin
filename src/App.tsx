import { NotificationProvider } from "@/contexts/notification";

import Home from "@/pages/Home";

function App() {
  return (
    <NotificationProvider>
      <Home />
    </NotificationProvider>
  );
}

export default App;
