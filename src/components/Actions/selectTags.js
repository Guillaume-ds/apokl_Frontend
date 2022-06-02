import React from "react";
import {listTags, MenuProps} from "../../utils/utils";
import FormStyles from "../../styles/Form.module.scss";

import { ListItemText } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const SelectTags = ({tags,setTags}) =>{

    const handleTagsChange = (event) => {
		const {
			target: { value },
		} = event;
		setTags(
			typeof value === 'string' ? value.split(',') : value,
		);
	};

    return(
        <FormControl sx={{width:"100%"}}>
            <InputLabel id="demo-multiple-chip-label" >Tags</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                sx={{ background:'white', borderRadius:2 }}
                value={tags}
                className={FormStyles.multiSelect}
                onChange={handleTagsChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{  display: 'flex', flexWrap: 'wrap', gap: 0.5 }} >
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {listTags.map((tag) => (
                    
                    <MenuItem key={tag} value={tag}>
                        <Checkbox checked={tags.indexOf(tag) > -1}/>
                        <ListItemText primary={tag} />
                    </MenuItem>									
                ))}
                
            </Select>
        </FormControl>
    )
};

export default SelectTags;