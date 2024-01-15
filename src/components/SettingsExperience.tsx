export type SettingsExperienceProps = {
  label: any
}

export default function SettingsExperience({ label }: SettingsExperienceProps) {
  return (
    <div className="flex flex-col h-full w-full font-content px-2">
      <h4 className="font-header text-global text-2xl mb-2">Profile</h4>
      <div className="flex items-center justify-center w-full h-1/2 border-2 border-dashed border-global">
        Component: LabelProfileForm
      </div>
      <h4 className="font-header text-global text-2xl mb-2">Access</h4>
      <table className="w-full text-global">
        <thead className="bg-global-flipped text-global-flipped">
          <tr className="font-header">
            <th className="text-left p-1 rounded-tl-xl w-1/3">User</th>
            <th className="text-left py-1 rounded-tr-xl">Privileges</th>
          </tr>
        </thead>
        <tbody>
          {label.custodialUsers.map((user: any, i: number) => {
            const access = label.access[user.userId]?.toString() || ''

            return (
              <tr key={i}>
                <td className="p-1 border-b border-global">{user.display}</td>
                <td className="p-1 border-b border-global">{access}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
