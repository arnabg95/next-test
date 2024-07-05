import React, { useState, KeyboardEvent, ChangeEvent, Dispatch } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const TagInput = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: Dispatch<React.SetStateAction<string[]>>;
}) => {
  // const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim() && !tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDelete = (tagToDelete: string) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 2 }}
      >
        {tags.map((tag, index) => (
          <div key={index} style={{ marginBottom: "7px" }}>
            <Chip
              label={tag}
              // key={index}
              variant="outlined"
              size="medium"
              onDelete={handleDelete(tag)}
              sx={{
                height: 35,
                fontSize: 16,
                padding: "0 12px",
                borderColor: "#40A2E3",
                borderRadius: "500px",
                "& .MuiChip-deleteIcon": {
                  color: "#3B94D0",
                },
              }}
              className="deleteIconColorPrimary"
            />
          </div>
        ))}
      </Stack>
      <TextField
        variant="outlined"
        label="Add a tag"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        fullWidth
      />
    </div>
  );
};

export default TagInput;
