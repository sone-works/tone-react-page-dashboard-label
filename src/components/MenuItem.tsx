import Link from 'next/link'

type MenuItemProps = {
  display: string
  url: string
  icon: any
  count?: number
  selected: boolean
}

export default function MenuItem({
  display,
  url,
  icon,
  count,
  selected,
}: MenuItemProps) {
  return (
    <li
      className="inline-flex items-center mr-2 px-2 border-solid border-global text-xl"
      style={{ borderBottomWidth: selected ? '2px' : '0' }}
    >
      <Link href={url}>
        {icon}
        {display}
      </Link>
      {count && (
        <span className="flex items-center justify-center rounded-full bg-global-flipped text-global-flipped text-xs font-header ml-1 h-4 w-4">
          {count}
        </span>
      )}
    </li>
  )
}
