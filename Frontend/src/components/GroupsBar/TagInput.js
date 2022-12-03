import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';

const TagInput = ({ members, setMembers }) => {
    const { contactList } = useSelector((state) => state.user.value);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setMembers(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ mt: 2, width: 300 }}>
                <InputLabel>Members</InputLabel>
                <Select
                    multiple
                    value={members}
                    onChange={handleChange}
                    input={<OutlinedInput label="Members" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    color="primary"
                                />
                            ))}
                        </Box>
                    )}
                // MenuProps={MenuProps}
                >
                    {contactList.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default TagInput;