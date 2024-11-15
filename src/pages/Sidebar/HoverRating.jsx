// src/pages/Sidebar/HoverRating.jsx
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0.5: 'Useless',
    1: 'Useless',
    1.5: 'Poor',
    2: 'Poor',
    2.5: 'Ok',
    3: 'Ok',
    3.5: 'Good',
    4: 'Good',
    4.5: 'Excellent',
    5: 'Excellent',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ value, onChange }) {
    const [hover, setHover] = React.useState(-1);

    return (
        <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
            <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={onChange}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.9 }} fontSize="inherit" />}
                sx={{
                    '& .MuiRating-icon': {
                        border: '2px solid transparent', // Viền mặc định
                        borderRadius: '50%', // Tạo hình tròn cho ngôi sao
                        transition: 'border 0.5s ease', // Hiệu ứng khi hover
                    },
                    '& .MuiRating-icon:hover': {
                        border: '2px solid #A37D4C', // Viền khi hover
                    },
                    '& .MuiRating-iconFilled': {
                        border: '2px solid #A37D4C', // Viền khi chọn
                    },
                }}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}
