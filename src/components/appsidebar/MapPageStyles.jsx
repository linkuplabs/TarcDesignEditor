import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:20,
    display: "flex",
    height: "calc(100vh - 60px)",
    width: "100%",
  },

  mapContainer: {
    paddingTop:20,
    position: "relative",
    width: "90%",
    height: "90%",
  },

  menuBtn: {
    position: "absolute",
    zIndex: 1,
    height: 40,
    width: 40,
    borderRadius: 5,
    transform: "translateX(10px) translateY(20px)",
  },
  
  myLocationIco:{
    position: "absolute",
    top:"calc(100% - 160px)",
    right: "40px",
    color: "#191919",
  }
}));
export default useStyles;
