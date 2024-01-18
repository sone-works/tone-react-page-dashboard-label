import ToneApiService from '@sone-dao/tone-react-api'
import { Avatar } from '@sone-dao/tone-react-core-ui'
import { useDarkMode } from 'usehooks-ts'

type CustodialArtistItemProps = {
  entity: any
}

export default function CustodialArtistItem({
  entity,
}: CustodialArtistItemProps) {
  const { isDarkMode } = useDarkMode()

  const api = new ToneApiService()

  const styleNamespace = entity.entityId

  const namespaceColors = {
    darker: !isDarkMode
      ? `var(--${styleNamespace}-darker)`
      : `var(--${styleNamespace}-lighter)`,
    lighter: !isDarkMode
      ? `var(--${styleNamespace}-lighter)`
      : `var(--${styleNamespace}-darker)`,
  }

  const colors = {
    ...namespaceColors,
    background: namespaceColors.lighter,
    text: namespaceColors.darker,
    border: namespaceColors.darker,
  }

  const fallback = (
    <div
      className="flex items-center justify-center rounded-full w-9 h-9 border"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
      }}
    >
      <i className="fa-fw fa-duotone fa-user" />
    </div>
  )

  return (
    <li
      className="flex items-center p-4 my-2 border-2 rounded-xl"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        borderColor: colors.border,
      }}
    >
      <Avatar
        src={api.entities.getAvatarUrlByName(entity.uniqueUrl)}
        className="w-9 h-9 mr-2"
        classNames={{ img: 'rounded-full' }}
        fallback={fallback}
      />
      <h4 className="font-release text-xl">{entity.display}</h4>
    </li>
  )
}
