import React from 'react'
import { render } from '@vtex/test-tools/react'
import { useProduct, ProductContext } from 'vtex.product-context'

import ProductSpecificationGroup from './ProductSpecificationGroup'
import ProductSpecification from './ProductSpecification'
import ProductSpecificationValues from './ProductSpecificationValues'
import ProductSpecificationText from './ProductSpecificationText'
import iphone from './__fixtures__/iphone'
import classicShoes from './__fixtures__/classicShoes'

const mockUseProduct = useProduct as jest.Mock<ProductContext>

test('render all specifications with their attributes', () => {
  mockUseProduct.mockImplementation(() => iphone)

  const { getByText } = render(
    <ProductSpecificationGroup>
      <ProductSpecificationText message="{groupName}" />
      <div>
        <ProductSpecification>
          <ProductSpecificationText message="{specificationName}" />
          <div>
            <ProductSpecificationValues>
              <ProductSpecificationText message="{specificationValue}" />
            </ProductSpecificationValues>
          </div>
        </ProductSpecification>
      </div>
    </ProductSpecificationGroup>
  )

  expect(getByText('Pantalla')).toHaveAttribute(
    'data-specification-group',
    'Pantalla'
  )

  const specification = getByText('Resolución')

  expect(specification).toHaveAttribute('data-specification-group', 'Pantalla')
  expect(specification).toHaveAttribute('data-specification-name', 'Resolución')

  const value = getByText('2K - QUAD HD (2560 x 1440)')

  expect(value).toHaveAttribute('data-specification-group', 'Pantalla')
  expect(value).toHaveAttribute('data-specification-name', 'Resolución')
  expect(value).toHaveAttribute(
    'data-specification-value',
    '2K - QUAD HD (2560 x 1440)'
  )
})

test('should not have allSpecifications rendered', () => {
  mockUseProduct.mockImplementation(() => classicShoes)

  const { queryByText } = render(
    <ProductSpecificationGroup>
      <ProductSpecificationText message="{groupName}" />
    </ProductSpecificationGroup>
  )

  expect(queryByText('allSpecifications')).not.toBeInTheDocument()
})

test('should filter specification groups', () => {
  mockUseProduct.mockImplementation(() => classicShoes)

  const { queryByText, rerender } = render(
    <ProductSpecificationGroup
      filter={{ type: 'hide', specificationGroups: ['Masculino'] }}
    >
      <ProductSpecificationText message="{groupName}" />
    </ProductSpecificationGroup>
  )

  expect(queryByText('Masculino')).not.toBeInTheDocument()
  expect(queryByText('Medicamentos')).toBeInTheDocument()

  rerender(
    <ProductSpecificationGroup
      filter={{ type: 'show', specificationGroups: ['Masculino'] }}
    >
      <ProductSpecificationText message="{groupName}" />
    </ProductSpecificationGroup>
  )

  expect(queryByText('Masculino')).toBeInTheDocument()
  expect(queryByText('Medicamentos')).not.toBeInTheDocument()

  rerender(
    <ProductSpecificationGroup
      filter={{
        type: 'hide',
        specificationGroups: ['Medicamentos', 'Masculino'],
      }}
    >
      <ProductSpecificationText message="{groupName}" />
    </ProductSpecificationGroup>
  )

  expect(queryByText('Masculino')).not.toBeInTheDocument()
  expect(queryByText('Medicamentos')).not.toBeInTheDocument()

  rerender(
    <ProductSpecificationGroup
      filter={{
        type: 'show',
        specificationGroups: ['Medicamentos', 'Masculino'],
      }}
    >
      <ProductSpecificationText message="{groupName}" />
    </ProductSpecificationGroup>
  )

  expect(queryByText('Masculino')).toBeInTheDocument()
  expect(queryByText('Medicamentos')).toBeInTheDocument()
})
