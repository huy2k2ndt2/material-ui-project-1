import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { API_KEY } from "../../contants";
import {
  unavailable,
  unavailableLandscape,
  img_500,
} from "../../config/images";
import { Box, Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./modal.css";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@material-ui/core/styles";
import Carousel from "../Carousel";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function CustomModal({ onClose, id, media_type }) {
  const [content, setContent] = React.useState({});
  const [video, setVideo] = React.useState();

  const classes = useStyles();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  React.useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={true}
        onClose={onClose}
        closeAfterTransition
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          zIndex: 200,
        }}
      >
        <Fade in={true}>
          {content ? (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <Box
                    sx={{
                      margin: "10px 0",
                    }}
                  >
                    <Carousel id={id} media_type={media_type} />
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </Fade>
      </Modal>
    </ThemeProvider>
  );
}
