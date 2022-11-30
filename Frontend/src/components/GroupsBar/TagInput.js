import { Autocomplete, TextField, Chip, useAutocomplete } from '@mui/material';
import { useState, useEffect } from 'react';

const TagInput = ({ ...props }) => {
    const { selectedTags, placeholder, tags, ...other } = props;

    const [inputValue, setInputValue] = useState("");
    const [selectedItems, setSelectedItems] = useState(["new"]);

    // useEffect(() => {
    //     selectedTags(selectedItems);
    // }, [selectedItems, selectedTags]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const newSelectedItem = inputValue;

            const duplicated = selectedItems.find((item) => item === newSelectedItem);
            console.log(duplicated);

            if (duplicated) {
                console.log('enters');
                setInputValue("");
                return;
            }
            setSelectedItems([
                ...selectedItems,
                newSelectedItem
            ]);
            console.log(selectedItems);
            setInputValue("");
        }
    };

    const handleInputChange = (event) => {
        // console.log(event.target.value);
        setInputValue(event.target.value);
    };

    return (
        <>
            <TextField
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
        </>
    );
};

export default TagInput;