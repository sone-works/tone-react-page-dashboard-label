import { Input } from '@sone-dao/tone-react-core-ui'
import Link from 'next/link'

type CustodialSearchAndAddProps = {
  searchTerm: string
  setSearchTerm: Function
  basePath: string
}

export default function CustodialSearchAndAdd({
  searchTerm,
  setSearchTerm,
  basePath,
}: CustodialSearchAndAddProps) {
  return (
    <div className="flex items-center w-full px-4">
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
  )
}
