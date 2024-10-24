import { HTMLAttributes } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { twMerge } from "tailwind-merge"

type LoadingPageBannerProps = Pick<HTMLAttributes<HTMLDivElement>, "className"> & {
  title?: string
  message?: string
  disabledFullScreen?: boolean
  size?: "small" | "default" | "large"
}

export default function LoadingPageBanner({
  title,
  message,
  className,
  disabledFullScreen = false,
  size = "default"
}: LoadingPageBannerProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-center justify-center",
        disabledFullScreen ? "my-14" : "bg-black-pearl h-screen w-screen",
        className
      )}
    >
      <AiOutlineLoading3Quarters
        className={`animate-spin text-blue-500 ${
          size === "small" ? "text-xl" : size === "default" ? "text-2xl" : "text-4xl"
        } `}
      />
      {title && <div className='pack-text-primary700-primary500 mt-24 text-xl font-semibold'>{title}</div>}

      {message && <div className='pack-text-gray700-gray400 mt-10 text-sm font-normal'>{message}</div>}
    </div>
  )
}
