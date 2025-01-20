import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

interface Props extends SwitchProps {
  // darkMode: boolean;
}

export const IOSSwitch = styled((props: Props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: ".76rem",
  height: ".38rem",
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: ".06rem",
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(0.39rem)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        background: theme.palette.mode === "dark" ? "#101112" : "linear-gradient(90deg, #7168c0, #53429a)",
        opacity: 1,
        border: 0
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5
      },
      "& .MuiSwitch-thumb": {
        // backgroundImage:
        //   "url(../../../../assets/images/switch_thumb_checked.png)",
        // backgroundSize: "100% 100%",
        background: "rgba(59, 39, 138, 0.9)",
        border: "0.02rem solid #ffffff"
      }
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff"
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3
    }
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: ".26rem",
    height: ".26rem",
    backgroundColor: "#E8EFFD"
  },
  "& .MuiSwitch-track": {
    borderRadius: ".6rem",
    backgroundColor: "#2b2d31",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500
    }),
    // border: props.darkMode
    //   ? '"0.01rem solid #ffffff80"'
    //   : "0.01rem solid #ffffff80",
    border: "0.01rem solid #fff5"
  }
}));
