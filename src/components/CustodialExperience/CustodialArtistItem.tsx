import ToneApiService from '@sone-dao/tone-react-api'
import { Avatar } from '@sone-dao/tone-react-core-ui'

type CustodialArtistItemProps = {
  entity: any
}

export default function CustodialArtistItem({
  entity,
}: CustodialArtistItemProps) {
  const api = new ToneApiService()

  const backgroundColor = `var(--${entity.entityId}-darker)`

  const color = `var(--${entity.entityId}-lighter)`

  const fallback = (
    <div
      className="flex items-center justify-center rounded-full w-9 h-9 border"
      style={{
        borderColor: color,
        color,
      }}
    >
      <i className="fa-fw fa-duotone fa-user" />
    </div>
  )

  return (
    <li
      className="flex flex-col p-4 my-2 rounded-xl"
      style={{
        backgroundColor,
        color,
      }}
    >
      <div className="flex items-center">
        <Avatar
          src={api.entities.getAvatarUrlByName(entity.uniqueUrl)}
          className="w-9 h-9 mr-2"
          classNames={{ img: 'rounded-full' }}
          fallback={fallback}
        />
        <h4 className="font-release text-xl">{entity.display}</h4>
      </div>
    </li>
  )
}
