import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from 'components';
import { PRIVATE_ROUTES } from 'Routes';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { useGlobal } from 'context/app-brand';
import { NavUser } from './NavUser';

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { app_name, app_icon_url } = useGlobal();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <img src={app_icon_url} className="size-24 object-contain" />
          <div className="hidden flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{app_name}</span>
            <span className="truncate text-xs">Admin Portal</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function NavMain() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const items = PRIVATE_ROUTES.map((route) => ({
    label: route.label,
    isActive: pathname.includes(route.path),
    icon: route.icon,
    url: route.path,
    children: (route?.children || []).map((child) => ({
      label: child.label,
      isActive: pathname.includes(child.path),
      icon: child.icon,
      url: child.path,
    })),
  }));

  const handleCollapsibleToggle = (itemLabel: string) => {
    setOpenCollapsible(openCollapsible === itemLabel ? null : itemLabel);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Portal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const anyChildIsActive =
            item.children && item.children.some((child) => child.isActive);
          if (item.children?.length < 1) {
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <NavLink
                    to={item.url}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.url);
                      setOpenCollapsible(null);
                    }}
                    className={`${
                      location.pathname === item.url ||
                      (item.children && location.pathname.startsWith(item.url))
                        ? 'from-primary/10 to-primary/5 text-primary border-primary hover:from-primary/15 hover:to-primary/10 bg-gradient-to-r font-semibold shadow-lg transition-all duration-200'
                        : 'hover:bg-sidebar-accent/50 transition-all duration-200'
                    } `}
                  >
                    {item.icon && item.icon}
                    <span>{item.label}</span>
                    {(item.children || []).length > 0 && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
          return (
            <Collapsible
              key={item.label}
              asChild
              open={
                openCollapsible === item.label ||
                anyChildIsActive ||
                item.isActive
              }
              onOpenChange={() => handleCollapsibleToggle(item.label)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.url);
                      }}
                      className={`${
                        location.pathname === item.url ||
                        (item.children &&
                          location.pathname.startsWith(item.url))
                          ? 'from-primary/10 to-primary/5 text-primary border-primary hover:from-primary/15 hover:to-primary/10 bg-gradient-to-r font-semibold shadow-lg transition-all duration-200'
                          : 'hover:bg-sidebar-accent/50 transition-all duration-200'
                      }`}
                    >
                      {item.icon && item.icon}
                      <span>{item.label}</span>
                      {(item.children || []).length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {(item.children || []).map((subItem) => (
                      <SidebarMenuSubItem key={subItem.label}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={subItem.url}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(subItem.url);
                            }}
                            className={`${
                              location.pathname === subItem.url
                                ? 'from-primary/10 to-primary/5 text-primary border-primary hover:from-primary/15 hover:to-primary/10 bg-gradient-to-r font-semibold shadow-lg transition-all duration-200'
                                : 'hover:bg-sidebar-accent/50 transition-all duration-200'
                            }`}
                          >
                            {subItem.icon && subItem.icon}
                            <span>{subItem.label}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
