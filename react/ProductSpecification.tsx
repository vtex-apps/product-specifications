import React, { FC, useContext } from 'react'
import { Specification } from 'vtex.product-context'

import { useProductSpecificationGroup } from './ProductSpecificationGroup'

const ProductSpecificationGroup: FC = ({ children }) => {
  const group = useProductSpecificationGroup()

  if (!group) {
    return null
  }

  return (
    <>
      {group.specifications.map((specification, index) => (
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
