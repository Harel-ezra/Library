import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { Cancel } from "@mui/icons-material";
import iconsStyle from './icons.module.css'

interface ButtonFunction {
  onClick: () => void
}

export const DeleteButton = ({ onClick }: ButtonFunction) => (
    <Box className={ iconsStyle.iconsFlex }>
      <IconButton onClick={ onClick }>
        <DeleteIcon />
      </IconButton>
      <Typography className={ iconsStyle.textCenter }></Typography>
    </Box>
);


export const EditButton = ({ onClick }: ButtonFunction) => (
    <Box className={ iconsStyle.iconsFlex }>
      <IconButton onClick={ onClick }>
        <EditIcon />
      </IconButton>
      <Typography className={ iconsStyle.textCenter }></Typography>
    </Box>
);


export const DoneEditButton = ({ onClick }: ButtonFunction) => {
  const temp=()=>
  {
    onClick();
  }
  return(
    <Box className={ iconsStyle.iconsFlex }>
      <IconButton onClick={ temp }>
        <CheckIcon />
      </IconButton>
      <Typography className={ iconsStyle.textCenter }>בוצע</Typography>
    </Box>
 )
}

export const CancelEditButton = ({ onClick }: ButtonFunction) => (
    <Box className={ iconsStyle.iconsFlex }>
      <IconButton onClick={ onClick }>
        <Cancel />
      </IconButton>
      <Typography className={ iconsStyle.textCenter }>בטל</Typography>
    </Box>
)
