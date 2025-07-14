import { ConfigProvider } from "antd";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router";
import RouterComponent from "./Layout/Routing";
import LoadingScreen from "./Layout/LoadingScreen";

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#4f46e5",
            borderRadius: 10,

            // Alias Token
            colorBgContainer: "#fff",
          },
        }}
      >
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <RouterComponent />
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;
