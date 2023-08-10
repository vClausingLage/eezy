import { Box, Stack } from "@mui/material";

import IcaoInput from "./icaoInput";

import "../CSS/text-field-container.css";

type Props = {
  icon: any;
  adornment: string;
  value: string;
  submit(input: string): void;
};

function TextFieldContainer({ icon, value, adornment, submit }: Props) {
  return (
    <Box className="text-field-container">
      <Stack direction="row" alignItems="center" spacing={2}>
        {icon}
        <IcaoInput
          submit={(input) => submit(input)}
          value={value}
          adornment={adornment}
        />
      </Stack>
    </Box>
  );
}

export default TextFieldContainer;
