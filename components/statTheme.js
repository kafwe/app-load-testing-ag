import { statAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(statAnatomy.keys)

const statPurple = definePartsStyle({
    container: {
        background: "white",
        borderRadius: "lg",
        padding: "4"
    },
    label: {
        color: "purple.600",
    },

})

export const statTheme = defineMultiStyleConfig({
  variants: { statPurple },
})