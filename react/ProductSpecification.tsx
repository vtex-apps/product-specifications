import React, { FC, useContext, ReactNode, useMemo } from 'react'
import { Specification } from 'vtex.product-context'

import { useProductSpecificationGroup } from './ProductSpecificationGroup'

interface ProductSpecificationProps {
  filter?: {
    type: 'hide' | 'show'
    specifications: string[]
  }
  children: ReactNode
}

const defaultFilter: ProductSpecificationProps['filter'] = {
  type: 'hide',
  specifications: [],
}

const ProductSpecificationGroup: FC<ProductSpecificationProps> = ({
  filter = defaultFilter,
  children }) => {
  const group = useProductSpecificationGroup()
  const specificationsGroup = group?.specifications
  const { type, specifications: filterSpecificationGroups } = filter

  const specification = useMemo(
    () =>
      specificationsGroup?.filter((specification) => {
        const hasSpecification = filterSpecificationGroups.includes(specification.originalName)
        if ((type === 'hide' && hasSpecification) || (type === 'show' && !hasSpecification)) {
          return false
        }

        return true
      }),
    [specificationsGroup, type, filterSpecificationGroups]
  )

  if (!group) {
    return null
  }

  return (
    <>
      {specification?.map((specification, index) => (
        <ProductSpecificationProvider key={index} specification={specification}>
          {children}
        </ProductSpecificationProvider>
      ))}
    </>
  )
}

const SpecificationContext = React.createContext<Specification | undefined>(
  undefined
)

interface ProductSpecificationProviderProps {
  specification: Specification
}

const ProductSpecificationProvider: FC<ProductSpecificationProviderProps> = ({
  specification,
  children,
}) => {
  return (
    <SpecificationContext.Provider value={specification}>
      {children}
    </SpecificationContext.Provider>
  )
}

export const useProductSpecification = () => {
  const group = useContext(SpecificationContext)

  return group
}

export default ProductSpecificationGroup
