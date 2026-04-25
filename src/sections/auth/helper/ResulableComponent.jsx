
// ==============================
// 🔹 REUSABLE INPUT
// ==============================

import IconButton from "components/@extended/IconButton";
import EyeOutlined from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlined from "@ant-design/icons/EyeInvisibleOutlined";
import { Box,Stack, InputAdornment, InputLabel, OutlinedInput, FormHelperText } from "@mui/material";
import { useState } from "react";

const FormInput = ({ field, formik }) => {
  const { values, handleChange, handleBlur, errors, touched } = formik;

  return (
    <Box>
      <Stack sx={{ gap: 1 }}>
        <InputLabel>{field.label}</InputLabel>
        <OutlinedInput
          fullWidth
          name={field.name}
          type={field.type}
          value={values[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          error={Boolean(touched[field.name] && errors[field.name])}
        />
      </Stack>

      {touched[field.name] && errors[field.name] && (
        <FormHelperText error>
          {errors[field.name]}
        </FormHelperText>
      )}
    </Box>
  );
};


// ==============================
// 🔹 PASSWORD INPUT (SPECIAL)
// ==============================
const PasswordInput = ({ field, formik }) => {
  const [show, setShow] = useState(false);
  const { values, handleChange, handleBlur, errors, touched } = formik;

  return (
    <Box>
      <Stack sx={{ gap: 1 }}>
        <InputLabel>{field.label}</InputLabel>

        <OutlinedInput
          fullWidth
          name={field.name}
          type={show ? "text" : "password"}
          value={values[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          error={Boolean(touched[field.name] && errors[field.name])}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShow(!show)}>
                {show ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </IconButton>
            </InputAdornment>
          }
        />
      </Stack>

      {touched[field.name] && errors[field.name] && (
        <FormHelperText error>
          {errors[field.name]}
        </FormHelperText>
      )}
    </Box>
  );
};

export {PasswordInput,FormInput}