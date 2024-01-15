import { Input } from '@sone-dao/tone-react-core-ui'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import AddCustodialArtistForm from './AddCustodialArtistForm'
import CustodialArtistItem from './CustodialArtistItem'

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
    <div className="flex flex-col h-full w-full scrollbar-none overflow-y-auto">
      <div className="flex items-center">
        <Input
          className="grow"
          value={searchTerm}
          setValue={setSearchTerm}
          placeholder="Search for custodial artist..."
          startContent={
            <i className="fa-fw fa-regular fa-magnifying-glass text-2xl text-global-flipped" />
          }
        />
        <Link href={basePath + '/custodial/add'}>
          <i className="fa-fw fa-duotone fa-person-circle-plus text-3xl" />
        </Link>
      </div>
      <div className="overflow-y-auto scrollbar-none h-full w-full">
        <ul className="flex flex-col py-2">
          {label.custodianFor.map((entity: any, i: number) => (
            <CustodialArtistItem key={i} entity={entity} />
          ))}
        </ul>
      </div>
    </div>
  )
}
