declare module 'vtex.product-context' {
  interface Specification {
    name: string
    originalName: string
    values: string[]
  }

  interface SpecificationGroup {
    name: string
    originalName: string
    specifications: Specification[]
  }

  interface Product {
    specificationGroups: SpecificationGroup[]
  }

  interface ProductContext {
    product?: Product
  }

  export function useProduct(): ProductContext
}
