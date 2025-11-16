import { Fonts } from "./typography";
import { Colors } from "./colors";
import { Radius } from "./radius";
import { Shadows } from "./shadows";
import { Spacing } from "./spacing";

export const Buttons = {
  primary: {
    backgroundColor: Colors.brand.primaryDark,
    textColor: Colors.neutral.white,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    fontFamily: Fonts.semibold
  },

  secondary: {
    backgroundColor: Colors.neutral.gray200,
    textColor: Colors.neutral.gray900,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    fontFamily: Fonts.medium
  },

  outline: {
    borderColor: Colors.brand.primaryDark,
    borderWidth: 1.4,
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    textColor: Colors.brand.primaryDark,
    fontFamily: Fonts.medium
  }
};

export const Inputs = {
  base: {
    backgroundColor: Colors.neutral.white,
    borderColor: Colors.neutral.gray300,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontFamily: Fonts.regular,
    fontSize: 16
  },
  focus: {
    borderColor: Colors.brand.primaryDark
  }
};

export const Cards = {
  default: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    shadow: Shadows.soft
  }
};


