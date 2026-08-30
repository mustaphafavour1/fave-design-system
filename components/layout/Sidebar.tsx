import { navigation } from '@/lib/navigation'
import { getProducts, getNavSections } from '@/lib/sanity'
import { NavLink } from './NavLink'
import { NavGroup } from './NavGroup'

export async function Sidebar() {
  const [products, dynamicSections] = await Promise.all([getProducts(), getNavSections()])

  // navSection documents can override/add a badge on a static nav item by
  // href (e.g. flagging pending work) without a code deploy. Zero content
  // in Sanity here is expected and falls back to the static badges below.
  const badgeOverrides = new Map<string, string>()
  if (Array.isArray(dynamicSections)) {
    for (const section of dynamicSections) {
      for (const item of section?.items ?? []) {
        if (item?.href && item?.badge) badgeOverrides.set(item.href, item.badge)
      }
    }
  }

  const contributingIndex = navigation.findIndex((section) => section.label === 'Contributing')
  const mainSections = navigation.slice(0, contributingIndex)
  const contributing = navigation[contributingIndex]

  const productsSection = {
    label: 'Products',
    icon: 'Package',
    items: [
      { label: 'All Products', href: '/products' },
      ...(Array.isArray(products)
        ? products.map((product: any) => ({ label: product.name, href: `/products/${product.slug}` }))
        : []),
    ],
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">H</span>
        HeadFavour
      </div>
      <nav className="sidebar-nav">
        {mainSections.map((section) =>
          section.href ? (
            <div className="nav-section" key={section.label}>
              <NavLink href={section.href} topLevel icon={section.icon} badge={badgeOverrides.get(section.href)}>
                {section.label}
              </NavLink>
            </div>
          ) : (
            <div className="nav-section" key={section.label}>
              <NavGroup section={section} badgeOverrides={badgeOverrides} />
            </div>
          )
        )}

        <div className="nav-section">
          <NavGroup section={productsSection} badgeOverrides={badgeOverrides} emptyMessage="No products yet" />
        </div>

        {contributing ? (
          <div className="nav-section">
            <NavLink href={contributing.href!} topLevel icon={contributing.icon}>
              {contributing.label}
            </NavLink>
          </div>
        ) : null}
      </nav>
    </aside>
  )
}
