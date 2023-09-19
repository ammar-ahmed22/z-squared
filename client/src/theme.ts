import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"

const fonts = {
  body: "Noto Sans, sans-serif",
  heading: "Gloock, serif",
  handwriting: "Caveat, cursive"
};

const config = {
  initialColorMode: "system",
  useSystemColorMode: true,
  cssVarPrefix: "z2"
}

// const colors = {
//   brand: {
//     green: {
//       50: "#90dfaa",
//       100: "#79d999",
//       200: "#63d288",
//       300: "#4dcc77",
//       400: "#36c566",
//       500: "#20bf55",
//       600: "#1dac4d",
//       700: "#1a9944",
//       800: "#16863b",
//       900: "#137333"
//     },
//     blue: {
//       50: "#80ddf7",
//       100: "#67d6f5",
//       200: "#4dcff4",
//       300: "#34c8f2",
//       400: "#1ac1f1",
//       500: "#01baef",
//       600: "#01a7d7",
//       700: "#0195bf",
//       800: "#0182a7",
//       900: "#01708f"
//     }
//   },
//   brand2: {
//     green: "#218c74",
//     light: "#d1ccc0",
//     dark: "2f3640"
//   }
// }

const colors = {
  brand2: {
    green: {
      900: "#145446",
      800: "#176251",
      700: "#1a705d",
      600: "#1e7e68",
      500: "#218c74",
      400: "#379882",
      300: "#4da390",
      200: "#64af9e",
      100: "#7abaac",
      50: "#90c6ba"
    },
    light: {
      900: "#7d7a73",
      800: "#928f86",
      700: "#a7a39a",
      600: "#bcb8ad",
      500: "#d1ccc0",
      400: "#d6d1c6",
      300: "#dad6cd",
      200: "#dfdbd3",
      100: "#e3e0d9",
      50: "#e8e6e0"
    },
    dark: {
      900: "#1c2026",
      800: "#21262d",
      700: "#262b33",
      600: "#2a313a",
      500: "#2f3640",
      400: "#444a53",
      300: "#595e66",
      200: "#6d7279",
      100: "#82868c",
      50: "#979ba0"
    }
  }
}

const components = {
  Text: {
    variants: {
      gradient: {
        bgGradient: "linear(to-r, brand.green.500, brand.blue.500)",
        bgClip: "text",
        lineHeight: "base"
      }
    }
  },
  Heading: {
    variants: {
      gradient: {
        bgGradient: "linear(to-r, brand.green.500, brand.blue.500)",
        bgClip: "text",
        lineHeight: "base"
      }
    }
  }
}

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("brand2.light.500", "brand2.dark.900")(props),
      color: mode("brand2.dark.900", "brand2.light.500")(props),
      overflowX: "hidden"
    }
  })
}

const theme = extendTheme({
  fonts,
  config,
  colors,
  components,
  styles
});

export default theme;