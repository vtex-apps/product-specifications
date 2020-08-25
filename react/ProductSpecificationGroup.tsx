import React, { FC, useMemo, useContext, ReactNode } from 'react'
import { useProduct, SpecificationGroup } from 'vtex.product-context'

interface ProductSpecificationGroupProps {
  filter?: {
    type: 'hide' | 'show'
    specificationGroups: string[]
  }
  children: ReactNode
}

const defaultFilter: ProductSpecificationGroupProps['filter'] = {
  type: 'hide',
  specificationGroups: [],
}

const ProductSpecificationGroup: FC<ProductSpecificationGroupProps> = ({
  filter = defaultFilter,
  children,
}) => {
  const { product } = useProduct()

  const { type, specificationGroups: filterSpecificationGroups } = filter
  const specificationGroups = product?.specificationGroups ?? []

  const groups = useMemo(
    () =>
      specificationGroups.filter((group) => {
        if (group.originalName === 'allSpecifications') {
          return false
        }

        const haveGroup = filterSpecificationGroups.includes(group.originalName)

        if ((type === 'hide' && haveGroup) || (type === 'show' && !haveGroup)) {
          return false
        }

        return true
      }),
    [specificationGroups, type, filterSpecificationGroups]
  )

  if (!product) {
    return null
  }

  return (
    <>
      {groups.map((group, index) => (
        <ProductSpecificationGroupProvider key={index} group={group}>
          {children}
        </ProductSpecificationGroupProvider>
      ))}
    </>
  )
}

const SpecificationGroupContext = React.createContext<
  SpecificationGroup | undefined
>(undefined)

interface ProductSpecificationGroupProviderProps {
  group: SpecificationGroup
}

const ProductSpecificationGroupProvider: FC<ProductSpecificationGroupProviderProps> = ({
  group,
  children,
}) => {
  return (
    <SpecificationGroupContext.Provider value={group}>
      {children}
    </SpecificationGroupContext.Provider>
  )
}

export const useProductSpecificationGroup = () => {
  const group = useContext(SpecificationGroupContext)

  return group
}

export default ProductSpecificationGroup
