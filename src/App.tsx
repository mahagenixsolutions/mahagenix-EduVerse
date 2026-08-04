import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { GlobalErrorBoundary } from "@/components/feedback";
import { SplashProvider, useSplashScreen, AppSplashScreen } from "@/components/splash";
import { AppRoutes, PageFallbackLoader } from "@/routes";

const MainAppContent: React.FC = () => {
  const { isSplashActive } = useSplashScreen();

  return (
    <>
      {isSplashActive && <AppSplashScreen />}
      <BrowserRouter>
        <GlobalErrorBoundary>
          <Suspense fallback={<PageFallbackLoader />}>
            <AppRoutes />
          </Suspense>
        </GlobalErrorBoundary>
      </BrowserRouter>
    </>
  );
};

function App() {
  return (
    <SubscriptionProvider>
      <RoleProvider>
        <SplashProvider>
          <MainAppContent />
        </SplashProvider>
      </RoleProvider>
    </SubscriptionProvider>
  );
}

export default App;
