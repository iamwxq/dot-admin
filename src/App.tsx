import { NotificationProvider } from "@/context/notification";

import Home from "@/pages/Home";

function App() {
  return (
    <NotificationProvider>
      <Home />
    </NotificationProvider>
  );
}

export default App;
