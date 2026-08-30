import { Check, X } from '@phosphor-icons/react/dist/ssr'

export function DosDonts({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="dos-donts">
      <div className="dos-donts-col dos-donts-do">
        <div className="dos-donts-heading">
          <Check size={16} weight="bold" />
          Do
        </div>
        <ul>
          {dos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="dos-donts-col dos-donts-dont">
        <div className="dos-donts-heading">
          <X size={16} weight="bold" />
          Don&apos;t
        </div>
        <ul>
          {donts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
