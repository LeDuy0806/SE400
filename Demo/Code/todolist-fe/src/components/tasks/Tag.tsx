import React from "react"

interface TagProps {
  tagName: string
  selectTag?: (tagName: string) => void
  selected: boolean
}

const Tag: React.FC<TagProps> = ({ tagName, selectTag, selected }) => {
  const tagStyle: {
    [key: string]: string
  } = {
    High: "bg-[#fda821]",
    Medium: "bg-[#15d4c8]",
    Low: "bg-[#ffd12c]",
    default: "bg-[#f9f9f9]"
  }

  return (
    <button
      type='button'
      className={`mr-2 cursor-pointer rounded-md border border-[#dfe3e6] px-2 py-1 text-sm font-medium ${
        selected ? tagStyle[tagName] : tagStyle.default
      }`}
      onClick={() => selectTag?.(tagName)}
    >
      {tagName}
    </button>
  )
}

export default Tag
