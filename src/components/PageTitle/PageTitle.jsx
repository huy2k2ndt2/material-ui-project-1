import { Typography } from "@mui/material";
import "./pageTitle.css";

const PageTitle = ({ content }) => {
  return (
    <Typography
      sx={{
        margin: "20px 0",
      }}
      className="pageTitle"
      variant="h3"
      fontWeight={10}
      color="gray"
    >
      {content}
    </Typography>
  );
};

export default PageTitle;
