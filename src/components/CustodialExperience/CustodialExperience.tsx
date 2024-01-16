import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import AddCustodialArtistForm from './AddCustodialArtistForm'
import CustodialArtistItem from './CustodialArtistItem'
import CustodialSearchAndAdd from './CustodialSearchAndAdd'

export type CustodialExperienceProps = {
  label: any
  useStyleStore: UseStyleStore
  basePath: string
}

export default function CustodialExperience({
  label,
  useStyleStore,
  basePath,
}: CustodialExperienceProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const pathname = usePathname()

  const experience = pathname.split('/')[5] || ''

  if (experience == 'add')
    return (
      <AddCustodialArtistForm
        useStyleStore={useStyleStore}
        basePath={basePath}
        label={label}
      />
    )

  return (
    <div className="flex flex-col w-full px-2 scrollbar-none">
      <CustodialSearchAndAdd
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        basePath={basePath}
      />
      <ul className="flex flex-col w-full py-2">
        {label.custodianFor.map((entity: any, i: number) => (
          <CustodialArtistItem key={i} entity={entity} />
        ))}
      </ul>
    </div>
  )
}
