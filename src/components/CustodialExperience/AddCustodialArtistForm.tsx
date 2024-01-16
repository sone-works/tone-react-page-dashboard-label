import ToneApi from '@sone-dao/tone-react-api'
import {
  Button,
  ColorPicker,
  FileSelect,
  Form,
  Input,
  Textarea,
} from '@sone-dao/tone-react-core-ui'
import ToneCSSUtils from '@sone-dao/tone-react-css-utils'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import { isAAContrast } from 'accessible-colors'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddCustodialArtistDisplay from './AddCustodialArtistDisplay'

type AddCustodialArtistFormProps = {
  useStyleStore: UseStyleStore
  basePath: string
  label: any
}

export default function AddCustodialArtistForm({
  useStyleStore,
  basePath,
  label,
}: AddCustodialArtistFormProps) {
  const styles = useStyleStore()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [avatar, setAvatar] = useState<File>()
  const [avatarURL, setAvatarURL] = useState<string>()
  const [isValidAvatar, setValidAvatar] = useState<boolean>(false)
  const [avatarError, setAvatarError] = useState<string>('')

  const [display, setDisplay] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [uniqueUrl, setUniqueUrl] = useState<string>('')

  const [colorPrimary, setColorPrimary] = useState<string>(styles.global[0])
  const [colorSecondary, setColorSecondary] = useState<string>(styles.global[1])
  const [isValidContrast, setValidContrast] = useState<boolean>(false)

  const api = new ToneApi()

  const router = useRouter()

  useEffect(() => {
    colorPrimary && colorSecondary && setColors(colorPrimary, colorSecondary)
  }, [colorPrimary, colorSecondary])

  useEffect(() => {
    avatar && validateAvatar(avatar)
  }, [avatar])

  useEffect(() => {
    return () => {
      avatarURL && URL.revokeObjectURL(avatarURL)
    }
  }, [])

  const canCreate = display && uniqueUrl && isValidContrast ? true : false

  return (
    <div className="flex flex-col w-full px-2 scrollbar-none">
      <p className="bg-global-flipped text-global-flipped p-2 font-content text-base">
        <i className="fa-fw fa-solid fa-exclamation mr-2" />
        Some HEY this is a BIG DEAL cause you're adding a whole ass artist to
        Tone that the label controls text.
      </p>
      <AddCustodialArtistDisplay
        avatarURL={avatarURL}
        display={display}
        location={location}
        uniqueUrl={uniqueUrl}
      />
      <Form onSubmit={addCustodialArtist}>
        <h4 className="font-header text-global text-2xl mb-2">
          Artist Information
        </h4>
        <FileSelect name="avatar" label="avatar*" setValue={setAvatar} />
        <Input
          name="display"
          label="name*"
          placeholder="Artist Name"
          value={display}
          setValue={setDisplay}
        />
        <Input
          name="uniqueUrl"
          label="unique URL*"
          placeholder="Unique URL"
          value={uniqueUrl}
          setValue={setUniqueUrl}
        />
        <Input
          name="location"
          label="location"
          placeholder="Planet Earth, Milkyway Galaxy"
          value={location}
          setValue={setLocation}
        />
        <Textarea
          name="description"
          label="biography"
          placeholder="Cooler than a polar bear's toe nail."
        />
        <h4 className="font-header text-global text-2xl my-2">Tone</h4>
        <p className="text-sm font-content mb-4">
          These colors will represent the artist on the platform, and will
          effect the sites visual appearance when interacting with pages
          relating to them (ie. their profile, settings, etc). These colors can
          be changed at anytime in the artist's settings.
        </p>
        <ColorPicker
          classNames={{
            wrapper:
              'border-2 border-global flex items-center border-2 bg-global-flipped rounded-xl w-full',
          }}
          name="primary"
          value={colorPrimary}
          setValue={(value) => setColorPrimary(value)}
        />
        <ColorPicker
          className="my-1"
          classNames={{
            wrapper:
              'border-2 border-global flex items-center border-2 bg-global-flipped rounded-xl w-full',
          }}
          name="secondary"
          value={colorSecondary}
          setValue={(value) => setColorSecondary(value)}
        />
        {!isValidContrast && (
          <div className="flex items-center my-2 p-1 bg-global-flipped text-global-flipped text-sm font-header">
            <i className="fa-fw fa-solid fa-exclamation mr-2 text-2xl" />
            The colors you've picked fall outside of what's considered an
            accessible contrast. Please choose another combination.
          </div>
        )}
        <h4 className="font-header text-global text-2xl mb-4">
          Socials & Connections
        </h4>
        <div>
          <Input
            className="my-2"
            name="socialsTwitter"
            startContent={
              <div className="flex items-center">
                <i className="fa-fw fa-brands fa-x-twitter text-2xl text-global-flipped" />
                <i className="fa-fw fa-duotone fa-at text-xl text-global-flipped" />
              </div>
            }
          />
          <Input
            className="my-2"
            name="socialsInstagram"
            startContent={
              <div className="flex items-center">
                <i className="fa-fw fa-brands fa-instagram text-2xl text-global-flipped" />
                <i className="fa-fw fa-duotone fa-at text-xl text-global-flipped" />
              </div>
            }
          />
        </div>
        <Button
          className="my-4"
          classNames={{
            button:
              'flex items-center justify-center w-full p-1 bg-global-flipped text-global-flipped rounded-xl font-content text-lg',
            innerWrapper:
              'border-2 border-global-flipped p-2 rounded-xl w-full',
          }}
          isDisabled={!canCreate}
        >
          Add Custodial Artist
        </Button>
      </Form>
    </div>
  )

  async function addCustodialArtist(e: any) {
    setLoading(true)

    const custodialUrlPath = basePath + '/custodial'

    const display = e.target.display.value || ''
    const uniqueUrl = e.target.uniqueUrl.value || ''
    const location = e.target.location.value || ''
    const description = e.target.description.value || ''

    const colors: [string, string] = [
      e.target.primary.value || '',
      e.target.secondary.value || '',
    ]

    const socials = {
      twitter: e.target.socialsTwitter.value || '',
      instagram: e.target.socialsInstagram.value || '',
    }

    const artist = {
      display,
      uniqueUrl,
      location,
      description,
      colors,
      socials,
    }

    return api.entities
      .addCustodial(label.entityId, artist)
      .then((response) => {
        const { entity } = response

        if (avatar) {
          return api.entities
            .uploadAvatar(entity.entityId, avatar)
            .then(() => {
              router.push(custodialUrlPath)
            })
            .catch((error) => {
              setLoading(false)

              setError(
                'Custodial artist was created, but there was an error uploading their avatar.'
              )
            })
        }

        return router.push(custodialUrlPath)
      })
      .catch((error) => {
        setLoading(false)

        setError('Error creating Custodial Artist')
      })
  }

  function setColors(colorPrimary: string, colorSecondary: string) {
    if (isAAContrast(colorPrimary, colorSecondary, true)) {
      ToneCSSUtils.setColors('uploader', colorPrimary, colorSecondary)

      setValidContrast(true)
    } else setValidContrast(false)
  }

  function validateAvatar(avatar: File) {
    const validTypes = ['png', 'jpg', 'jpeg']

    const type = avatar.type.split('/')[1]

    if (!validTypes.includes(type)) {
      setValidAvatar(false)

      return setAvatarError('Invalid file type.')
    }

    if (avatar.size > 2000000) {
      setValidAvatar(false)

      return setAvatarError('File too large. Must be under 2MB')
    }

    const objectURL = URL.createObjectURL(avatar)

    setAvatarURL(objectURL)

    setValidAvatar(true)
  }
}
