import React, { FC, useMemo, ReactNode } from 'react'
import { IOMessageWithMarkers } from 'vtex.native-types'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { useProductSpecification } from './ProductSpecification'
import { useProductSpecificationGroup } from './ProductSpecificationGroup'
import { useProductSpecificationValue } from './ProductSpecificationValues'

interface Props {
  message: string
  markers?: string[]
}

interface MessageValues {
  groupName: ReactNode
  specificationName: ReactNode
  specificationValue: ReactNode
  isFirstSpecificationValue: boolean
  isLastSpecificationValue: boolean
}

const CSS_HANDLES = [
  'groupName',
  'specificationName',
  'specificationValue',
] as const

const ProductSpecificationText: FC<Props> = ({
  message = '',
  markers = [],
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const group = useProductSpecificationGroup()
  const specification = useProductSpecification()
  const value = useProductSpecificationValue()

  const values = useMemo(() => {
    const result: MessageValues = {
      groupName: '',
      specificationName: '',
      specificationValue: '',
      isFirstSpecificationValue: true,
      isLastSpecificationValue: true,
    }

    if (!group) {
      return result
    }

    result.groupName = (
      <span
        key="groupName"
        data-specification-group={group.originalName}
        className={handles.groupName}
      >
        {group.name}
      </span>
    )

    if (!specification) {
      return result
    }

    result.specificationName = (
      <span
        key="specificationName"
        data-specification-group={group.originalName}
        data-specification-name={specification.originalName}
        className={handles.specificationName}
      >
        {specification.name}
      </span>
    )

    if (!value) {
      return result
    }

    result.specificationValue = (
      <span
        key="specificationValue"
        data-specification-group={group.originalName}
        data-specification-name={specification.originalName}
        data-specification-value={value.value}
        className={applyModifiers(handles.specificationName, [
          value.isFirst ? 'isFirst' : '',
          value.isLast ? 'isLast' : '',
        ])}
      >
        {value.value}
      </span>
    )
    result.isFirstSpecificationValue = value.isFirst
    result.isLastSpecificationValue = value.isLast

    return result
  }, [group, specification, value, handles])

  return (
    <IOMessageWithMarkers
      handleBase="specificationText"
      message={message}
      markers={markers}
      values={values}
    />
  )
}

export default ProductSpecificationText
