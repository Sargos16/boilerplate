import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  Separator,
  BreadAnchor,
} from 'components';
import { Outlet } from 'react-router';
import { AdminSidebar } from './AdminSidebar';

function AdminShell() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadAnchor />
          </div>
        </header>

        <div className="relative flex flex-1 flex-col overflow-x-hidden bg-white px-6 pb-6 focus:outline-none">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminShell;
