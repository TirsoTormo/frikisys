import React from 'react';
import PixelIcon from './PixelIcon';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories?: string[];
}

export interface SidebarProps {
  categories?: Category[];
  activeCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const defaultCategories: Category[] = [
  {
    id: 'linux',
    name: 'Linux',
    icon: 'terminal',
    color: '#6b7280',
    subcategories: ['Comandos', 'Scripting', 'systemd', 'Permisos', 'Networking'],
  },
  {
    id: 'virtualization',
    name: 'Virtualización',
    icon: 'server',
    color: '#3b82f6',
    subcategories: ['Docker', 'Kubernetes', 'VMware', 'Proxmox', 'QEMU'],
  },
  {
    id: 'networking',
    name: 'Redes',
    icon: 'network',
    color: '#8b5cf6',
    subcategories: ['TCP/IP', 'Firewall', 'DNS', 'VPN', 'Monitoring'],
  },
  {
    id: 'security',
    name: 'Seguridad',
    icon: 'shield',
    color: '#ef4444',
    subcategories: ['SSL/TLS', 'SSH', 'Hardening', 'Audit', 'Fail2ban'],
  },
  {
    id: 'databases',
    name: 'Bases de Datos',
    icon: 'database',
    color: '#f59e0b',
    subcategories: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Backup'],
  },
  {
    id: 'cloud',
    name: 'Cloud',
    icon: 'cloud',
    color: '#06b6d4',
    subcategories: ['AWS', 'GCP', 'Azure', 'Terraform', 'Serverless'],
  },
];

const CategoryIcon: React.FC<{ icon: string; active?: boolean; color?: string }> = ({ icon, active, color }) => {
  const iconColor = active && color ? color : (color || '#6b7280');
  
  // Map category icons to PixelIcon names
  const iconMap: Record<string, string> = {
    terminal: 'terminal',
    server: 'server',
    network: 'network',
    shield: 'shield',
    database: 'database',
    cloud: 'cloud',
  };

  const pixelIconName = iconMap[icon] || 'document';
  
  return <PixelIcon name={pixelIconName} size={20} color={iconColor} />;
};

const Sidebar: React.FC<SidebarProps> = ({
  categories = defaultCategories,
  activeCategory,
  onCategoryClick,
  collapsed = false,
  onToggleCollapse,
}) => {
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(['linux']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    onCategoryClick?.(categoryId);
  };

  if (collapsed) {
    return (
      <aside className="fixed left-0 top-16 bottom-0 w-16 bg-base-card border-r border-base-border z-40 flex flex-col items-center py-4">
        <button
          onClick={onToggleCollapse}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
        
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`p-3 rounded transition-colors ${
                activeCategory === category.id
                  ? 'bg-base-hover text-accent'
                  : 'text-text-secondary hover:bg-base-hover hover:text-text-primary'
              }`}
              title={category.name}
            >
              <CategoryIcon icon={category.icon} active={activeCategory === category.id} />
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-base-card border-r border-base-border z-40 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-border">
        <span className="font-mono text-sm text-text-secondary">Categorías</span>
        <button
          onClick={onToggleCollapse}
          className="p-1 text-text-secondary hover:text-text-primary hover:bg-base-hover rounded transition-colors"
          aria-label="Colapsar sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Categories list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          const isActive = activeCategory === category.id;

          return (
            <div key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                  isActive
                    ? 'bg-base-hover border-l-2'
                    : 'text-text-secondary hover:bg-base-hover hover:text-text-primary border-l-2 border-transparent'
                }`}
                style={{ 
                  borderLeftColor: isActive ? category.color : undefined,
                  color: isActive ? category.color : undefined 
                }}
              >
                <CategoryIcon icon={category.icon} active={isActive} color={category.color} />
                <span className="font-mono text-sm flex-1">{category.name}</span>
                {category.subcategories && (
                  <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="square" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>

              {/* Subcategories */}
              {isExpanded && category.subcategories && (
                <div className="bg-base-bg">
                  {category.subcategories.map((sub, index) => (
                    <button
                      key={sub}
                      className="w-full flex items-center gap-3 pl-12 pr-4 py-1.5 text-text-muted hover:text-text-secondary hover:bg-base-hover transition-colors"
                    >
                      <span className="w-1 h-1 bg-pixel-dark rounded-full" />
                      <span className="font-mono text-xs">{sub}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer with pixel decoration */}
      <div className="p-4 border-t border-base-border">
        <div className="pixel-separator">
          <span className="font-mono text-xs text-text-muted px-2">v0.1</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
