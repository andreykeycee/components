import React, { useState } from 'react'

import { AsyncTypeahead } from 'react-bootstrap-typeahead'

interface Props {
  id: string
  searchAccessor: string
  renderMenuItemChildren: (option: any) => React.ReactNode
  onChange: (selected: any) => void
  onSearch: (query: string) => Promise<any[]>
  minLength?: number
  placeholder?: string
}

const Typeahead = (props: Props) => {
  const [options, setOptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    id,
    searchAccessor,
    placeholder,
    onSearch,
    onChange,
    renderMenuItemChildren,
    minLength,
  } = props

  const search = async (query: string) => {
    setIsLoading(true)
    const results = await onSearch(query)
    setOptions(results)
    setIsLoading(false)
  }

  return (
    <AsyncTypeahead
      id={id}
      labelKey={searchAccessor}
      options={options}
      placeholder={placeholder}
      isLoading={isLoading}
      minLength={minLength}
      onSearch={search}
      onChange={onChange}
      renderMenuItemChildren={renderMenuItemChildren}
    />
  )
}

Typeahead.defaultProps = {
  minLength: 3,
}

export { Typeahead }
