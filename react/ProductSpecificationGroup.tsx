import React, { FC, useContext } from 'react'
import { useProduct, SpecificationGroup } from 'vtex.product-context'

const removeAll = (groups: SpecificationGroup[]) => {
  return groups.filter((group) => group.originalName !== 'allSpecifications')
}

const ProductSpecificationGroup: FC = ({ children }) => {
  const { product } = useProduct()

  if (!product) {
    return null
  }

  return (
    <>
      {removeAll(product.specificationGroups).map((group, index) => (
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
