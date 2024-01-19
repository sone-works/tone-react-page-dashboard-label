import ToneCSSUtils from '@sone-dao/tone-react-css-utils'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import CustodialExperience from './components/CustodialExperience/CustodialExperience'
import LabelDisplay from './components/LabelDisplay'
import MenuItem from './components/MenuItem'
import PostsExperience from './components/PostsExperience'
import RosterExperience from './components/RosterExperience'
import SettingsExperience from './components/SettingsExperience'
import StatsExperience from './components/StatsExperience'

export type DashboardLabelPageProps = {
  canAccess: boolean
  label: any
  user: any
  useStyleStore: UseStyleStore
  experience: string
}

export default function DashboardLabelPage({
  canAccess,
  label,
  user,
  useStyleStore,
}: DashboardLabelPageProps) {
  if (!canAccess || !label || !user) return <></>

  const navMenu = [
    { display: 'Stats', url: 'stats', icon: <></> },
    { display: 'Catalog', url: 'catalog', icon: <></> },
    { display: 'Posts', url: 'posts', icon: <></> },
    { display: 'Roster', url: 'roster', icon: <></> },
    {
      display: 'Custodial',
      url: 'custodial',
      icon: <></>,
      count: label.custodianFor.length,
    },
    { display: 'Settings', url: 'settings', icon: <></> },
  ]

  const pathname = usePathname()

  const experience = pathname.split('/')[4] || 'stats'

  const basePath = `/dashboard/label/${label?.uniqueUrl}`

  useEffect(() => {
    loadLabelColors()
    loadEntityColors()
  }, [])

  useEffect(() => {
    loadEntityColors()
  }, [label.custodianFor])

  return (
    <>
      <Head>
        <title>
          Tone - {label.display || label.entityId}'s Dashboard - Stats
        </title>
      </Head>
      <div className="bg-global text-global">
        <LabelDisplay label={label} />
        <div className="max-w-screen overflow-x-auto scrollbar-none pb-2">
          <ul className="flex">
            {navMenu.map((item, i) => (
              <MenuItem
                key={i}
                display={item.display}
                icon={item.icon}
                count={item.count}
                url={basePath + '/' + item.url}
                selected={experience == item.url}
              />
            ))}
          </ul>
        </div>
        <div className="w-full p-4">
          <ExperienceRouter />
        </div>
      </div>
    </>
  )

  function loadLabelColors() {
    ToneCSSUtils.setColors('global', label.colors[0], label.colors[1])
  }

  function loadEntityColors() {
    label.custodianFor.map((entity: any) =>
      ToneCSSUtils.setColors(
        entity.entityId,
        entity.colors[0],
        entity.colors[1]
      )
    )
  }

  function ExperienceRouter() {
    switch (experience) {
      case 'stats':
        return <StatsExperience />
      case 'posts':
        return <PostsExperience />
      case 'roster':
        return <RosterExperience />
      case 'custodial':
        return (
          <CustodialExperience
            label={label}
            useStyleStore={useStyleStore}
            basePath={basePath}
          />
        )
      case 'settings':
        return <SettingsExperience label={label} />
      default:
        return <StatsExperience />
    }
  }
}
