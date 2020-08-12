📢 Use this project, [contribute](https://github.com/vtex-apps/product-specifications) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Specifications

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

App that provides blocks to render product specifications.

![Media Placeholder](https://user-images.githubusercontent.com/52087100/71204177-42ca4f80-227e-11ea-89e6-e92e65370c69.png)

## Configuration

In this section, you first must **add the primary instructions** that will allow users to use the app's blocks in their store, such as:

1. In your theme's `manifest.json`, add the Product Specification app as a dependency:

```json
"dependencies": {
  "vtex.product-specification": "1.x"
}
```

Now, you can use all the blocks exported by the `product-price` app. Check out the full list below:

| Block name                    | Description                                                                                                     |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `product-specification-group` | Renders its children for every product specification group.                                                     |
| `product-specification`       | Renders its children for every product specification. It should be placed bellow `product-specification-group`. |
| `product-specification-value` | Renders its children for every product value. It should be placed bellow `product-specification`.               |
| `product-specification-text`  | Renders the data of a specification group, specification, and specification value.                              |

### `product-specification-text` props

| Prop name    | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                  | Default value |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `message`    | `string`   | Defines the block's default text i.e. the block message. You can also define which text message a block will render on the UI using the admin's Site Editor.                                                                                                                                                                                                                                                                                 | `undefined`   |
| `blockClass` | `string`   | Block ID of your choosing to be used in [CSS customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization#using-the-blockclass-property).                                                                                                                                                                                                                                                                     | `undefined`   |
| `markers`    | `[string]` | IDs of your choosing to identify the block's rendered message and customize it using the admin's Site Editor. Learn how to use them accessing the documentation on [Using the Markers prop to customize a block's message](https://vtex.io/docs/recipes/style/using-the-markers-prop-to-customize-a-blocks-message). Notice the following: a block's message can also be customized in the Store Theme source code using the `message` prop. | `[]`          |

This block uses the [ICU Message Format](https://format-message.github.io/icu-message-format-for-translators/), making it possible to fully edit the text message and variables displayed by it. It is possible to define which message texts a block will render on the UI using the `message` prop.

| Message variable            | Type      | Description                                                                                                                                             |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `groupName`                 | `string`  | Specification group name. Variable available when bellow of a `product-specification-group`, `product-specification`, or `product-specification-value`. |
| `specificationName`         | `string`  | Speficiation name. Variable available when bellow of a `product-specification`, or `product-specification-value`.                                       |
| `specificationValue`        | `string`  | Specification value. Variable available when bellow of a `product-specification-value`.                                                                 |
| `isFirstSpecificationValue` | `boolean` | Value is `true` if it's the first specification value, `false` otherwise. Variable available when bellow of a `product-specification-value`.            |
| `isLastSpecificationValue`  | `boolean` | Value is `true` if it's the last specification value, `false` otherwise. Variable available when bellow of a `product-specification-value`.             |

## Example

```json
{
  "product-specification-group": {
    "children": ["product-specification-text#group", "product-specification"]
  },
  "product-specification": {
    "children": [
      "product-specification-text#specification",
      "product-specification-values"
    ]
  },
  "product-specification-values": {
    "children": ["product-specification-text#value"]
  },
  "product-specification-text#group": {
    "props": {
      "message": "{groupName}"
    }
  },
  "product-specification-text#specification": {
    "props": {
      "message": "{specificationName}"
    }
  },
  "product-specification-text#value": {
    "props": {
      "message": "{specificationValue}"
    }
  }
}
```

Feel free to any other blocks around the blocks provided. One may add a [flex-layout](https://vtex.io/docs/components/all/vtex.flex-layout@0.15.0/) for example:

```json
{
  "product-specification-group": {
    "children": [
      "product-specification-text#group",
      "flex-layout.row#spec-group"
    ]
  },
  "flex-layout.row#spec-group": {
    "props": {
      "blockClass": "specificationGroup"
    },
    "children": ["product-specification"]
  },
  "product-specification": {
    "children": [
      "product-specification-text#specification",
      "product-specification-values"
    ]
  },
  "product-specification-values": {
    "children": ["product-specification-text#value"]
  },
  "product-specification-text#group": {
    "props": {
      "message": "{groupName}"
    }
  },
  "product-specification-text#specification": {
    "props": {
      "message": "{specificationName}"
    }
  },
  "product-specification-text#value": {
    "props": {
      "message": "{specificationValue}"
    }
  }
}
```

## Customization

To apply CSS customization in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                   |
| ----------------------------- |
| `groupName`                   |
| `specificationName`           |
| `specificationValue`          |
| `specificationValue--isFirst` |
| `specificationValue--isLast`  |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
