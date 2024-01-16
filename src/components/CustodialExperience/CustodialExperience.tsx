import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import Head from 'next/head'
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
      <>
        <Head>
          <title>
            Tone - {label.display || label.entityId}'s Dashboard - Add Custodial
            Artist
          </title>
        </Head>
        <AddCustodialArtistForm
          useStyleStore={useStyleStore}
          basePath={basePath}
          label={label}
        />
      </>
    )

  return (
    <>
      <Head>
        <title>
          Tone - {label.display || label.entityId}'s Dashboard - Custodial
          Artists
        </title>
      </Head>
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
    </>
  )
}
