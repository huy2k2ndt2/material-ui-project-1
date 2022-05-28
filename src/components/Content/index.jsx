import { Badge, Grid, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { img_300, unavailable } from "../../config/images";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./content.css";
import CustomModal from "../Modal";

const Content = ({ content, media_type }) => {
  const {
    poster_path,
    title,
    release_date,
    first_air_date,
    name,
    vote_average,
    id,
  } = useMemo(() => content, [content]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        sx={{
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <Card
          className="card-container"
          sx={{
            position: "relative",
            zIndex: 1,
            padding: "10px",
            maxWidth: "auto",
            height: {
              md: "550px",
              sm: "550px",
              lg: "500px",
            },
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#282c34;",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#000",
            },
          }}
        >
          <Badge
            badgeContent={vote_average || 0}
            color="secondary"
            sx={{ zIndex: 2 }}
          />

          <CardMedia
            component="img"
            height="350px"
            image={poster_path ? img_300 + "/" + poster_path : unavailable}
            alt={title || name}
          />
          <CardContent
            sx={{
              marginTop: "5px",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              textAlign={"center"}
              sx={{
                marginBottom: "10px",
                color: "white",
              }}
              className="card-title"
            >
              {title || name || "TV|MOVIE"}
            </Typography>
            <Stack
              flex={1}
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: "auto", color: "white" }}
              alignItems="flex-end"
            >
              <Typography gutterBottom variant="body2">
                {(media_type && media_type.toUpperCase()) || "TV|MOVIE"}
              </Typography>
              <Typography gutterBottom variant="body2">
                {release_date || first_air_date}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {open && (
        <CustomModal
          onClose={handleClose}
          content={content}
          media_type={media_type}
          id={id}
        />
      )}
    </>
  );
};

export default Content;
