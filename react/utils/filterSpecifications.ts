import { Specification } from "vtex.product-context"

type noopFunction = <T extends any>(x: T) => T
export const identityNoop = <T extends any>(x: T) => x // type the generics better, if possible.

type specificationFilterFunction = (specificationName: string) => boolean

interface UseFilterSpecification {
  specifications: Array<Specification>
  filters: {
    show: specificationFilterFunction | noopFunction ,
    hide: specificationFilterFunction | noopFunction,
  }
}

export const filterSpecification = ({ specifications, filters: { show, hide } }: UseFilterSpecification) =>{ 
   return specifications.filter(({ originalName }) => show(originalName) && hide(originalName))
}