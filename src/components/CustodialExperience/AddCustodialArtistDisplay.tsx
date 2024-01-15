export type AddCustodialArtistDisplayProps = {
  display: string
  location: string
  uniqueUrl: string
  avatarURL?: string
}

export default function AddCustodialArtistDisplay({
  display,
  location,
  uniqueUrl,
  avatarURL,
}: AddCustodialArtistDisplayProps) {
  return (
    <div className="flex items-center rounded-xl p-4 bg-uploader-flipped my-4">
      <div
        className="bg-uploader rounded-full"
        style={{
          height: '5rem',
          width: '5rem',
          backgroundImage: `url("${avatarURL}")`,
          backgroundSize: 'cover',
        }}
      />
      <div className="flex flex-col px-2">
        <span
          className="font-release text-xl text-uploader-flipped"
          style={{ opacity: display ? '1' : '.5' }}
        >
          {display || 'Artist Name'}
        </span>
        <span
          className="text-uploader-flipped font-header text-base text-base"
          style={{ opacity: location ? '1' : '.5' }}
        >
          <i className="fa-light fa-map-pin mr-2" />
          {location || 'Planet Earth, Milkyway Galaxy'}
        </span>
        <span
          className="font-content text-xs text-uploader-flipped"
          style={{ opacity: uniqueUrl ? '1' : '.5' }}
        >
          <i className="fa-fw fa-thin fa-globe mr-1 py-1" />
          https://{uniqueUrl || '<custom url>'}.tone.audio
        </span>
      </div>
    </div>
  )
}
