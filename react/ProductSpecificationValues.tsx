import React, { FC, useMemo, useContext } from 'react'

import { useProductSpecification } from './ProductSpecification'

const ProductSpecificationValues: FC = ({ children }) => {
  const specification = useProductSpecification()

  if (!specification) {
    return null
  }

  return (
    <>
      {specification.values.map((value, index) => (
        <ProductSpecificationValueProvider
          key={index}
          value={value}
          isFirst={index === 0}
          isLast={specification.values.length - 1 === index}
        >
          {children}
        </ProductSpecificationValueProvider>
      ))}
    </>
  )
}

interface ProductSpecificationValueProviderProps {
  value: string
  isLast: boolean
  isFirst: boolean
}

const SpecificationValueContext = React.createContext<
  ProductSpecificationValueProviderProps | undefined
>(undefined)

const ProductSpecificationValueProvider: FC<ProductSpecificationValueProviderProps> = ({
  value,
  isLast,
  isFirst,
  children,
}) => {
  const contextValue = useMemo(() => {
    return {
      value,
      isLast,
      isFirst,
    }
  }, [value, isLast, isFirst])

  return (
    <SpecificationValueContext.Provider value={contextValue}>
      {children}
    </SpecificationValueContext.Provider>
  )
}

export const useProductSpecificationValue = () => {
  const value = useContext(SpecificationValueContext)

  return value
}

export default ProductSpecificationValues
