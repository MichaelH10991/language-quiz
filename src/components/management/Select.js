import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ManagementSelect({ title, items, setValue, value }) {
  const [addedItems, setAddedItems] = React.useState([]);
  const allItems = [...addedItems, ...items];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setAddedItems((prevItems) => [...prevItems, event.target.value]);
    }
  };

  const menuItems =
    allItems &&
    Array.isArray(allItems) &&
    allItems.map((item, index) => {
      return <MenuItem value={item}>{item}</MenuItem>;
    });

  menuItems.push(
    <input placeholder={`New ${title}`} onKeyDown={handleKeyDown} type="text" />
  );

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={title}
          onChange={handleChange}
        >
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
}
