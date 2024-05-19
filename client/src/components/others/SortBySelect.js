import { MenuItem, Select, FormControl } from "@mui/material";
import React from "react";

const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  return (
    <FormControl sx={{  }}>
      <Select
        size="small"
        value={sorts[sortBy]}
        sx={{
          minWidth: 150, color: "#fff", px: 1, backgroundColor: "#27272A",
          '& fieldset': {
            borderColor: '#918E95',
          },
          '& fieldset.Mui-focused .MuiOutlinedInput-notchedOutline': {
            color: '#B9B5BD',
          },
          "&:hover": {
            outlineColor: "#B9B5BD", backgroundColor: "transparent"
          },
          '& .MuiSelect-icon': {
            color: 'inherit',
          },
        }}
        onChange={onSortBy}
      >
        {Object.keys(sorts).map((sortName, i) => (
          <MenuItem value={sorts[sortName]} key={i}>
            {sorts[sortName]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortBySelect;