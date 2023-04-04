import { Box, Stack } from "@mui/material";

import "../CSS/text-field-container.css";

type Props = {
  icon: any;
  textInput: JSX.Element;
};

function TextFieldContainer({ icon, textInput }: Props) {
  return (
    <Box className="text-field-container">
      <Stack direction="row" alignItems="center" spacing={2}>
        {icon}
        {textInput}
      </Stack>
    </Box>
  );
}

export default TextFieldContainer;
