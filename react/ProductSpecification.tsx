import React, { FC, useContext } from 'react'
import { Specification } from 'vtex.product-context'

import { useProductSpecificationGroup } from './ProductSpecificationGroup'
import { filterSpecification, identityNoop } from './utils/filterSpecifications'

interface ProductSpecificationGroupProps {
  filter?: {
    type: 'hide' | 'show'
    specificationNames: string[]
  }
}


const ProductSpecificationGroup: FC<ProductSpecificationGroupProps> = ({ children, filter = {type: 'show', specificationNames: []} }) => {
  const group = useProductSpecificationGroup()

  if (!group) {
    return null
  }
  
  const specifications = filterSpecification({
    specifications: group.specifications,
    filters: {
      hide: filter.type === 'show' ? (specification: string) => filter.specificationNames.includes(specification) : identityNoop,
      show: filter.type === 'hide' ? (specification: string) => !filter.specificationNames.includes(specification) : identityNoop
    }
  })

  return (
    <>
      {specifications.map((specification, index) => (
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
