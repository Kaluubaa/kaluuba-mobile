import { Colors } from "./colors";
import { Gradients } from "./gradients";
import { Spacing } from "./spacing";
import { Fonts } from "./typography";

export const Layout = {
  screenPadding: Spacing.lg,
  sectionSpacing: Spacing.xl
};

export const SplashTheme = {
  gradient: Gradients.splash,
  logoSize: 160,
  textStyle: {
    fontFamily: Fonts.bold,
    fontSize: 28,
    color: Colors.neutral.white,
    letterSpacing: 1
  }
};

export const LoaderTheme = {
  dotSize: 10,
  dotColor: Colors.neutral.white,
  spacing: 12,
  animationDuration: 450, // ms per flap
  easing: "ease-in-out"
};


