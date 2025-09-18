import { Children, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'components/ui/breadcrumb';
import { useNavigate } from 'react-router';

export function BreadAnchor() {
  return <div id="bread-portal" />;
}

export function BreadPortal({
  navs,
}: {
  navs: Array<{ label: string; to: string }>;
}) {
  const navigate = useNavigate();
  const [breadNode, setBreadNode] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = document.getElementById('bread-portal') as HTMLDivElement;
    if (el) setBreadNode(el);
  }, []);
  if (!breadNode) return null;
  return createPortal(
    <Breadcrumb>
      <BreadcrumbList>
        {Children.toArray(
          navs.map((item, index) => {
            if (index < navs.length - 1) {
              return (
                <div
                  className="flex items-center gap-1.5 sm:gap-2.5"
                  key={item.label}
                >
                  {index > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      href={item.to}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.to);
                      }}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </div>
              );
            }
            return (
              <div
                className="flex items-center gap-1.5 sm:gap-2.5"
                key={item.label}
              >
                {index > 0 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              </div>
            );
          })
        )}
      </BreadcrumbList>
    </Breadcrumb>,
    breadNode
  );
}
