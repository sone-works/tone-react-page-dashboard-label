import ToneApiService from '@sone-dao/tone-react-api'
import { Avatar } from '@sone-dao/tone-react-core-ui'

type LabelDisplayProps = { label: any }

export default function LabelDisplay({ label }: LabelDisplayProps) {
  const api = new ToneApiService()

  return (
    <div className="flex mt-2 w-full p-2">
      <Avatar
        src={api.entities.getAvatarUrlByName(label.uniqueUrl)}
        classNames={{ img: 'h-28 w-28 rounded-full' }}
        fallback={<div className="bg-global-flipped rounded-full h-28 w-28" />}
      />
      <div className="flex flex-col px-2">
        <h3 className="flex items-center justify-center font-release text-3xl">
          {label.display}
        </h3>
        {label.location && (
          <h4 className="font-header text-base">
            <i className="fa-light fa-map-pin mr-1" />
            {label.location}
          </h4>
        )}
        {
          // More important information can be displayed here, maybe even can be customized as to what is displayed?
        }
      </div>
    </div>
  )
}
