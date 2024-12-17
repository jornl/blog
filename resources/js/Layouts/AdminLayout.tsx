import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Sidebar from "@/Layouts/Sidebar";

type LayoutProps = {
  children?: ReactNode;
  sidebar?: boolean;
};

type SidebarState = {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
};

const initialState: SidebarState = {
  sidebar: true,
  setSidebar: () => null,
};

const LayoutProviderContext = createContext<SidebarState>(initialState);

export function AdminLayoutProvider({ children, ...props }: LayoutProps) {
  const [sidebar, setSidebar] = useState<boolean>(
    () => localStorage.getItem("show-sidebar") === "true" || false,
  );

  const value = {
    sidebar,
    setSidebar: (sidebar: boolean) => {
      localStorage.setItem("show-sidebar", sidebar.toString());
      setSidebar(sidebar);
    },
  };

  return (
    <LayoutProviderContext.Provider {...props} value={value}>
      {sidebar && (
        <div className="fixed flex flex-col top-0 h-[calc(100vh-2rem)] w-full max-w-[16rem] bg-base-300 p-4 shadow-xl z-10">
          <Sidebar expanded={sidebar} />
        </div>
      )}
      <main className="md:pl-[18rem] md:pr-8">{children}</main>
      <footer></footer>
    </LayoutProviderContext.Provider>
  );
}

export const useLayout = () => {
  const context = useContext(LayoutProviderContext);

  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }

  return context;
};
