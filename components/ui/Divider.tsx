export function Divider({ label }: { label?: string }) {
  if (label) {
    return (
      <div className="ui-divider-labeled">
        <span className="ui-divider-line" />
        <span className="ui-divider-label">{label}</span>
        <span className="ui-divider-line" />
      </div>
    )
  }
  return <hr className="ui-divider" />
}
