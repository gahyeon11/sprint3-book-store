export type ThemeName = "light" | "dark";

export type ColorKey = "primary" | "background" | "secondary" | "third" |"border" | "text" ;

export type HeadingSize = "small" | "medium" | "large";

export type ButtonSize = "small" | "medium" | "large";

export type ButtonSchema = "primary" | "normal" | "like";

export type LayoutWidth = "small" | "medium" | "large";

interface Theme {
  name: ThemeName;
  color: {
    // primary: string;
    // background: string;
    // secondary?: string;
    [key in ColorKey]: string;
  };
  heading: {
    [key in HeadingSize]: {
        fontSize: string;
    };
  };
  button:{
    [key in ButtonSize]: {
        fontSize: string;
        padding: string;
    }
  };
  buttonSchema: {
    [key in ButtonSchema]: {
        color: string;
        backgroundColor: string;
    };
  } ;
  borderRadius: {
    default: string;
  };
  layout:{
    width:{
        [key in LayoutWidth]: string;
    }
  }
}
export const light: Theme = {
    name: "light",
    color: {
      primary: "#DAA520",
      background: "#DCDCDC",
      secondary: "#B8860B",
      third: "FF8C00",
      border: "gray",
      text: "black",
    },
    heading: {
      large: {
        fontSize: "2rem",
      },
      medium: {
        fontSize: "1.5rem",
      },
      small: {
        fontSize: "1rem",
      },
    },
    button:{
        large: {
            fontSize: "2rem",
            padding: "1rem 2rem",
          },
          medium: {
            fontSize: "1.5rem",
            padding: "0.5rem 1rem",
          },
          small: {
            fontSize: "1rem",
            padding: "0.25rem 0.5rem",
          },
    },
    buttonSchema: {
        primary:{
            color: "white",
            backgroundColor: "midnightblue",
        },
        normal:{
            color: "midnightblue",
            backgroundColor: "lightgray",
        },
        like: {
          color: "white",
          backgroundColor: "coral",
        }
    },
    borderRadius: {
        default: "4px"
    },
    layout:{
        width:{
            large: "1020px",
            medium: "760px",
            small: "320px",
        }
    }
  };
  
  export const dark: Theme = {
    ...light,
    name: "dark",
    color: {
      primary: "coral",
      background: "midnightblue",
      secondary: "blue",
      third: "green",
      border: "gray",
      text: "black",
    },
  };
  

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
