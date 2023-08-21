📢 Use this project, [contribute](https://github.com/vtex-apps/product-specifications) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Specifications

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The Product Specifications app provides blocks to render product specification information.

![Product Specifications Example](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-specifications-0.png)

## Configuration

### Step 1 - Adding the Product Specifications app to your theme dependencies

In your theme `manifest.json`, add the Product Specification app as a dependency:

```json
"dependencies": {
  "vtex.product-specifications": "1.x"
}
```

Now, you can use all the blocks exported by the `product-specifications` app. See the full list below:

| Block name | Description |
| - | - |
| `product-specification-group` | Renders the product specification group. |
| `product-specification` | Renders the product specification. It should be declared as a child of `product-specification-group`. |
| `product-specification-value` | Renders the product specification value. It should be declared as a child of `product-specification`. It can be rendered with `HTML`. |
| `product-specification-text`  | Mandatory children of `product-specification-group`, `product-specification`, and `product-specification-value`. Depending on which block is declared, the `product-specification-text` renders information regarding a specification group, a specification, or a specification value. |

### Step 2 - Adding the Product Specification blocks to your theme templates

Copy the example below and paste it in the desired theme template, modifying it as necessary for your use case. If necessary, add the `product-specification-group` block to the template block list.

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

>⚠️ The Product Specification blocks need a Product context to work properly because they handle product information. Therefore, when declaring them, be sure that they are in a theme template in which this context is available, such as `store.product`.

You can also use other blocks to wrap the blocks provided by the Product Specifications app, such as the ones exported by the [Flex Layout app](https://developers.vtex.com/docs/guides/vtex-flex-layout/). For example:

```json
{
  "product-specification-group#table": {
    "children": ["flex-layout.row#spec-group"]
  },
  "flex-layout.row#spec-group": {
    "props": {
      "blockClass": "productSpecificationGroup"
    },
    "children": ["flex-layout.col#spec-group"]
  },
  "flex-layout.col#spec-group": {
    "children": ["flex-layout.row#spec-group-name", "product-specification"]
  },
  "flex-layout.row#spec-group-name": {
    "props": {
      "blockClass": "productSpecificationGroupName"
    },
    "children": ["product-specification-text#group"]
  },
  "product-specification": {
    "children": ["flex-layout.row#spec-item"]
  },
  "flex-layout.row#spec-item": {
    "props": {
      "blockClass": "productSpecification"
    },
    "children": ["flex-layout.col#spec-name", "flex-layout.col#spec-value"]
  },
  "flex-layout.col#spec-name": {
    "props": {
      "blockClass": "productSpecificationName",
      "width": {
        "mobile": "50%",
        "desktop": "25%"
      }
    },
    "children": ["product-specification-text#specification"]
  },
  "flex-layout.col#spec-value": {
    "props": {
      "blockClass": "productSpecificationValue"
    },
    "children": ["product-specification-values"]
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

### `product-specification-group` props

| Prop name | Type     | Description                                               | Default value |
| --------- | -------- | --------------------------------------------------------- | ------------- |
| `filter`  | `object` | Filters the specifications that the block should display. | `undefined`   |

- **`filter` object:**

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `specificationGroups` | `[string]` | Array of specification group names to be hidden or shown (depending on what is defined in the `type` property) by the `product-specification-group` block. | `undefined`   |
| `type` | `enum` | Determines whether the specification group names passed to the `specificationGroups` prop should be displayed or hidden on the UI. Possible values are: `hide` (hides specification groups declared in the `specificationGroups` prop) or `show` (only shows the specification groups declared in the `specificationGroups` prop). | `undefined` |

### `product-specification` props

| Prop name | Type     | Description                                               | Default value |
| --------- | -------- | --------------------------------------------------------- | ------------- |
| `filter`  | `object` | Filters the specifications that the block should display. | `undefined`   |

- **`filter` object:**

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `specifications` | `[string]` | Array of specifications names to be hidden or shown (depending on what is defined in the `type` property) by the `product-specification` block. | `undefined`   |
| `type` | `enum` | Determines whether the specification names passed to the `specifications` prop should be displayed or hidden on the UI. Possible values are: `hide` (hides specifications declared in the `specificationGs` prop) or `show` (only shows the specifications declared in the `specifications` prop). | `undefined` |

#### `product-specification-text` props

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `blockClass` | `string` | Block ID of your choice to be used in [CSS customizations](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization#using-the-blockclass-property). | `undefined`   |
| `message` | `string`   | Defines the block default text message to be rendered on the UI. You can also define the text message a block will render on the UI using the Site Editor in the Admin and the `markers` prop. | `undefined`   |
| `markers` | `[string]` | IDs of your choice to identify the block's rendered text message and customize it using the Site Editor in the Admin. Learn how to use them by reading the documentation on [Using the Markers prop to customize a block message](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-the-markers-prop-to-customize-a-blocks-message). Note that a block message can also be customized in the Store Theme source code using the `message` prop. | `[]` |

### Step 3 - Editing the `product-specification-text` messages

As stated in the previous step, the `product-specification-text` uses the [ICU Message Format](https://format-message.github.io/icu-message-format-for-translators/), making it possible to fully edit the block's rendered text messages.

When using the `message` prop, you will not need to create an advanced configuration: declare the prop directly in your Store Theme app and pass to it the desired text value to be rendered with the block.

The `markers` prop, in turn, requires you to add an extra configuration in the Site Editor of the Admin to properly work. When using this prop, do not forget to check out the block message variables (shown in the table below) and the [Using the Markers prop to customize a block's message](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-the-markers-prop-to-customize-a-blocks-message) documentation.

| Message variable            | Type      | Description                                                                       |
| --------------------------- | --------- | --------------------------------------------------------------------------------- |
| `groupName`                 | `string`  | Specification group name.                                                         |
| `specificationName`         | `string`  | Specification name.                                                               |
| `specificationValue`        | `string`  | Specification value.                                                              |
| `isFirstSpecificationValue` | `boolean` | Determines whether it is the first specification value (`true`) or not (`false`). |
| `isLastSpecificationValue`  | `boolean` | Determines whether it is the last specification value (`true`) or not (`false`).  |

## Customization

To apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS handles                 |
| --------------------------- |
| `groupName`                 |
| `specificationName`         |
| `specificationValue`        |
| `specificationValue--first` |
| `specificationValue--last`  |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/raissacmp"><img src="https://avatars0.githubusercontent.com/u/62183926?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Raissa Campos</b></sub></a><br /><a href="https://github.com/vtex-apps/product-specifications/commits?author=raissacmp" title="Documentation">📖</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/samuel-rodrigues-48638618b/"><img src="https://avatars.githubusercontent.com/u/62268414?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Samuel Rodrigues</b></sub></a><br /><a href="https://github.com/vtex-apps/product-specifications/commits?author=SamuelRodriguess" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
