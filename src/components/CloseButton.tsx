type CloseButtonProps = {
  onClick?: Function
}

export default function CloseButton({ onClick = () => {} }: CloseButtonProps) {
  return (
    <div onClick={(e) => onClick(e)} className=" text-3xl">
      <i className="fa-fw fa-sharp fa-thin fa-xmark" />
    </div>
  )
}
