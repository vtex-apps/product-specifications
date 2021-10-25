import React, { FC, useContext } from 'react'
import { Specification } from 'vtex.product-context'

import { useProductSpecificationGroup } from './ProductSpecificationGroup'

interface ProductSpecificationGroupProps {
  filter?: {
    type: 'hide' | 'show'
    specificationNames: string[]
  }
}


const ProductSpecificationGroup: FC<ProductSpecificationGroupProps> = ({ children, filter= {type: 'hide', specificationNames: []} }) => {
  const group = useProductSpecificationGroup()

  if (!group) {
    return null
  }
  
  let specifications = group.specifications;

  if (filter.specificationNames?.length > 0 && filter.type == 'show') {
    specifications = specifications.filter((specification) => 
    filter.specificationNames.includes(specification.originalName) )
  }
  if (filter.specificationNames?.length > 0 && filter.type == 'hide') { 
    specifications = specifications.filter((specification) => 
    !filter.specificationNames.includes(specification.originalName) )
  }

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
