import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <div className="container py-2">
    <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-2">
          {item.href ? (
            <Link to={item.href} className="hover:text-primary">{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
          {idx < items.length - 1 && <ChevronLeft className="h-4 w-4" />}
        </span>
      ))}
    </div>
  </div>
);

export default Breadcrumb;