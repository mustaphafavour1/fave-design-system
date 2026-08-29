import { navigation } from '@/lib/navigation'
import { getProducts, getNavSections } from '@/lib/sanity'
import { NavLink } from './NavLink'

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

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">F</span>
        Fave Design System
      </div>
      <nav className="sidebar-nav">
        {mainSections.map((section) => (
          <div className="nav-section" key={section.label}>
            {section.href ? (
              <NavLink href={section.href} topLevel badge={badgeOverrides.get(section.href)}>
                {section.label}
              </NavLink>
            ) : (
              <>
                <div className="nav-section-label">{section.label}</div>
                {section.items?.map((item) => (
                  <NavLink key={item.href} href={item.href} badge={badgeOverrides.get(item.href) ?? item.badge}>
                    {item.label}
                  </NavLink>
                ))}
                {section.groups?.map((group) => (
                  <div key={group.label}>
                    <div className="nav-group-label">{group.label}</div>
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        href={item.href}
                        badge={badgeOverrides.get(item.href) ?? item.badge}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>
        ))}

        <div className="nav-section">
          <div className="nav-section-label">Products</div>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product: any) => (
              <NavLink key={product.slug} href={`/products/${product.slug}`}>
                {product.name}
              </NavLink>
            ))
          ) : (
            <div className="nav-empty">No products yet</div>
          )}
        </div>

        {contributing ? (
          <div className="nav-section">
            <NavLink href={contributing.href!} topLevel>
              {contributing.label}
            </NavLink>
          </div>
        ) : null}
      </nav>
    </aside>
  )
}
