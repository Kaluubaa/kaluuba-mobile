import { Fonts } from "./typography";

export const FontSizes = {
  h1: { fontSize: 32, lineHeight: 40, fontFamily: Fonts.bold },
  h2: { fontSize: 28, lineHeight: 36, fontFamily: Fonts.bold },
  h3: { fontSize: 24, lineHeight: 32, fontFamily: Fonts.semibold },

  title: { fontSize: 20, lineHeight: 28, fontFamily: Fonts.semibold },

  body: { fontSize: 16, lineHeight: 24, fontFamily: Fonts.regular },
  bodyMedium: { fontSize: 16, lineHeight: 24, fontFamily: Fonts.medium },

  small: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.regular },
  smallMedium: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.medium },

  caption: { fontSize: 12, lineHeight: 16, fontFamily: Fonts.regular }
};
