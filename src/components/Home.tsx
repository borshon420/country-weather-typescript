import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {

    const history = useHistory();
    const [countryName, setCountryName] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountryName(event.target.value);
    }

    const onSubmit = () => {
        history.push(`/country/${countryName}`)
    }
    return (
        <div>
            <h2>Welcome To Weather Application</h2>
            <div>
            <TextField 
            variant="standard"
            placeholder="Enter Country"
            value={countryName}
            onChange={handleInputChange}
            />
            </div>
            <Button 
            size="medium"
            variant="contained"
            disabled={!countryName}
            onClick={onSubmit}
            style={{width: "210px", marginTop: "20px" }}
            >
                Submit
            </Button>
        </div>
    );
};

export default Home;