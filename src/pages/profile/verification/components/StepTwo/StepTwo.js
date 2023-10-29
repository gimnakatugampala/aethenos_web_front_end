import React from 'react'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import GarageIcon from '@mui/icons-material/Garage';
import FlagIcon from '@mui/icons-material/Flag';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const StepTwo = () => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

  return (
    <div className='p-5 m-3 text-center'>

        <div className='row mx-auto'>
           
            <div className="card w-50 mx-auto">
            <div className="card-body">

                <h5><b>Select Method</b></h5>
                <p>We require a photo of a government ID to verify your identity</p>
          
                <List component="nav" aria-label="main mailbox folders">
                <RadioGroup
                defaultValue="dl"
                name="radio-buttons-group"
            >
                <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
                >
                <ListItemIcon>
                    <GarageIcon fontSize='large' />
                </ListItemIcon>
                <FormControlLabel value="dl" control={<Radio />} label="Driver License" />
                {/* <ListItemText primary="Driver License" /> */}
                </ListItemButton>

            
                <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
                >
                <ListItemIcon>
                    <FlagIcon fontSize='large'  />
                </ListItemIcon>
                <FormControlLabel value="nic" control={<Radio />} label="National ID" />
                {/* <ListItemText primary="National ID" /> */}
                </ListItemButton>

                <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
                >
                <ListItemIcon>
                    <AirplanemodeActiveIcon fontSize='large'  />
                </ListItemIcon>
                <FormControlLabel value="passport" control={<Radio />} label="Passport" />

                {/* <ListItemText primary="Passport" /> */}
                </ListItemButton>

                </RadioGroup>


            </List>
     
 

        </div>
        </div>
           
        </div>
      
    </div>
  )
}

export default StepTwo